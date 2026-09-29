import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import DishCard from '@/components/ui/DishCard';
import Section from '@/components/ui/Section';
import ServiceCard from '@/components/ui/ServiceCard';

const dishes = [
	{
		name: 'Suya-Spiced Grilled Chicken',
		description: 'Charcoal-grilled, yaji spice, pickled onion',
		price: '₦7,300',
		image: '/assets/04_grilled_chicken.jpg',
		alt: 'Suya-spiced grilled chicken served with herbs',
	},
	{
		name: 'Jollof Rice + Grilled Chicken',
		description: 'Smoked party jollof, char-grilled thigh',
		price: '₦6,800',
		image: '/assets/03_jollof_rice.jpg',
		alt: 'A bowl of richly colored jollof rice',
	},
	{
		name: 'Peppered Goat Meat + Plantain',
		description: 'Slow-braised, scotch bonnet, fried plantain',
		price: '₦8,200',
		image: '/assets/05_peppered_goatmeat.jpg',
		alt: 'A colorful plate of West African food',
	},
];

const serviceOptions = [
	{
		title: 'Dine-in',
		copy: 'Walk in or scan the table QR — order straight to the kitchen from your seat.',
	},
	{
		title: 'Takeaway',
		copy: 'Order ahead and collect at the counter, no waiting on a table.',
	},
	{
		title: 'Delivery',
		copy: 'Delivered to your door across Lagos, with a live status as it comes together.',
	},
];

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<Section
					eyebrow="Today's picks"
					title='What the grill is doing best right now'
					className='py-20 sm:py-24 lg:py-28'>
					<div className='-mx-5 flex snap-x snap-mandatory touch-pan-x gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:p-0'>
						{dishes.map((dish, index) => (
							<DishCard
								key={dish.name}
								{...dish}
								index={index}
								className='w-[86%] shrink-0 snap-start sm:w-[48%] lg:w-auto lg:shrink'
							/>
						))}
					</div>
				</Section>
				<Section
					title="However you'd like it"
					className='bg-background py-20 sm:py-24 lg:py-28'>
					<div className='grid grid-cols-1 gap-5 sm:grid-cols-3'>
						{serviceOptions.map((option, index) => (
							<ServiceCard
								key={option.title}
								{...option}
								index={index}
							/>
						))}
					</div>
				</Section>
			</main>
		</>
	);
}
