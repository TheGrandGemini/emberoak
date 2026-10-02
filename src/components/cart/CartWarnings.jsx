import { AnimatePresence, motion } from 'framer-motion';

export default function CartWarnings({ unavailableMessage, hasPriceChanges }) {
	return (
		<div className='space-y-3'>
			<AnimatePresence initial={false}>
				{unavailableMessage ? (
					<motion.div
						key='unavailable-warning'
						initial={{ opacity: 0, y: -6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -6 }}
						transition={{ duration: 0.18 }}
						className='mt-4 flex items-center gap-2 rounded-lg bg-danger-wash px-3 py-3 font-mono text-[0.7rem] leading-snug text-danger'
						role='alert'>
						<span aria-hidden='true'>×</span>
						<span>{unavailableMessage}</span>
					</motion.div>
				) : null}
				{hasPriceChanges ? (
					<motion.div
						key='price-warning'
						initial={{ opacity: 0, y: -6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -6 }}
						transition={{ duration: 0.18, delay: 0.04 }}
						className='mt-4 flex items-start gap-2 rounded-lg bg-warning-wash px-3 py-3 font-mono text-[0.7rem] leading-snug text-warning-strong'
						role='status'>
						<span aria-hidden='true'>!</span>
						<span>
							A price changed since you added this item. Totals below reflect
							the current menu.
						</span>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}
