export default function QuantityStepper({ value = 1, className = '' }) {
	return (
		<div
			className={`radius-12 inline-flex items-center gap-2 border border-border bg-surface p-1 ${className}`.trim()}
			aria-label={`Quantity: ${value}`}>
			<span className='radius-10 flex h-9 w-9 items-center justify-center text-lg text-primary'>
				−
			</span>
			<span className='min-w-9 text-center text-sm font-medium text-primary'>
				{value}
			</span>
			<span className='radius-10 flex h-9 w-9 items-center justify-center text-lg text-primary'>
				+
			</span>
		</div>
	);
}
