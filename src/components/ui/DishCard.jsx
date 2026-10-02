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
	className = '',
	href,
	index = 0,
}) {
	const imageSrc = image
		? image.startsWith('/')
			? image
			: `/${image}`
		: '/assets/placeholder.png';
	const safePrice = Number(price ?? 0);

	const cardProps = {
		className: `dish-card-enter overflow-hidden rounded-[0.875rem] border border-border bg-surface ${className}`,
		initial: false,
		whileHover: { y: -5, scale: 1.04 },
		whileTap: { scale: 0.96 },
		transition: {
			type: 'spring',
			stiffness: 360,
			damping: 24,
			delay: index * 0.1,
		},
		style: { animationDelay: `${index * 100}ms` },
	};

	const content = (
		<>
			<div className='relative aspect-[1.55] w-full overflow-hidden bg-muted'>
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
				<p className='font-mono text-caption leading-normal text-[#857c6f] font-normal'>
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
			className='h-fit'
			{...cardProps}>
			{content}
		</MotionLink>
	) : (
		<motion.article
			className='h-fit'
			{...cardProps}>
			{content}
		</motion.article>
	);
}
