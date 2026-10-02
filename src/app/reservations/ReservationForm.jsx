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
		<div>
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
				className={`h-11 w-full rounded-[0.625rem] border bg-white px-3.5 font-sans text-sm outline-none transition-colors placeholder:text-text-faint focus:border-ember ${error ? 'border-danger' : 'border-line-input'}`}
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
		<div className='mt-7'>
			<h2 className='mb-2.5 font-sans text-sm font-semibold text-primary'>
				Date
			</h2>
			<div
				className='flex gap-2 overflow-x-auto pb-2'
				role='group'
				aria-label='Reservation date'>
				{dates.map((date) => (
					<button
						key={date.value}
						type='button'
						aria-pressed={selectedDate === date.value}
						onClick={() => onSelect(date.value)}
						className={`flex h-14 min-w-14 flex-col items-center justify-center rounded-[0.625rem] border px-2 transition-colors ${selectedDate === date.value ? 'border-2 border-ember bg-ember-soft text-ember' : 'border-line-muted bg-white text-text-dark-soft hover:border-ember'}`}>
						<span className='font-sans text-[0.65rem]'>{date.weekday}</span>
						<span className='mt-0.5 font-sans text-sm font-semibold'>
							{date.day}
						</span>
					</button>
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
				className='flex flex-wrap gap-2'
				role='group'
				aria-label='Reservation time'>
				{reservationTimes.map((time) => (
					<button
						key={time}
						type='button'
						aria-pressed={value === time}
						onClick={() => onSelect(time)}
						className={`min-h-9 rounded-full border px-3.5 font-sans text-xs font-semibold transition-colors ${value === time ? 'border-2 border-ember bg-ember-soft text-ember' : 'border-line-muted bg-white text-text-dark-soft hover:border-ember'}`}>
						{time}
					</button>
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
				<button
					type='button'
					aria-label='Decrease party size'
					disabled={value <= 1}
					onClick={() => onChange((size) => Math.max(1, size - 1))}
					className='h-full w-10 border-r border-line-muted text-lg text-text-dark-soft disabled:opacity-40'>
					−
				</button>
				<span className='min-w-10 text-center font-sans text-sm font-semibold text-primary'>
					{value}
				</span>
				<button
					type='button'
					aria-label='Increase party size'
					onClick={() => onChange((size) => Math.min(12, size + 1))}
					className='h-full w-10 border-l border-line-muted text-lg text-text-dark-soft'>
					+
				</button>
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
		<div className='mt-6 space-y-4 sm:max-w-lg'>
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
					className='min-h-20 w-full resize-y rounded-[0.625rem] border border-line-input bg-white px-3.5 py-3 font-sans text-sm outline-none transition-colors placeholder:text-text-faint focus:border-ember'
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
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -6 }}
			transition={{ duration: 0.24 }}
			className='mx-auto grid w-full max-w-6xl gap-10 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.85fr)] lg:gap-12 lg:py-12'>
			<section>
				<h1 className='font-display text-3xl font-semibold text-primary sm:text-4xl'>
					Reserve a Table
				</h1>
				<p className='mt-2 font-sans text-sm text-text-subtle'>
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
				initial={{ opacity: 0, x: 10 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.24, delay: 0.08 }}
				className='lg:pt-1'>
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
						className='mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-[0.625rem] bg-ember px-4 font-sans text-sm font-semibold text-white transition-colors hover:bg-ember-hover disabled:opacity-60'>
						{isSubmitting ? (
							<span className='h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white' />
						) : null}
						Confirm Reservation
					</button>
				</div>
			</motion.aside>
		</motion.div>
	);
}
