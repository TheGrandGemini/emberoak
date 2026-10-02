'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function DesktopNavigation({
	links,
	pathname,
	getHref,
	onLocationClick,
}) {
	return (
		<nav className='hidden items-center gap-8 lg:flex'>
			{links.map((link) => (
				<motion.div
					key={link.href}
					whileHover={{ y: -1 }}>
					<Link
						href={getHref(link.href)}
						onClick={link.href === '/#location' ? onLocationClick : undefined}
						className={`font-mono text-sm font-normal transition-colors ${pathname === link.href ? 'text-ember' : 'text-text-dark-soft hover:text-ember'}`}>
						{link.label}
					</Link>
				</motion.div>
			))}
		</nav>
	);
}

export function MobileNavigation({
	links,
	pathname,
	getHref,
	onLocationClick,
	isMenuPage,
	cartCount,
	onCartClick,
	onOrderClick,
}) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!isOpen) return undefined;

		const previousOverflow = document.body.style.overflow;
		const onKeyDown = (event) => {
			if (event.key === 'Escape') setIsOpen(false);
		};

		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', onKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen]);

	const close = () => setIsOpen(false);
	const handleOrder = () => {
		if (isMenuPage) onCartClick();
		else onOrderClick();
		close();
	};

	return (
		<>
			<button
				type='button'
				aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
				aria-expanded={isOpen}
				aria-controls='mobile-navigation-drawer'
				onClick={() => setIsOpen((open) => !open)}
				className='relative flex h-10 w-10 touch-manipulation items-center justify-center rounded-full text-oak transition-colors hover:bg-muted lg:hidden'>
				<span className='mobile-menu-line' />
				<span className='mobile-menu-line' />
				<span className='mobile-menu-line' />
			</button>

			<AnimatePresence>
				{isOpen ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={close}
						className='fixed inset-0 z-60 bg-black/35 lg:hidden'>
						<motion.aside
							id='mobile-navigation-drawer'
							role='dialog'
							aria-modal='true'
							aria-label='Site navigation'
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ duration: 0.24, ease: 'easeOut' }}
							onClick={(event) => event.stopPropagation()}
							className='absolute right-0 top-0 flex h-full w-[min(22rem,88vw)] flex-col border-l border-border bg-surface px-5 pb-6 pt-5 shadow-overlay sm:px-7'>
							<div className='flex items-center justify-between border-b border-border pb-5'>
								<div>
									<p className='font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ember'>
										Restora
									</p>
									<h2 className='mt-1 font-display text-xl text-primary'>
										Explore
									</h2>
								</div>
								<button
									type='button'
									aria-label='Close navigation menu'
									onClick={close}
									className='flex h-10 w-10 items-center justify-center rounded-full text-2xl leading-none text-secondary transition-colors hover:bg-muted hover:text-primary'>
									×
								</button>
							</div>

							<nav
								aria-label='Mobile navigation'
								className='flex flex-1 flex-col gap-1 pt-5'>
								{links.map((link) => (
									<Link
										key={link.href}
										href={getHref(link.href)}
										onClick={(event) => {
											if (link.href === '/#location') onLocationClick(event);
											close();
										}}
										aria-current={pathname === link.href ? 'page' : undefined}
										className={`rounded-lg px-3 py-3.5 font-mono text-sm transition-colors hover:bg-muted hover:text-ember ${pathname === link.href ? 'bg-ember-soft text-ember' : 'text-text-dark-soft'}`}>
										{link.label}
									</Link>
								))}
							</nav>

							<button
								type='button'
								onClick={handleOrder}
								className='mt-4 flex min-h-12 items-center justify-center rounded-[0.625rem] bg-ember px-4 font-mono text-sm font-semibold text-white transition-colors hover:bg-ember-hover'>
								{isMenuPage ? `Cart · ${cartCount}` : 'Order Now'}
							</button>
						</motion.aside>
					</motion.div>
				) : null}
			</AnimatePresence>
		</>
	);
}

export function CartButton({ count, onClick }) {
	return (
		<button
			type='button'
			aria-label={`Open cart, ${count} dishes`}
			onClick={onClick}
			className='relative flex h-10 w-10 items-center justify-center rounded-full text-oak transition-colors hover:bg-muted md:hidden'>
			<svg
				className='h-5 w-5'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='1.7'
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
			{count > 0 ? (
				<span className='absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-ember px-1 font-mono text-[0.58rem] font-semibold text-white'>
					{count}
				</span>
			) : null}
		</button>
	);
}
