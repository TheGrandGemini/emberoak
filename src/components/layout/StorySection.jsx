'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';

const storyImage = '/assets/grill_station.jpg';

export default function StorySection() {
	return (
		<Section className='bg-surface py-20 sm:py-24 lg:py-32'>
			<div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20'>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					className='relative aspect-[1.2] w-full max-w-none overflow-hidden rounded-[1.25rem] bg-surface-warm bg-cover bg-center'
					style={{ backgroundImage: `url('${storyImage}')` }}
					aria-label='Placeholder image for the Ember and Oak story'
				/>

				<motion.div
					initial={{ opacity: 0, x: 32 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
					className='max-w-xl lg:pl-1'>
					<p className='text-label text-ember'>Our story</p>
					<h2 className='text-h2 mt-5 text-primary'>
						Built around the open grill
					</h2>
					<p className='mt-6 max-w-lg text-body-lg text-secondary'>
						Ember &amp; Oak started with one idea: cook the way West African
						kitchens have for generations — over real fire, in full view — and
						serve it without the fuss. Every plate that leaves the grill is
						finished within sight of the dining room.
					</p>
				</motion.div>
			</div>
		</Section>
	);
}
