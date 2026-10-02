'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import useCartStore from '@/store/cartStore';
import useRestaurantStore from '@/store/restaurantStore';

import {
	getCartTotals,
	getCartWarnings,
	reconcileCartItem,
} from './cartCalculations';
import CartEmptyState from './CartEmptyState';
import CartItemRow from './CartItemRow';
import CartLoadingState from './CartLoadingState';
import CartSummary from './CartSummary';
import CartWarnings from './CartWarnings';

export default function CartDrawer({ isOpen, onClose }) {
	const cartItems = useCartStore((state) => state.cartItems);
	const dishes = useRestaurantStore((state) => state.dishes);
	const cartOpenVersion = useCartStore((state) => state.cartOpenVersion);
	const removeCartItem = useCartStore((state) => state.removeCartItem);
	const updateCartItemQuantity = useCartStore(
		(state) => state.updateCartItemQuantity,
	);
	const [loadedVersion, setLoadedVersion] = useState(0);
	const isLoading = isOpen && loadedVersion !== cartOpenVersion;

	const checkedItems = useMemo(
		() => cartItems.map((item) => reconcileCartItem(item, dishes)),
		[cartItems, dishes],
	);
	const { unavailableItems, hasPriceChanges, unavailableMessage } =
		getCartWarnings(checkedItems);
	const { subtotal, serviceCharge, total } = getCartTotals(checkedItems);

	useEffect(() => {
		if (!isOpen) return undefined;

		const previousOverflow = document.body.style.overflow;
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') onClose();
		};

		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		if (!isOpen || loadedVersion === cartOpenVersion) return undefined;

		const timeout = window.setTimeout(() => {
			setLoadedVersion(cartOpenVersion);
		}, 350);

		return () => window.clearTimeout(timeout);
	}, [isOpen, cartOpenVersion, loadedVersion]);

	return (
		<AnimatePresence>
			{isOpen ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onMouseDown={(event) => {
						if (event.target === event.currentTarget) onClose();
					}}
					className='fixed inset-0 z-70 flex items-end justify-center bg-black/35 px-3 pb-3 sm:items-center sm:overflow-y-auto sm:px-5 sm:py-6 md:px-8'>
					<motion.section
						role='dialog'
						aria-modal='true'
						aria-labelledby='cart-title'
						initial={{ opacity: 0, y: 18, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 18, scale: 0.98 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
						className='flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-4xl border border-line-soft bg-white shadow-overlay sm:max-h-[calc(100dvh-3rem)] sm:rounded-[1.125rem]'>
						<header className='flex h-14 shrink-0 items-center justify-between border-b border-line-soft px-5'>
							<h2
								id='cart-title'
								className='font-mono text-base font-semibold text-primary'>
								Your Cart
							</h2>
							<button
								type='button'
								aria-label='Close cart'
								onClick={onClose}
								className='flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-secondary transition-colors hover:bg-muted hover:text-primary'>
								×
							</button>
						</header>

						{isLoading ? (
							<CartLoadingState />
						) : checkedItems.length === 0 ? (
							<CartEmptyState onClose={onClose} />
						) : (
							<>
								<div className='min-h-0 flex-1 overflow-y-auto px-5'>
									<CartWarnings
										unavailableMessage={unavailableMessage}
										hasPriceChanges={hasPriceChanges}
									/>
									<ul className='divide-y divide-line-soft'>
										<AnimatePresence
											initial={false}
											mode='popLayout'>
											{checkedItems.map((item, index) => (
												<CartItemRow
													key={item.id}
													item={item}
													dish={item.dish}
													currentTotal={item.currentTotal}
													isUnavailable={item.isUnavailable}
													index={index}
													onRemove={() => removeCartItem(item.id)}
													onQuantityChange={(quantity) =>
														updateCartItemQuantity(item.id, quantity)
													}
												/>
											))}
										</AnimatePresence>
									</ul>
								</div>
								<CartSummary
									subtotal={subtotal}
									serviceCharge={serviceCharge}
									total={total}
									checkoutDisabled={unavailableItems.length > 0}
								/>
							</>
						)}
					</motion.section>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}
