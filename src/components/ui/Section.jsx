export default function Section({
	children,
	eyebrow,
	title,
	className = '',
	contentClassName = '',
	...props
}) {
	return (
		<section
			{...props}
			className={`section-enter px-5 py-20 sm:px-8 lg:px-12 ${className}`}>
			<div className={`mx-auto max-w-6xl ${contentClassName}`}>
				{(eyebrow || title) && (
					<header className='mb-12 text-center'>
						{eyebrow && <p className='text-label text-ember'>{eyebrow}</p>}
						{title && <h2 className='text-h2 mt-4 text-primary'>{title}</h2>}
					</header>
				)}
				{children}
			</div>
		</section>
	);
}
