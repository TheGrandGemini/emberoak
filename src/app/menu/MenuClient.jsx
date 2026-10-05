'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import useCartStore from '@/store/cartStore';
import DishMenu from './components/DishMenu';
import ItemDetailsModal from './components/ItemDetailsModal';
import MenuControls from './components/MenuControls';

const categories = ['All', 'Rice & Mains', 'Swallow', 'Grills', 'Light Bites'];

export default function MenuClient() {
	const searchParams = useSearchParams();
	const openCart = useCartStore((state) => state.openCart);
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedDish, setSelectedDish] = useState(null);

	useEffect(() => {
		if (searchParams.get('cart') !== '1') return;

		openCart();
		window.history.replaceState(null, '', '/menu');
	}, [searchParams, openCart]);

	return (
		<motion.main
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35, ease: 'easeOut' }}
			className='min-h-screen bg-background'>
			<MenuControls
				categories={categories}
				selectedCategory={selectedCategory}
				onCategoryChange={setSelectedCategory}
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
			/>
			<DishMenu
				category={selectedCategory}
				searchTerm={searchTerm}
				onSelect={setSelectedDish}
			/>
			{selectedDish ? (
				<ItemDetailsModal
					key={selectedDish.id}
					dish={selectedDish}
					onClose={() => setSelectedDish(null)}
				/>
			) : null}
		</motion.main>
	);
}
