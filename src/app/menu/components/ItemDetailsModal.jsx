'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import ItemDetailsContent from './ItemDetailsContent';

export default function ItemDetailsModal({ dish, onClose }) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, []);

	useEffect(() => {
		const timeout = window.setTimeout(() => setIsLoading(false), 450);

		return () => window.clearTimeout(timeout);
	}, [dish?.id]);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='fixed inset-0 z-50 flex items-end justify-center overflow-hidden bg-black/30 px-3 pb-3 backdrop-blur-[1px] sm:items-center sm:overflow-y-auto sm:px-5 sm:py-6 md:px-8'>
				<motion.div
					initial={{ opacity: 0, scale: 0.96, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.96, y: 20 }}
					transition={{ duration: 0.2, ease: 'easeOut' }}
					className='flex max-h-[92dvh] w-full max-w-none flex-col overflow-hidden rounded-4xl bg-white shadow-overlay sm:max-h-[calc(100dvh-3rem)] sm:max-w-[min(34rem,calc(100vw-2.5rem))] sm:rounded-[1.125rem] sm:border sm:border-border sm:bg-surface-soft'>
					<header className='relative flex h-10 shrink-0 items-center justify-center border-b border-line-muted bg-white px-4 sm:h-auto sm:justify-between sm:px-5 sm:py-3'>
						<div className='h-1.5 w-18 rounded-full bg-line-soft sm:hidden' />
						<h2 className='hidden font-mono text-base font-semibold text-primary sm:block'>
							Item Details
						</h2>
						<button
							type='button'
							onClick={onClose}
							aria-label='Close item details'
							className='absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-lg leading-none text-secondary transition-colors hover:bg-muted hover:text-primary sm:static sm:translate-y-0'>
							×
						</button>
					</header>

					<div className='shrink-0 bg-white px-3 pt-3 sm:bg-surface-warm sm:px-5 sm:py-4'>
						<div className='relative aspect-[1.08] max-h-[48dvh] w-full overflow-hidden rounded-xl border border-line-soft bg-surface-image sm:aspect-[1.75] sm:max-h-[28dvh] sm:rounded-[0.875rem]'>
							{isLoading ? (
								<div className='absolute inset-0 animate-pulse bg-skeleton' />
							) : dish?.image ? (
								<Image
									src={
										dish.image.startsWith('/') ? dish.image : `/${dish.image}`
									}
									alt={dish.alt || dish.name}
									fill
									sizes='(max-width: 768px) 100vw, 33vw'
									className='object-cover'
								/>
							) : null}
						</div>
					</div>

					<div className='flex min-h-0 flex-1 flex-col overflow-hidden'>
						<ItemDetailsContent
							dish={dish}
							isLoading={isLoading}
							onClose={onClose}
						/>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
