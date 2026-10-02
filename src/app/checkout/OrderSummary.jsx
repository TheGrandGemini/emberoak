'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

function formatCurrency(amount) {
	return `₦${Number(amount || 0).toLocaleString()}`;
}

export default function OrderSummary({
	items,
	subtotal,
	serviceCharge,
	deliveryFee,
	total,
}) {
	return (
		<motion.aside
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.24, delay: 0.16 }}
			className='overflow-hidden rounded-2xl border border-line-soft bg-white'>
			<header className='border-b border-line-soft px-5 py-4'>
				<h2 className='font-sans text-lg font-semibold text-primary'>
					Order Summary
				</h2>
				<p className='mt-1 font-sans text-sm text-text-subtle'>Order preview</p>
			</header>
			<ul className='divide-y divide-line-soft px-5'>
				{items.map((item, index) => (
					<motion.li
						key={item.id}
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.18, delay: 0.2 + index * 0.04 }}
						className='flex gap-3 py-4'>
						<div className='relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-warm'>
							{item.image ? (
								<Image
									src={item.image}
									alt={item.alt || item.name}
									fill
									sizes='56px'
									className='object-cover'
								/>
							) : null}
						</div>
						<div className='min-w-0 flex-1'>
							<p className='font-mono text-[0.8rem] font-semibold leading-snug text-primary'>
								{item.quantity}× {item.name}
							</p>
							{item.details ? (
								<p className='mt-1 line-clamp-2 font-mono text-[0.68rem] text-text-subtle'>
									{item.details}
								</p>
							) : null}
						</div>
						<p className='shrink-0 pt-1 font-mono text-[0.8rem] font-semibold text-primary'>
							{formatCurrency(item.total)}
						</p>
					</motion.li>
				))}
			</ul>

			<div className='space-y-2 border-t border-line-soft px-5 py-4 font-mono text-xs'>
				<div className='flex justify-between text-text-subtle'>
					<span>Subtotal</span>
					<span className='text-primary'>{formatCurrency(subtotal)}</span>
				</div>
				<div className='flex justify-between text-text-subtle'>
					<span>Service (10%)</span>
					<span className='text-primary'>{formatCurrency(serviceCharge)}</span>
				</div>
				{deliveryFee > 0 ? (
					<div className='flex justify-between text-text-subtle'>
						<span>Delivery fee</span>
						<span className='text-primary'>{formatCurrency(deliveryFee)}</span>
					</div>
				) : null}
				<div className='flex justify-between border-t border-line-soft pt-3 text-base font-semibold text-primary'>
					<span>Total</span>
					<span>{formatCurrency(total)}</span>
				</div>
			</div>
		</motion.aside>
	);
}
