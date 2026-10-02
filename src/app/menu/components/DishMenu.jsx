import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import DishCard from '@/components/ui/DishCard';
import useRestaurantStore from '@/store/restaurantStore';

const DishMenu = ({ category, searchTerm = '', onSelect }) => {
	const dishes = useRestaurantStore((state) => state.dishes);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timeout = window.setTimeout(() => setIsLoading(false), 550);

		return () => window.clearTimeout(timeout);
	}, []);

	const visibleDishes =
		category === 'All'
			? dishes
			: dishes.filter((dish) => dish.category === category);

	const filteredDishes = visibleDishes.filter((dish) =>
		dish.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<section
			aria-busy={isLoading}
			className='px-4 py-6 sm:px-6 lg:px-8 lg:py-8'>
			<div className='mx-auto grid w-full max-w-317 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5'>
				{isLoading ? (
					Array.from({ length: 8 }, (_, index) => (
						<div
							key={`menu-skeleton-${index}`}
							className='overflow-hidden rounded-[0.875rem] border border-border bg-surface'
							aria-hidden='true'>
							<div className='aspect-[1.55] animate-pulse bg-skeleton' />
							<div className='space-y-3 px-4 py-4'>
								<div className='h-4 w-3/4 animate-pulse rounded bg-skeleton' />
								<div className='h-3 w-full animate-pulse rounded bg-skeleton-light' />
								<div className='h-3 w-1/3 animate-pulse rounded bg-skeleton' />
							</div>
						</div>
					))
				) : (
					<AnimatePresence mode='popLayout'>
						{filteredDishes.map((dish, index) => (
							<motion.div
								key={dish.name}
								layout
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -12 }}
								transition={{ duration: 0.2, delay: index * 0.04 }}>
								<DishCard
									{...dish}
									index={index}
									className='menu-dish-card'
									onSelect={
										dish.available === false ? undefined : () => onSelect(dish)
									}
								/>
							</motion.div>
						))}
					</AnimatePresence>
				)}
			</div>
		</section>
	);
};

export default DishMenu;
