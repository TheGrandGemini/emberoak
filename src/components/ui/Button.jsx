const variants = {
	primary:
		'bg-ember text-white hover:brightness-95 active:brightness-90 focus-visible:ring-2 focus-visible:ring-ember/40 shadow-subtle',
	secondary:
		'border border-border bg-muted text-primary hover:bg-border active:bg-strong focus-visible:ring-2 focus-visible:ring-oak/10',
	ghost:
		'bg-transparent text-primary hover:bg-muted active:bg-border focus-visible:ring-2 focus-visible:ring-ember/25',
	destructive:
		'bg-danger text-white hover:brightness-95 active:brightness-90 focus-visible:ring-2 focus-visible:ring-danger/40 shadow-subtle',
};

const sizes = {
	sm: 'h-9 px-3.5 text-sm',
	md: 'h-11 px-4 text-sm',
	lg: 'h-12 px-5 text-base',
};

const baseClasses =
	'radius-12 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50';

export default function Button({
	children,
	variant = 'primary',
	size = 'md',
	type = 'button',
	loading = false,
	disabled = false,
	className = '',
	...props
}) {
	const isDisabled = disabled || loading;

	return (
		<button
			type={type}
			disabled={isDisabled}
			className={`${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`.trim()}
			{...props}>
			{loading ? (
				<span className='inline-flex items-center gap-2'>
					<span
						className='h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent'
						aria-hidden='true'
					/>
					<span>{children}</span>
				</span>
			) : (
				children
			)}
		</button>
	);
}
