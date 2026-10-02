import DishCard from '@/components/ui/DishCard';
import useRestaurantStore from '@/store/restaurantStore';

const DishMenu = () => {
	const dishes = useRestaurantStore((state) => state.dishes);
	return (
		<section className='px-4 py-6 sm:px-6 lg:px-8 lg:py-8'>
			<div className='mx-auto grid w-full max-w-317 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5'>
				{dishes.map((dish, index) => (
					<DishCard
						key={dish.name}
						{...dish}
						index={index}
						className='menu-dish-card'
					/>
				))}
			</div>
		</section>
	);
};

export default DishMenu;
