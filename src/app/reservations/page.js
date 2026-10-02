'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import ReservationSummary from './ReservationSummary';
import { downloadReservationCalendarEvent } from './calendarEvent';
import ReservationForm from './ReservationForm';

const times = [
	'6:00 PM',
	'6:30 PM',
	'7:00 PM',
	'7:30 PM',
	'8:00 PM',
	'8:30 PM',
];
const alternativeTimes = ['6:30 PM', '8:30 PM', '9:00 PM'];

function getNextDates() {
	return Array.from({ length: 7 }, (_, index) => {
		const date = new Date();
		date.setHours(12, 0, 0, 0);
		date.setDate(date.getDate() + index);
		return {
			value: date.toISOString().slice(0, 10),
			weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
			day: date.toLocaleDateString('en-US', { day: '2-digit' }),
			full: date.toLocaleDateString('en-US', {
				weekday: 'short',
				month: 'short',
				day: 'numeric',
			}),
		};
	});
}

function Confirmation({
	date,
	time,
	partySize,
	name,
	reservationId,
	onCalendar,
}) {
	return (
		<motion.section
			key='confirmation'
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.28, ease: 'easeOut' }}
			className='mx-auto w-full max-w-md px-5 py-14 text-center sm:py-20'>
			<div
				className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-success-wash text-2xl font-semibold text-success-strong'
				aria-hidden='true'>
				✓
			</div>
			<h1 className='font-display text-3xl font-semibold text-primary'>
				Reservation Confirmed
			</h1>
			<p className='mt-3 font-sans text-sm leading-6 text-text-soft'>
				We’ll see you soon{name ? `, ${name}` : ''} — a confirmation has been
				sent to your phone.
			</p>
			<div className='mt-6 text-left'>
				<ReservationSummary
					date={date}
					time={time}
					partySize={partySize}
					name={name}
					reservationId={reservationId}
				/>
			</div>
			<div className='mt-5 flex flex-col justify-center gap-3 sm:flex-row'>
				<button
					type='button'
					onClick={onCalendar}
					className='inline-flex min-h-11 items-center justify-center rounded-[0.625rem] bg-ember px-5 font-sans text-sm font-semibold text-white transition-colors hover:bg-ember-hover'>
					Add to Calendar
				</button>
				<Link
					href='/'
					className='inline-flex min-h-11 items-center justify-center rounded-[0.625rem] border border-line-muted bg-white px-5 font-sans text-sm font-semibold text-primary transition-colors hover:bg-surface-warm'>
					Back to Menu
				</Link>
			</div>
		</motion.section>
	);
}

function NoAvailability({ date, partySize, time, onChooseTime }) {
	return (
		<motion.section
			key='unavailable'
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -6 }}
			transition={{ duration: 0.22 }}
			className='mx-auto flex min-h-100 w-full max-w-3xl flex-col items-center justify-center rounded-2xl border border-line-soft bg-white px-6 py-12 text-center'>
			<svg
				className='mb-5 h-8 w-8 text-text-subtle'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='1.7'
				aria-hidden='true'>
				<circle
					cx='12'
					cy='12'
					r='9'
				/>
				<path d='m5.6 5.6 12.8 12.8' />
			</svg>
			<h1 className='font-sans text-xl font-semibold text-primary'>
				No tables for {partySize} guests at {time} on {date}
			</h1>
			<p className='mt-3 font-sans text-sm text-text-subtle'>
				Try a different time, date, or a smaller party size.
			</p>
			<div className='mt-7 flex flex-wrap justify-center gap-2.5'>
				{alternativeTimes.map((alternative) => (
					<button
						key={alternative}
						type='button'
						onClick={() => onChooseTime(alternative)}
						className='min-h-11 rounded-full border border-ember bg-white px-5 font-sans text-sm font-semibold text-ember transition-colors hover:bg-ember-soft'>
						{alternative}
					</button>
				))}
			</div>
		</motion.section>
	);
}

export default function ReservationsPage() {
	const dates = useMemo(() => getNextDates(), []);
	const [selectedDate, setSelectedDate] = useState(dates[0].value);
	const [selectedTime, setSelectedTime] = useState('7:30 PM');
	const [partySize, setPartySize] = useState(4);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [notes, setNotes] = useState('');
	const [errors, setErrors] = useState({});
	const [confirmed, setConfirmed] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [reservationId, setReservationId] = useState('');
	const selectedDateLabel =
		dates.find((date) => date.value === selectedDate)?.full || dates[0].full;
	const isUnavailable = partySize >= 8 && selectedTime === '7:30 PM';

	const updateField = (field, value, setter) => {
		setter(value);
		if (value.trim()) setErrors((current) => ({ ...current, [field]: '' }));
	};

	const confirmReservation = () => {
		const nextErrors = {};
		if (!name.trim()) nextErrors.name = 'Enter your full name.';
		if (!phone.trim())
			nextErrors.phone = 'Enter a phone number for confirmation.';
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length || isUnavailable) return;

		setIsSubmitting(true);
		window.setTimeout(() => {
			setReservationId(`RES-${Math.floor(1000 + Math.random() * 9000)}`);
			setIsSubmitting(false);
			setConfirmed(true);
		}, 650);
	};

	const downloadCalendarEvent = () => {
		downloadReservationCalendarEvent({
			reservationId,
			date: selectedDate,
			time: selectedTime,
			partySize,
			name,
		});
	};

	return (
		<main className='min-h-[calc(100svh-5.5rem)] bg-page-soft'>
			<AnimatePresence
				mode='wait'
				initial={false}>
				{confirmed ? (
					<Confirmation
						key='reservation-confirmation'
						date={selectedDateLabel}
						time={selectedTime}
						partySize={partySize}
						name={name}
						reservationId={reservationId}
						onCalendar={downloadCalendarEvent}
					/>
				) : isUnavailable ? (
					<div className='px-5 py-12 sm:px-8 sm:py-16'>
						<NoAvailability
							date={selectedDateLabel}
							partySize={partySize}
							time={selectedTime}
							onChooseTime={setSelectedTime}
						/>
					</div>
				) : (
					<ReservationForm
						key='reservation-form'
						dates={dates}
						selectedDate={selectedDate}
						onDateChange={setSelectedDate}
						selectedTime={selectedTime}
						onTimeChange={setSelectedTime}
						partySize={partySize}
						onPartySizeChange={setPartySize}
						name={name}
						setName={setName}
						phone={phone}
						setPhone={setPhone}
						notes={notes}
						setNotes={setNotes}
						errors={errors}
						updateField={updateField}
						dateLabel={selectedDateLabel}
						isSubmitting={isSubmitting}
						onConfirm={confirmReservation}
					/>
				)}
			</AnimatePresence>
		</main>
	);
}
