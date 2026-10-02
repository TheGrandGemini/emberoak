import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CartEmptyState({ onClose }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.22, ease: 'easeOut' }}
			className='flex min-h-64 flex-1 flex-col items-center justify-center px-6 py-12 text-center'>
			<svg
				className='mb-3 h-9 w-9 text-text-soft'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='1.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				aria-hidden='true'>
				<circle
					cx='9'
					cy='21'
					r='1'
				/>
				<circle
					cx='20'
					cy='21'
					r='1'
				/>
				<path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' />
			</svg>
			<h3 className='font-mono text-sm font-semibold text-primary'>
				Your cart is empty.
			</h3>
			<p className='mt-2 font-mono text-xs text-text-soft'>
				Browse the menu to get started.
			</p>
			<Link
				href='/menu'
				onClick={onClose}
				className='mt-3 inline-flex min-h-10 items-center justify-center rounded-[0.625rem] bg-ember px-5 font-mono text-xs font-semibold text-white transition-colors hover:bg-ember-hover'>
				Browse Menu
			</Link>
		</motion.div>
	);
}
