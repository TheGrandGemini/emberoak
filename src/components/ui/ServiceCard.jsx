'use client';

import { motion } from 'framer-motion';

export default function ServiceCard({ title, copy, index = 0 }) {
	return (
		<motion.article
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.25 }}
			whileHover={{ y: -5, scale: 1.02 }}
			transition={{
				type: 'spring',
				stiffness: 340,
				damping: 24,
				delay: index * 0.1,
			}}
			className='min-h-40 rounded-12 border border-border bg-surface px-7 py-8 sm:flex sm:min-h-24 sm:items-center sm:justify-center sm:px-4 sm:py-5 lg:block lg:min-h-40 lg:px-8 lg:py-8'>
			<h3 className='font-sans text-xl font-semibold leading-tight text-primary sm:text-center lg:text-left'>
				{title}
			</h3>
			<p className='mt-4 block max-w-sm font-sans text-base leading-6 text-secondary sm:hidden lg:block'>
				{copy}
			</p>
		</motion.article>
	);
}
