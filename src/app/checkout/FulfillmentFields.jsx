'use client';

import { AnimatePresence, motion } from 'framer-motion';

function TextField({
	label,
	value,
	onChange,
	placeholder,
	type = 'text',
	error,
}) {
	const id = label.toLowerCase().replaceAll(' ', '-');

	return (
		<div>
			<label
				htmlFor={id}
				className='block font-sans text-sm font-medium text-primary'>
				{label}
			</label>
			<input
				id={id}
				type={type}
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				aria-invalid={Boolean(error)}
				aria-describedby={error ? `${id}-error` : undefined}
				className={`mt-2 h-11 w-full rounded-[0.625rem] border bg-white px-3.5 font-sans text-sm font-normal outline-none transition-colors placeholder:text-text-faint focus:border-ember ${error ? 'border-danger focus:border-danger' : 'border-line-input'}`}
			/>
			{error ? (
				<p
					id={`${id}-error`}
					className='mt-1.5 font-sans text-xs text-danger'>
					{error}
				</p>
			) : null}
		</div>
	);
}

function OrderTypeSelector({ value, onChange }) {
	const orderTypes = ['Dine-in', 'Takeaway', 'Delivery'];
	return (
		<div className='mt-8'>
			<h2 className='mb-3 font-sans text-base font-semibold text-primary'>
				Order type
			</h2>
			<div
				className='flex flex-wrap gap-2.5'
				role='group'
				aria-label='Order type'>
				{orderTypes.map((type) => (
					<button
						key={type}
						type='button'
						aria-pressed={value === type}
						onClick={() => onChange(type)}
						className={`min-h-12 rounded-[0.625rem] border px-5 font-sans text-sm font-semibold transition-colors ${value === type ? 'border-2 border-ember bg-ember-soft text-ember' : 'border-line-muted bg-white text-text-dark-soft hover:border-ember'}`}>
						{type}
					</button>
				))}
			</div>
		</div>
	);
}

function FulfillmentDetails({
	orderType,
	tableId,
	pickupName,
	setPickupName,
	address,
	setAddress,
	phone,
	setPhone,
	fieldErrors,
	clearFieldError,
}) {
	if (orderType === 'Dine-in') {
		return (
			<section aria-labelledby='table-title'>
				<h2
					id='table-title'
					className='mb-3 font-sans text-base font-semibold text-primary'>
					Table
				</h2>
				<div className='flex min-h-18 items-center gap-3 rounded-xl border border-success-border bg-success-wash px-4 py-3'>
					<span
						className='text-lg text-success'
						aria-hidden='true'>
						✓
					</span>
					<div>
						<p className='font-sans text-sm font-semibold text-primary'>
							Table {tableId || 'T7 · Main'}
						</p>
						<p className='mt-1 font-sans text-xs text-text-subtle'>
							Detected from your table QR code
						</p>
					</div>
				</div>
			</section>
		);
	}

	if (orderType === 'Takeaway') {
		return (
			<section
				className='space-y-4'
				aria-labelledby='pickup-title'>
				<h2
					id='pickup-title'
					className='font-sans text-base font-semibold text-primary'>
					Pickup details
				</h2>
				<TextField
					label='Name for pickup'
					value={pickupName}
					onChange={(value) => {
						setPickupName(value);
						if (value.trim()) clearFieldError('pickupName');
					}}
					placeholder='Your name'
					error={fieldErrors.pickupName}
				/>
				<div className='rounded-[0.625rem] bg-surface-warm px-4 py-3 font-sans text-sm font-semibold text-primary'>
					Ready for pickup in ~15 min
				</div>
			</section>
		);
	}

	return (
		<section
			className='space-y-4'
			aria-labelledby='delivery-title'>
			<h2
				id='delivery-title'
				className='font-sans text-base font-semibold text-primary'>
				Delivery address
			</h2>
			<TextField
				label='Address'
				value={address}
				onChange={(value) => {
					setAddress(value);
					if (value.trim()) clearFieldError('address');
				}}
				placeholder='Street, area, city'
				error={fieldErrors.address}
			/>
			<TextField
				label='Phone number'
				type='tel'
				value={phone}
				onChange={(value) => {
					setPhone(value);
					if (value.trim()) clearFieldError('phone');
				}}
				placeholder='+234...'
				error={fieldErrors.phone}
			/>
			<div className='flex items-center gap-2 rounded-[0.625rem] border border-info-border bg-info-wash px-4 py-3'>
				<span
					className='text-sm text-info-strong'
					aria-hidden='true'>
					ⓘ
				</span>
				<div>
					<p className='font-sans text-sm font-semibold text-primary'>
						Arriving in ~18 min
					</p>
					<p className='mt-0.5 font-sans text-xs text-text-subtle'>
						Estimated — updates as your order progresses
					</p>
				</div>
			</div>
		</section>
	);
}

function PaymentMethodSelector({ value, onChange }) {
	const paymentMethods = [
		{ id: 'card', label: 'Card', description: 'Pay with debit/credit card' },
		{ id: 'transfer', label: 'Transfer', description: 'Bank transfer' },
	];

	return (
		<section
			className='mt-8'
			aria-labelledby='payment-title'>
			<h2
				id='payment-title'
				className='mb-3 font-sans text-base font-semibold text-primary'>
				Payment method
			</h2>
			<div
				className='grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2'
				role='group'
				aria-label='Payment method'>
				{paymentMethods.map((method) => (
					<button
						key={method.id}
						type='button'
						aria-pressed={value === method.id}
						onClick={() => onChange(method.id)}
						className={`min-h-18 rounded-xl border px-4 py-3 text-left transition-colors ${value === method.id ? 'border-2 border-ember bg-ember-soft' : 'border-line-muted bg-white hover:border-ember'}`}>
						<span
							className={`block font-sans text-sm font-semibold ${value === method.id ? 'text-ember' : 'text-primary'}`}>
							{method.label}
						</span>
						<span className='mt-1 block font-sans text-xs text-text-subtle'>
							{method.description}
						</span>
					</button>
				))}
			</div>
		</section>
	);
}

export default function FulfillmentFields({
	orderType,
	onOrderTypeChange,
	paymentMethod,
	onPaymentMethodChange,
	...fulfillmentProps
}) {
	return (
		<>
			<OrderTypeSelector
				value={orderType}
				onChange={onOrderTypeChange}
			/>
			<AnimatePresence
				mode='wait'
				initial={false}>
				<motion.div
					key={orderType}
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -4 }}
					transition={{ duration: 0.16 }}
					className='mt-8'>
					<FulfillmentDetails
						orderType={orderType}
						{...fulfillmentProps}
					/>
				</motion.div>
			</AnimatePresence>
			<PaymentMethodSelector
				value={paymentMethod}
				onChange={onPaymentMethodChange}
			/>
		</>
	);
}
