'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import useCartStore from '@/store/cartStore';
import useRestaurantStore from '@/store/restaurantStore';
import FulfillmentFields from './FulfillmentFields';
import OrderSummary from './OrderSummary';

const orderTypes = ['Dine-in', 'Takeaway', 'Delivery'];
const paymentMethods = [
	{ id: 'card', label: 'Card', description: 'Pay with debit/credit card' },
	{ id: 'transfer', label: 'Transfer', description: 'Bank transfer' },
];
const deliveryFee = 1200;

const currency = (amount) => `₦${Number(amount || 0).toLocaleString()}`;

function getConfigurationDetails(item) {
	const configurations = item.configurations || [item];
	return configurations
		.map((configuration) => {
			const choices = [
				configuration.heat,
				...(configuration.addOns || []).map((option) => `+ ${option.name}`),
			]
				.filter(Boolean)
				.join(' · ');
			return configurations.length > 1
				? `${configuration.quantity}× ${choices || 'Standard'}`
				: choices;
		})
		.filter(Boolean)
		.join(' / ');
}

export default function CheckoutPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const cartItems = useCartStore((state) => state.cartItems);
	const dishes = useRestaurantStore((state) => state.dishes);
	const clearCart = useCartStore((state) => state.clearCart);
	const [orderType, setOrderType] = useState('Dine-in');
	const [paymentMethod, setPaymentMethod] = useState('card');
	const [pickupName, setPickupName] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [orderPlaced, setOrderPlaced] = useState(false);
	const [formError, setFormError] = useState('');
	const [fieldErrors, setFieldErrors] = useState({});
	const tableId = searchParams.get('table');

	const items = useMemo(
		() =>
			cartItems.map((item) => {
				const dish = dishes.find((entry) => entry.id === item.dishId);
				const configurations = item.configurations || [item];
				const total = configurations.reduce((sum, configuration) => {
					const addOns = (configuration.addOns || []).reduce(
						(addOnSum, option) => {
							const currentOption = dish?.addOns?.find(
								(entry) => entry.name === option.name,
							);
							return (
								addOnSum + Number(currentOption?.price ?? option.price ?? 0)
							);
						},
						0,
					);
					const basePrice = Number(
						dish?.price ?? configuration.price ?? item.price ?? 0,
					);
					return sum + (basePrice + addOns) * configuration.quantity;
				}, 0);

				return {
					...item,
					name: dish?.name || item.name,
					image: dish?.image
						? dish.image.startsWith('/')
							? dish.image
							: `/${dish.image}`
						: null,
					alt: dish?.alt,
					details: getConfigurationDetails(item),
					total,
				};
			}),
		[cartItems, dishes],
	);
	const subtotal = items.reduce((sum, item) => sum + item.total, 0);
	const serviceCharge = Math.round(subtotal * 0.1);
	const currentDeliveryFee = orderType === 'Delivery' ? deliveryFee : 0;
	const total = subtotal + serviceCharge + currentDeliveryFee;
	const unavailableItems = cartItems.filter((item) => {
		const dish = dishes.find((entry) => entry.id === item.dishId);
		return !dish || dish.available === false;
	});

	const placeOrder = () => {
		if (!cartItems.length) {
			setFormError(
				'Your cart is empty. Add an item before placing your order.',
			);
			return;
		}
		if (unavailableItems.length) {
			setFormError(
				'Remove unavailable dishes from your cart before continuing.',
			);
			return;
		}
		const nextFieldErrors = {};
		if (orderType === 'Takeaway' && !pickupName.trim()) {
			nextFieldErrors.pickupName = 'Enter a name for pickup.';
		}
		if (orderType === 'Delivery' && !address.trim()) {
			nextFieldErrors.address = 'Enter your delivery address.';
		}
		if (orderType === 'Delivery' && !phone.trim()) {
			nextFieldErrors.phone = 'Enter a phone number for delivery updates.';
		}
		setFieldErrors(nextFieldErrors);
		if (Object.keys(nextFieldErrors).length > 0) {
			return;
		}

		setFormError('');
		setIsSubmitting(true);
		window.setTimeout(() => {
			setIsSubmitting(false);
			setOrderPlaced(true);
			clearCart();
		}, 700);
	};

	if (orderPlaced) {
		return (
			<main className='flex min-h-[calc(100svh-5.5rem)] items-center justify-center bg-page-soft px-5 py-12'>
				<motion.section
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					className='w-full max-w-md text-center'>
					<div
						className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-success-wash text-2xl text-success-strong'
						aria-hidden='true'>
						✓
					</div>
					<h1 className='font-display text-3xl font-semibold text-primary'>
						Order placed
					</h1>
					<p className='mt-3 font-sans text-sm leading-6 text-text-soft'>
						{orderType === 'Delivery'
							? 'Your order is being prepared for delivery.'
							: orderType === 'Takeaway'
								? 'Your order is being prepared for pickup.'
								: 'Your order has been sent to the kitchen.'}
					</p>
					<Link
						href='/menu'
						className='mt-6 inline-flex min-h-11 items-center justify-center rounded-[0.625rem] bg-ember px-5 font-sans text-sm font-semibold text-white hover:bg-ember-hover'>
						Back to Menu
					</Link>
				</motion.section>
			</main>
		);
	}

	if (!cartItems.length) {
		return (
			<main className='flex min-h-[calc(100svh-5.5rem)] items-center justify-center bg-page-soft px-5 py-12'>
				<div className='max-w-sm text-center'>
					<h1 className='font-display text-2xl font-semibold text-primary'>
						Your cart is empty
					</h1>
					<p className='mt-2 font-sans text-sm text-text-soft'>
						Add something from the menu before checkout.
					</p>
					<Link
						href='/menu'
						className='mt-5 inline-flex min-h-11 items-center justify-center rounded-[0.625rem] bg-ember px-5 font-sans text-sm font-semibold text-white'>
						Browse Menu
					</Link>
				</div>
			</main>
		);
	}

	return (
		<motion.main
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, ease: 'easeOut' }}
			className='min-h-[calc(100svh-5.5rem)] bg-page-soft'>
			<header className='flex h-16 items-center justify-between border-b border-line-soft bg-white px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-76rem)/2))]'>
				<Link
					href='/'
					className='font-display text-lg font-semibold text-oak'>
					Ember <span className='text-ember'>&amp;</span> Oak
				</Link>
				<button
					type='button'
					onClick={() => {
						router.push('/menu?cart=1');
					}}
					className='font-sans text-sm font-semibold text-text-subtle transition-colors hover:text-ember'>
					<span aria-hidden='true'>←</span> Back to Cart
				</button>
			</header>

			<div className='mx-auto grid w-full max-w-6xl gap-10 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(21rem,0.85fr)] lg:gap-12 lg:py-12'>
				<motion.section
					initial={{ opacity: 0, x: -12 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.28, delay: 0.06, ease: 'easeOut' }}>
					<h1 className='font-sans text-3xl font-semibold text-primary'>
						Checkout
					</h1>
					<FulfillmentFields
						orderType={orderType}
						onOrderTypeChange={(type) => {
							setOrderType(type);
							setFormError('');
							setFieldErrors({});
						}}
						paymentMethod={paymentMethod}
						onPaymentMethodChange={setPaymentMethod}
						tableId={tableId}
						pickupName={pickupName}
						setPickupName={setPickupName}
						address={address}
						setAddress={setAddress}
						phone={phone}
						setPhone={setPhone}
						fieldErrors={fieldErrors}
						clearFieldError={(field) =>
							setFieldErrors((errors) => ({ ...errors, [field]: '' }))
						}
					/>
					{formError ? (
						<p
							role='alert'
							className='mt-5 rounded-[0.625rem] bg-danger-wash px-4 py-3 font-sans text-sm text-danger-strong'>
							{formError}
						</p>
					) : null}
				</motion.section>

				<motion.div
					initial={{ opacity: 0, x: 12 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.28, delay: 0.12, ease: 'easeOut' }}
					className='lg:pt-1'>
					<div className='lg:sticky lg:top-8'>
						<OrderSummary
							items={items}
							subtotal={subtotal}
							serviceCharge={serviceCharge}
							deliveryFee={currentDeliveryFee}
							total={total}
						/>
						<button
							type='button'
							onClick={placeOrder}
							disabled={isSubmitting || unavailableItems.length > 0}
							className='mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-[0.625rem] bg-ember px-4 font-sans text-sm font-semibold text-white transition-colors hover:bg-ember-hover disabled:cursor-not-allowed disabled:bg-line-soft disabled:text-text-soft'>
							{isSubmitting ? (
								<span className='h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white' />
							) : null}
							Place Order — {currency(total)}
						</button>
						<p className='mt-2 text-center font-sans text-xs text-text-subtle'>
							Payment: {paymentMethod === 'card' ? 'Card' : 'Bank transfer'}
						</p>
					</div>
				</motion.div>
			</div>
		</motion.main>
	);
}
