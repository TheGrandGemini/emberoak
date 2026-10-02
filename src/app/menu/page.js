'use client';

import DishCard from '@/components/ui/DishCard';
import useRestaurantStore from '@/store/restaurantStore';
import DishMenu from './components/DishMenu';

const categories = ['All', 'Rice & Mains', 'Swallow', 'Grills', 'Light Bites'];

export default function MenuPage() {
	const dishes = useRestaurantStore((state) => state.dishes);
	return (
		<main className='min-h-screen bg-background'>
			<div className='border-b border-border bg-surface px-4 pb-5 pt-8 sm:px-6 lg:px-8'>
				<div className='mx-auto flex w-full max-w-317 flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
					<div>
						<h1 className='text-h2 text-primary'>Menu</h1>
						<p className='mt-2 text-body-sm text-muted-text'>
							12 dishes · Dine-in, takeaway &amp; delivery
						</p>
					</div>
					<label className='group menu-search flex h-11 w-full max-w-sm items-center rounded-[0.625rem] border border-border bg-surface px-3 text-secondary transition-[border-color,box-shadow,transform] duration-200 hover:scale-[1.03] hover:border-ember hover:text-ember focus-within:-translate-y-0.5 focus-within:border-ember focus-within:text-ember focus-within:shadow-subtle'>
						<svg
							className='mr-2 h-5 w-5 shrink-0 text-secondary transition-colors duration-200 group-hover:text-ember group-focus-within:text-ember'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							aria-hidden='true'>
							<circle
								cx='11'
								cy='11'
								r='7'
							/>
							<path d='m20 20-4-4' />
						</svg>
						<span className='sr-only'>Search dishes</span>
						<input
							type='search'
							placeholder='Search dishes...'
							className='w-full bg-transparent text-sm outline-none placeholder:text-muted-text'
						/>
					</label>
				</div>
			</div>

			<nav
				className='border-b border-border bg-[#faf9f7] px-4 py-3 sm:px-6 lg:px-8'
				aria-label='Menu categories'>
				<div className='mx-auto flex w-full max-w-317 items-center gap-2 overflow-x-auto py-2'>
					{categories.map((category, index) => (
						<button
							type='button'
							key={category}
							className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-[border-color,background-color,color,transform] duration-200 hover:-translate-y-0.5 ${index === 0 ? 'border-ember bg-ember text-white' : 'border-border bg-surface text-secondary hover:border-ember hover:text-ember'}`}>
							{category}
						</button>
					))}
				</div>
			</nav>

			<DishMenu />
		</main>
	);
}
