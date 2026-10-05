import { Suspense } from 'react';
import CheckoutClient from './CheckoutClient';

export default function CheckoutPage() {
	return (
		<Suspense
			fallback={
				<main className='flex min-h-[calc(100svh-5.5rem)] items-center justify-center bg-page-soft px-5'>
					<p className='font-sans text-sm text-text-subtle'>Loading checkout…</p>
				</main>
			}>
			<CheckoutClient />
		</Suspense>
	);
}
