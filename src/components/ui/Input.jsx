const variants = {
	default: 'border-border bg-surface text-primary',
	error: 'border-danger bg-surface text-primary',
	disabled: 'border-border bg-muted text-muted',
};

const baseClasses =
	'radius-12 w-full border px-3.5 py-2.5 text-body placeholder:text-muted';

export default function Input({
	className = '',
	error = false,
	disabled = false,
	placeholder = '',
	value,
	...props
}) {
	const variant = disabled ? 'disabled' : error ? 'error' : 'default';

	return (
		<input
			{...props}
			type='text'
			placeholder={placeholder}
			value={value}
			disabled={disabled}
			aria-invalid={error || undefined}
			className={`${baseClasses} ${variants[variant]} ${className}`.trim()}
		/>
	);
}
