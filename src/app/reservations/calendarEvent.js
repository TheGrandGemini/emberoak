function toCalendarTimestamp(date) {
	return date
		.toISOString()
		.replaceAll('-', '')
		.replaceAll(':', '')
		.split('.')[0];
}

export function downloadReservationCalendarEvent({
	reservationId,
	date,
	time,
	partySize,
	name,
}) {
	const timeValue = time === '7:30 PM' ? '19:30' : '19:00';
	const startDate = new Date(`${date}T${timeValue}:00`);
	const endDate = new Date(startDate.getTime() + 90 * 60 * 1000);
	const event = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'BEGIN:VEVENT',
		`UID:${reservationId}@emberandoak.local`,
		`DTSTAMP:${toCalendarTimestamp(new Date())}Z`,
		`DTSTART:${toCalendarTimestamp(startDate)}Z`,
		`DTEND:${toCalendarTimestamp(endDate)}Z`,
		'SUMMARY:Reservation at Ember & Oak',
		`DESCRIPTION:${partySize} guests${name ? ` - ${name}` : ''}`,
		'LOCATION:Ember & Oak, Lagos',
		'END:VEVENT',
		'END:VCALENDAR',
	].join('\r\n');
	const url = URL.createObjectURL(new Blob([event], { type: 'text/calendar' }));
	const link = document.createElement('a');
	link.href = url;
	link.download = 'ember-and-oak-reservation.ics';
	link.click();
	URL.revokeObjectURL(url);
}
