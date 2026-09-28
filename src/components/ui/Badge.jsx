const variants = {
	default: 'border border-border bg-muted text-primary',
	success: 'border border-success/25 bg-success/10 text-success',
	warning: 'border border-warning/25 bg-warning/10 text-warning',
	danger: 'border border-danger/25 bg-danger/10 text-danger',
	info: 'border border-info/25 bg-info/10 text-info',
};

const baseClasses =
	'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] uppercase';

export default function Badge({
	children,
	variant = 'default',
	className = '',
}) {
	return (
		<span
			className={`${baseClasses} ${variants[variant] || variants.default} ${className}`.trim()}>
			{children}
		</span>
	);
}
