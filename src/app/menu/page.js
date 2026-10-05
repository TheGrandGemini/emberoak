import { Suspense } from 'react';
import MenuClient from './MenuClient';

export default function MenuPage() {
	return (
		<Suspense
			fallback={
				<main className='min-h-screen bg-background' aria-label='Loading menu' />
			}>
			<MenuClient />
		</Suspense>
	);
}
