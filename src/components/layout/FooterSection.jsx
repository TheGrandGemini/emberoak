'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionLink = motion(Link);

export default function FooterSection() {
	return (
		<footer className='relative overflow-hidden bg-oak px-5 py-24 text-center sm:px-8 sm:py-28 lg:py-32'>
			<div className='relative z-10 mx-auto flex max-w-xl flex-col items-center'>
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
					className='font-display text-4xl font-semibold leading-none tracking-[-0.03em] text-white sm:text-5xl'>
					Hungry yet?
				</motion.h2>
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
					className='mt-8'>
					<MotionLink
						href='/menu'
						whileHover={{ y: -3, scale: 1.03 }}
						whileTap={{ scale: 0.96 }}
						transition={{ type: 'spring', stiffness: 420, damping: 22 }}
						className='inline-flex h-12 items-center justify-center rounded-[0.625rem] text-white bg-ember px-7 font-sans text-base font-semibold shadow-subtle transition-colors hover:brightness-110'>
						View the Menu
					</MotionLink>
				</motion.div>
			</div>
		</footer>
	);
}
