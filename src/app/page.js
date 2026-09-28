import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex min-h-screen items-center justify-center bg-background px-6'>
			<div className='max-w-xl space-y-4 text-center'>
				<p className='text-label text-secondary'>Restora</p>
				<h1 className='text-h1 text-primary'>Minimal design foundation</h1>
				<p className='text-body-lg text-secondary'>
					This project is in its design-system phase. Open the dedicated preview
					page to inspect the foundation.
				</p>
				<Link
					href='/design-system'
					className='radius-12 inline-flex items-center justify-center bg-ember px-4 py-2.5 text-sm font-medium text-white'>
					Open design system
				</Link>
			</div>
		</main>
	);
}
