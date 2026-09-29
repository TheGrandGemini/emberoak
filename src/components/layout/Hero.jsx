'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function Hero() {
	return (
		<section className='relative isolate min-h-[calc(100svh-5.5rem)] overflow-hidden bg-oak text-white'>
			<motion.div
				initial={{ x: 0, scale: 1, opacity: 1 }}
				animate={{ x: 0, scale: 1, opacity: 1 }}
				transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
				className='hero-image-enter pointer-events-none absolute inset-0 z-0 bg-cover bg-center'
				style={{ backgroundImage: "url('/assets/01_interior.jpg')" }}
			/>
			<div
				className='pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(23,19,15,0.34)_0%,rgba(23,19,15,0.04)_35%,rgba(23,19,15,0.28)_100%)]'
				aria-hidden='true'
			/>
			<div
				className='pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(15,10,7,0.68)_0%,rgba(15,10,7,0.28)_42%,rgba(15,10,7,0)_74%)]'
				aria-hidden='true'
			/>

			<motion.div
				initial={{ opacity: 1, x: 0 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
				className='hero-content-enter relative z-20 flex min-h-[calc(100svh-5.5rem)] items-end px-5 pb-[10%] sm:px-10 lg:px-20'>
				<div className='max-w-xl'>
					<p className='mb-5 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#E9C0B6] sm:text-xs'>
						Ember &amp; Oak · Lagos
					</p>
					<h1 className='max-w-lg font-display text-5xl font-semibold leading-[0.94] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl'>
						Slow-grilled,
						<br />
						fast-loved.
					</h1>
					<p className='mt-6 max-w-md font-sans text-sm leading-6 text-white/90 sm:text-base sm:leading-7'>
						Modern West African-rooted casual dining in the heart of Lagos —
						open grill, honest portions, dine-in, takeaway or delivered to your
						door.
					</p>
					<div className='mt-7 flex flex-wrap items-center gap-3'>
						<Button
							variant='primary'
							size='lg'
							className='rounded-[0.625rem] bg-ember px-6 text-sm font-semibold text-white'>
							Order Now
						</Button>
						<Button
							variant='ghost'
							size='lg'
							className='rounded-[0.625rem] border border-white/80 bg-transparent px-6 text-sm font-semibold text-white hover:bg-white/10 hover:text-white'>
							Reserve a Table
						</Button>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
