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
	const cardProps = {
		className: `overflow-hidden rounded-[0.875rem] border border-border bg-surface ${className}`,
		initial: { opacity: 0, y: 24 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, amount: 0.2 },
		whileHover: { y: -5, scale: 1.04 },
		whileTap: { scale: 0.96 },
		transition: {
			type: 'spring',
			stiffness: 360,
			damping: 24,
			delay: index * 0.1,
		},
	};

	const content = (
		<>
			<div className='relative aspect-[1.55] overflow-hidden bg-muted'>
				<Image
					src={image}
					alt={alt || name}
					fill
					sizes='(max-width: 768px) 100vw, 33vw'
					className='object-cover'
				/>
			</div>
			<div className='px-6 py-5'>
				<h3 className='font-sans text-lg font-semibold leading-tight text-primary'>
					{name}
				</h3>
				<p className='mt-2 font-sans text-sm leading-6 text-secondary'>
					{description}
				</p>
				<p className='mt-3 font-sans text-lg font-semibold text-primary'>
					{price}
				</p>
			</div>
		</>
	);

	return href ? (
		<MotionLink
			href={href}
			{...cardProps}>
			{content}
		</MotionLink>
	) : (
		<motion.article {...cardProps}>{content}</motion.article>
	);
}
