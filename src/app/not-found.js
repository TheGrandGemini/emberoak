import Link from 'next/link';

export default function NotFound() {
	return (
		<>
			<main
				className='not-found-enter relative isolate flex min-h-[calc(100svh-5.5rem)] items-center justify-center overflow-hidden bg-cover bg-center px-5 py-20 text-center sm:px-8'
				style={{ backgroundImage: "url('/assets/00_interior.jpg')" }}>
				<div
					className='not-found-overlay pointer-events-none absolute inset-0 -z-10'
					aria-hidden='true'
				/>
				<div className='relative z-10 max-w-xl text-white'>
					<p className='text-label text-ember-highlight'>Ember &amp; Oak</p>
					<h1 className='text-display mt-5'>This page is empty.</h1>
					<p className='mx-auto mt-6 max-w-md text-body-lg text-white/85'>
						The page you are looking for has moved, or it may not be on
						today&apos;s menu.
					</p>
					<Link
						href='/'
						className='mt-8 inline-flex h-12 items-center justify-center rounded-[0.625rem] bg-ember px-7 font-sans text-base font-semibold text-white transition-transform hover:-translate-y-0.5'>
						Back to home
					</Link>
				</div>
			</main>
		</>
	);
}
