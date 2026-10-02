'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Logo from '@/components/Logo';

const Header = () => {
	const pathname = usePathname();
	const [isOrderOpen, setIsOrderOpen] = useState(false);

	const links = [
		{ label: 'Menu', href: '/menu' },
		{ label: 'Reservations', href: '/reservations' },
		{ label: 'Hours & Location', href: '/#location' },
	];

	const openOrderModal = () => {
		setIsOrderOpen(true);
	};

	const getLinkHref = (href) =>
		href === '/#location' && pathname === '/' ? '#location' : href;
	const isMenuPage = pathname === '/menu';

	const handleLocationClick = (event) => {
		if (pathname !== '/') return;

		event.preventDefault();
		document.getElementById('location')?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});

		const menu = event.currentTarget.closest('details');
		if (menu) menu.open = false;
		window.history.replaceState(null, '', '#location');
	};

	return (
		<header className='sticky top-0 z-50 flex h-22 items-center justify-between bg-surface border-b-2 border-[#e4e0d9] px-5 sm:px-8 lg:px-20'>
			<Logo />

			<div className='flex items-center gap-8'>
				<nav className='hidden items-center gap-8 lg:flex'>
					{links.map((link) => {
						const isActive = pathname === link.href;

						return (
							<motion.div
								key={link.href}
								whileHover={{ y: -1 }}>
								<Link
									href={getLinkHref(link.href)}
									onClick={
										link.href === '/#location' ? handleLocationClick : undefined
									}
									className={`font-mono text-sm font-normal transition-colors ${isActive ? 'text-ember' : 'text-[#4d473d] hover:text-ember'}`}>
									{link.label}
								</Link>
							</motion.div>
						);
					})}
				</nav>

				<div className='flex items-center gap-3'>
					<div className='hidden md:block'>
						<Button
							variant='primary'
							size='lg'
							onClick={openOrderModal}
							className='h-10 rounded-[0.625rem] px-5 text-[0.8125rem] font-semibold text-surface'>
							{isMenuPage ? 'Cart · 0' : 'Order Now'}
						</Button>
					</div>

					<details className='group static md:hidden'>
						<summary className='relative z-10 flex h-10 w-10 list-none touch-manipulation items-center justify-center rounded-full text-oak [&::-webkit-details-marker]:hidden'>
							<span className='mobile-menu-line' />
							<span className='mobile-menu-line' />
							<span className='mobile-menu-line' />
						</summary>
						<div className='absolute left-0 right-0 top-full z-60 border-t border-border bg-surface p-5 shadow-overlay'>
							<nav className='flex flex-col gap-1'>
								{links.map((link) => (
									<Link
										key={link.href}
										href={getLinkHref(link.href)}
										onClick={
											link.href === '/#location'
												? handleLocationClick
												: undefined
										}
										className='rounded-6 px-3 py-3 font-mono text-sm text-[#4d473d] transition-colors hover:bg-muted hover:text-ember'>
										{link.label}
									</Link>
								))}
								<button
									type='button'
									onClick={openOrderModal}
									className='mt-2 rounded-6 bg-ember px-3 py-3 text-left font-mono text-sm text-white'>
									{isMenuPage ? 'Cart · 0' : 'Order Now'}
								</button>
							</nav>
						</div>
					</details>
				</div>
			</div>
		</header>
	);
};

export default Header;
