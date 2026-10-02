function SummaryRow({ label, value }) {
	return (
		<div className='flex items-baseline justify-between gap-4 font-sans text-sm'>
			<dt className='text-text-subtle'>{label}</dt>
			<dd className='text-right font-semibold text-primary'>{value}</dd>
		</div>
	);
}

export default function ReservationSummary({
	date,
	time,
	partySize,
	name,
	reservationId,
}) {
	return (
		<section className='overflow-hidden rounded-xl border border-line-soft bg-white'>
			<header className='border-b border-line-soft px-5 py-4'>
				<h2 className='font-sans text-base font-semibold text-primary'>
					{reservationId ? `Reservation #${reservationId}` : 'Your Reservation'}
				</h2>
			</header>
			<dl className='space-y-3 px-5 py-4'>
				<SummaryRow
					label='Restaurant'
					value='Ember & Oak · Lagos'
				/>
				<SummaryRow
					label='Date'
					value={date}
				/>
				<SummaryRow
					label='Time'
					value={time}
				/>
				<SummaryRow
					label='Party size'
					value={`${partySize} ${partySize === 1 ? 'guest' : 'guests'}`}
				/>
				{name ? (
					<SummaryRow
						label='Name'
						value={name}
					/>
				) : null}
			</dl>
		</section>
	);
}
