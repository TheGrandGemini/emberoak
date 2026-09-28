const sizes = {
	sm: 'h-8 w-8 text-sm',
	md: 'h-10 w-10 text-base',
	lg: 'h-12 w-12 text-lg',
};

const baseClasses =
	'radius-12 inline-flex items-center justify-center border border-border bg-surface text-primary';

export default function IconButton({
	children,
	label,
	size = 'md',
	className = '',
}) {
	return (
		<button
			type='button'
			aria-label={label}
			className={`${baseClasses} ${sizes[size] || sizes.md} ${className}`.trim()}>
			{children}
		</button>
	);
}
