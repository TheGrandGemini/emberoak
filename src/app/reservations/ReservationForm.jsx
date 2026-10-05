'use client';

import { motion } from 'framer-motion';

import ReservationSummary from './ReservationSummary';

const reservationTimes = [
	'6:00 PM',
	'6:30 PM',
	'7:00 PM',
	'7:30 PM',
	'8:00 PM',
	'8:30 PM',
];

function ReservationField({
	label,
	value,
	onChange,
	type = 'text',
	error,
	placeholder,
}) {
	const id = label.toLowerCase().replaceAll(' ', '-');

	return (
		<div className='min-w-0'>
			<label
				htmlFor={id}
				className='mb-2 block font-sans text-xs font-semibold text-primary'>
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
				className={`h-12 w-full min-w-0 rounded-[0.625rem] border bg-white px-3.5 font-sans text-base outline-none transition-colors placeholder:text-text-faint focus:border-ember sm:text-sm ${error ? 'border-danger' : 'border-line-input'}`}
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

function DateSelector({ dates, selectedDate, onSelect }) {
	return (
		<div className='mt-7 min-w-0'>
			<h2 className='mb-2.5 font-sans text-sm font-semibold text-primary'>
				Date
			</h2>
			<div
				className='flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
				role='group'
				aria-label='Reservation date'>
				{dates.map((date) => (
					<motion.button
						key={date.value}
						type='button'
						aria-pressed={selectedDate === date.value}
						onClick={() => onSelect(date.value)}
						whileTap={{ scale: 0.96 }}
						className={`flex h-14 min-w-14 shrink-0 snap-start touch-manipulation flex-col items-center justify-center rounded-[0.625rem] border px-2 transition-colors ${selectedDate === date.value ? 'border-2 border-ember bg-ember-soft text-ember' : 'border-line-muted bg-white text-text-dark-soft hover:border-ember'}`}>
						<span className='font-sans text-[0.65rem]'>{date.weekday}</span>
						<span className='mt-0.5 font-sans text-sm font-semibold'>
							{date.day}
						</span>
					</motion.button>
				))}
			</div>
		</div>
	);
}

function TimeSelector({ value, onSelect }) {
	return (
		<div className='mt-5'>
			<h2 className='mb-2.5 font-sans text-sm font-semibold text-primary'>
				Time
			</h2>
			<div
				className='grid grid-cols-2 gap-2 sm:flex sm:flex-wrap'
				role='group'
				aria-label='Reservation time'>
				{reservationTimes.map((time) => (
					<motion.button
						key={time}
						type='button'
						aria-pressed={value === time}
						onClick={() => onSelect(time)}
						whileTap={{ scale: 0.97 }}
						className={`min-h-11 touch-manipulation rounded-full border px-3 font-sans text-xs font-semibold transition-colors sm:px-3.5 ${value === time ? 'border-2 border-ember bg-ember-soft text-ember' : 'border-line-muted bg-white text-text-dark-soft hover:border-ember'}`}>
						{time}
					</motion.button>
				))}
			</div>
		</div>
	);
}

function PartySizeSelector({ value, onChange }) {
	return (
		<div className='mt-6 flex items-center justify-between sm:max-w-sm'>
			<h2 className='font-sans text-sm font-semibold text-primary'>
				Party size
			</h2>
			<div className='flex h-10 items-center rounded-[0.625rem] border border-line-muted bg-white'>
				<motion.button
					type='button'
					aria-label='Decrease party size'
					disabled={value <= 1}
					onClick={() => onChange((size) => Math.max(1, size - 1))}
					whileTap={{ scale: 0.92 }}
					className='h-full w-11 touch-manipulation border-r border-line-muted text-lg text-text-dark-soft disabled:opacity-40'>
					−
				</motion.button>
				<span className='min-w-10 text-center font-sans text-sm font-semibold text-primary'>
					{value}
				</span>
				<motion.button
					type='button'
					aria-label='Increase party size'
					onClick={() => onChange((size) => Math.min(12, size + 1))}
					whileTap={{ scale: 0.92 }}
					className='h-full w-11 touch-manipulation border-l border-line-muted text-lg text-text-dark-soft'>
					+
				</motion.button>
			</div>
		</div>
	);
}

function GuestDetails({
	name,
	setName,
	phone,
	setPhone,
	notes,
	setNotes,
	errors,
	updateField,
}) {
	return (
		<div className='mt-6 min-w-0 space-y-4 sm:max-w-lg'>
			<h2 className='font-sans text-sm font-semibold text-primary'>
				Your details
			</h2>
			<ReservationField
				label='Full name'
				value={name}
				onChange={(value) => updateField('name', value, setName)}
				placeholder='Your name'
				error={errors.name}
			/>
			<ReservationField
				label='Phone number'
				value={phone}
				onChange={(value) => updateField('phone', value, setPhone)}
				placeholder='+234...'
				type='tel'
				error={errors.phone}
			/>
			<div>
				<label
					htmlFor='reservation-notes'
					className='mb-2 block font-sans text-xs font-semibold text-primary'>
					Notes (optional)
				</label>
				<textarea
					id='reservation-notes'
					value={notes}
					onChange={(event) => setNotes(event.target.value)}
					placeholder='E.g. window seat, birthday'
					className='min-h-24 w-full min-w-0 resize-y rounded-[0.625rem] border border-line-input bg-white px-3.5 py-3 font-sans text-base outline-none transition-colors placeholder:text-text-faint focus:border-ember sm:text-sm'
				/>
			</div>
		</div>
	);
}

export default function ReservationForm({
	dates,
	selectedDate,
	onDateChange,
	selectedTime,
	onTimeChange,
	partySize,
	onPartySizeChange,
	name,
	setName,
	phone,
	setPhone,
	notes,
	setNotes,
	errors,
	updateField,
	dateLabel,
	reservationId,
	isSubmitting,
	onConfirm,
}) {
	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -6 }}
				transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
				className='mx-auto grid w-full max-w-6xl min-w-0 grid-cols-1 gap-8 px-5 pt-8 pb-28 sm:px-8 sm:pt-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.85fr)] lg:gap-12 lg:py-12'>
				<section className='min-w-0'>
					<h1 className='font-display text-3xl font-semibold text-primary sm:text-4xl'>
						Reserve a Table
					</h1>
					<p className='mt-2 max-w-prose font-sans text-sm leading-6 text-text-subtle'>
						Join us at Ember &amp; Oak — Lagos. Open 11 AM – 11 PM, daily.
					</p>
					<DateSelector
						dates={dates}
						selectedDate={selectedDate}
						onSelect={onDateChange}
					/>
					<TimeSelector
						value={selectedTime}
						onSelect={onTimeChange}
					/>
					<PartySizeSelector
						value={partySize}
						onChange={onPartySizeChange}
					/>
					<GuestDetails
						name={name}
						setName={setName}
						phone={phone}
						setPhone={setPhone}
						notes={notes}
						setNotes={setNotes}
						errors={errors}
						updateField={updateField}
					/>
				</section>

				<motion.aside
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
					className='min-w-0 lg:pt-1'>
					<div className='lg:sticky lg:top-8'>
						<ReservationSummary
							date={dateLabel}
							time={selectedTime}
							partySize={partySize}
							name={name.trim()}
							reservationId={reservationId}
						/>
						{errors.form ? (
							<p
								role='alert'
								className='mt-3 rounded-lg bg-danger-wash px-3 py-2.5 font-sans text-xs text-danger-strong'>
								{errors.form}
							</p>
						) : null}
						<button
							type='button'
							onClick={onConfirm}
							disabled={isSubmitting}
							className='mt-4 hidden min-h-12 w-full items-center justify-center gap-2 rounded-[0.625rem] bg-ember px-4 font-sans text-sm font-semibold text-white transition-colors hover:bg-ember-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/40 disabled:opacity-60 lg:flex'>
							{isSubmitting ? (
								<span className='h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white' />
							) : null}
							Confirm Reservation
						</button>
					</div>
				</motion.aside>
			</motion.div>
			<div className='fixed inset-x-0 bottom-0 z-30 border-t border-line-soft bg-page-soft/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden'>
				<button
					type='button'
					onClick={onConfirm}
					disabled={isSubmitting}
					className='flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-[0.625rem] bg-ember px-4 font-sans text-sm font-semibold text-white transition-colors hover:bg-ember-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/40 disabled:opacity-60'>
					{isSubmitting ? (
						<span className='h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white' />
					) : null}
					Confirm Reservation
				</button>
			</div>
		</>
	);
}
