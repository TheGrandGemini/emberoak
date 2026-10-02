'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';

export default function LocationSection() {
	return (
		<Section
			id='location'
			className='scroll-mt-22 bg-[#faf9f7] py-20 sm:py-24 lg:py-32'>
			<div className='grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20'>
				<motion.div
					initial={{ opacity: 0, x: -32 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
					<p className='text-label text-ember'>Visit us</p>
					<h2 className='text-h2 mt-5 text-primary'>Find us in Lagos</h2>
					<div className='mt-8 rounded-[0.875rem] border border-border bg-surface px-7 py-8 sm:px-8'>
						<dl className='space-y-5'>
							<div>
								<dt className='font-sans text-sm font-semibold text-secondary'>
									Address
								</dt>
								<dd className='mt-1 font-sans text-base leading-6 text-primary'>
									14 Admiralty Way, Lekki Phase 1, Lagos
								</dd>
							</div>
							<div>
								<dt className='font-sans text-sm font-semibold text-secondary'>
									Hours
								</dt>
								<dd className='mt-1 font-sans text-base leading-6 text-primary'>
									11:00 AM – 11:00 PM, daily
								</dd>
							</div>
							<div>
								<dt className='font-sans text-sm font-semibold text-secondary'>
									Phone
								</dt>
								<dd className='mt-1 font-sans text-base leading-6 text-primary'>
									+234 803 555 0142
								</dd>
							</div>
						</dl>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 32 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
					whileHover={{ scale: 1.015 }}
					className='relative aspect-[1.48] overflow-hidden rounded-[1.25rem]'>
					<Image
						src='/assets/exterior.jpg'
						alt='Ember and Oak restaurant exterior in Lagos'
						fill
						sizes='(max-width: 1024px) 100vw, 60vw'
						className='object-cover transition-transform duration-700 hover:scale-105'
					/>
				</motion.div>
			</div>
		</Section>
	);
}
