'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const MotionLink = motion(Link);

export default function DishCard({
	name,
	description,
	price,
	image,
	alt,
	available = true,
	className = '',
	href,
	index = 0,
	onSelect,
}) {
	const imageSrc = image
		? image.startsWith('/')
			? image
			: `/${image}`
		: '/assets/placeholder.png';
	const safePrice = Number(price ?? 0);

	const cardProps = {
		className: `dish-card-enter overflow-hidden rounded-[0.875rem] border border-border bg-surface ${
			available ? '' : 'opacity-60'
		} ${className}`,
		initial: false,
		whileHover: available ? { y: -5, scale: 1.04 } : undefined,
		whileTap: available ? { scale: 0.96 } : undefined,
		transition: {
			duration: 0.14,
			ease: 'easeOut',
		},
		style: { animationDelay: `${index * 100}ms` },
	};

	const content = (
		<>
			<div className='relative aspect-[1.55] w-full overflow-hidden bg-muted'>
				{!available ? (
					<div className='absolute left-3 top-3 z-10 inline-flex items-center rounded-full border border-danger-soft bg-danger-soft px-2 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-ember'>
						Sold out today
					</div>
				) : null}
				<Image
					src={imageSrc}
					alt={alt || name || 'Dish image'}
					fill
					sizes='(max-width: 768px) 100vw, 33vw'
					className='object-cover'
				/>
			</div>
			<div className='px-4 py-4 flex flex-col items-start gap-1.5'>
				<h3 className='font-mono text-body-sm font-semibold leading-normal text-oak'>
					{name}
				</h3>
				<p className='font-mono text-caption leading-normal text-text-soft font-normal'>
					{description}
				</p>
				<p className='font-mono text-[0.8125rem] font-semibold text-oak '>
					₦{safePrice.toLocaleString()}
				</p>
			</div>
		</>
	);

	return href ? (
		<MotionLink
			href={href}
			className={`h-fit ${available ? '' : 'cursor-not-allowed'}`}
			{...cardProps}>
			{content}
		</MotionLink>
	) : (
		<motion.article
			className={`h-fit ${available ? 'cursor-pointer' : 'cursor-not-allowed'}`}
			onClick={available ? onSelect : undefined}
			{...cardProps}>
			{content}
		</motion.article>
	);
}
