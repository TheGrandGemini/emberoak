'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function CartItemRow({
	item,
	dish,
	currentTotal,
	isUnavailable,
	index = 0,
	onRemove,
	onQuantityChange,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const configurations = item.configurations || [item];
	const details = configurations.map((configuration) => {
		const choices = [
			configuration.heat,
			...(configuration.addOns || []).map((option) => `+ ${option.name}`),
		]
			.filter(Boolean)
			.join(' · ');

		return configurations.length > 1
			? `${configuration.quantity}× ${choices || 'Standard'}`
			: choices;
	});
	const instructions = [
		...new Set(
			configurations
				.map((configuration) => configuration.specialInstructions)
				.filter(Boolean),
		),
	].join(' · ');
	const mutedText = isUnavailable ? 'text-text-soft' : 'text-primary';

	return (
		<motion.li
			layout
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, x: -12 }}
			transition={{ duration: 0.2, delay: index * 0.035, ease: 'easeOut' }}
			className={`flex gap-3 border-b border-line-soft py-4 last:border-b-0 ${isUnavailable ? 'text-text-soft' : ''}`}>
			<div className='relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-warm'>
				{dish?.image ? (
					<Image
						src={dish.image.startsWith('/') ? dish.image : `/${dish.image}`}
						alt={dish.alt || dish.name}
						fill
						sizes='56px'
						className='object-cover'
					/>
				) : (
					<div className='absolute inset-0 animate-pulse bg-skeleton' />
				)}
			</div>

			<div className='min-w-0 flex-1'>
				<div className='flex items-start justify-between gap-3'>
					<p
						className={`font-mono text-[0.8rem] font-semibold leading-snug ${mutedText}`}>
						{item.quantity}× {item.name}
					</p>
					<p
						className={`shrink-0 font-mono text-[0.8rem] font-semibold ${mutedText}`}>
						₦{Number(currentTotal).toLocaleString()}
					</p>
				</div>

				{isUnavailable ? (
					<span className='mt-1 inline-flex rounded-full bg-danger-soft px-2 py-0.5 font-mono text-[0.62rem] font-semibold text-danger'>
						Sold out today
					</span>
				) : null}
				{details.some(Boolean) ? (
					<p className='mt-1 line-clamp-2 font-mono text-[0.68rem] leading-snug text-text-soft'>
						{details.filter(Boolean).join(' / ')}
					</p>
				) : null}
				{instructions ? (
					<p className='mt-1 line-clamp-1 font-mono text-[0.66rem] text-text-soft'>
						Note: {instructions}
					</p>
				) : null}

				<div className='mt-1.5 flex items-center gap-3 font-mono text-[0.68rem] font-semibold'>
					<button
						type='button'
						disabled={isUnavailable}
						onClick={() => setIsEditing((editing) => !editing)}
						className='text-ember hover:underline disabled:cursor-not-allowed disabled:text-disabled disabled:no-underline'>
						{isEditing ? 'Done' : 'Edit'}
					</button>
					<button
						type='button'
						onClick={onRemove}
						className='text-text-soft hover:text-ember'>
						Remove
					</button>
					{isEditing && !isUnavailable ? (
						<span className='ml-auto inline-flex items-center gap-2 text-primary'>
							<button
								type='button'
								aria-label='Decrease item quantity'
								disabled={item.quantity <= 1}
								onClick={() => onQuantityChange(item.quantity - 1)}
								className='flex h-7 w-7 items-center justify-center rounded border border-border disabled:opacity-40'>
								−
							</button>
							{item.quantity}
							<button
								type='button'
								aria-label='Increase item quantity'
								onClick={() => onQuantityChange(item.quantity + 1)}
								className='flex h-7 w-7 items-center justify-center rounded border border-border'>
								+
							</button>
						</span>
					) : null}
				</div>
			</div>
		</motion.li>
	);
}
