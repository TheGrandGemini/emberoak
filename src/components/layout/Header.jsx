'use client';

import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Logo from '@/components/layout/Logo';
import CartDrawer from '@/components/cart/CartDrawer';
import useCartStore from '@/store/cartStore';
import {
	CartButton,
	DesktopNavigation,
	MobileNavigation,
} from './HeaderNavigation';

const Header = () => {
	const pathname = usePathname();
	const router = useRouter();
	const cartItems = useCartStore((state) => state.cartItems);
	const isCartOpen = useCartStore((state) => state.isCartOpen);
	const openCart = useCartStore((state) => state.openCart);
	const closeCart = useCartStore((state) => state.closeCart);
	const cartCount = new Set(cartItems.map((item) => item.dishId ?? item.id))
		.size;
	const links = [
		{ label: 'Menu', href: '/menu' },
		{ label: 'Reservations', href: '/reservations' },
		{ label: 'Hours & Location', href: '/#location' },
	];

	const handleOrderClick = () =>
		isMenuPage ? openCart() : router.push('/menu');

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

		window.history.replaceState(null, '', '#location');
	};

	if (pathname === '/checkout') {
		return (
			<CartDrawer
				isOpen={isCartOpen}
				onClose={closeCart}
			/>
		);
	}

	return (
		<header className='sticky top-0 z-50 flex h-22 items-center justify-between bg-surface border-b-2 border-line-soft px-5 sm:px-8 lg:px-20'>
			<Logo />

			<div className='flex items-center gap-8'>
				<DesktopNavigation
					links={links}
					pathname={pathname}
					getHref={getLinkHref}
					onLocationClick={handleLocationClick}
				/>
				<div className='flex items-center gap-3'>
					<div className='hidden md:block'>
						<Button
							variant='primary'
							size='lg'
							onClick={handleOrderClick}
							className='h-10 rounded-[0.625rem] px-5 text-[0.8125rem] font-semibold text-surface'>
							{isMenuPage ? `Cart · ${cartCount}` : 'Order Now'}
						</Button>
					</div>
					<CartButton
						count={cartCount}
						onClick={openCart}
					/>
					<MobileNavigation
						links={links}
						pathname={pathname}
						getHref={getLinkHref}
						onLocationClick={handleLocationClick}
						isMenuPage={isMenuPage}
						cartCount={cartCount}
						onCartClick={openCart}
						onOrderClick={handleOrderClick}
					/>
				</div>
			</div>
			<CartDrawer
				isOpen={isCartOpen}
				onClose={closeCart}
			/>
		</header>
	);
};

export default Header;
