import { create } from 'zustand';
import dishes from '@/data/dishes';

const useRestaurantStore = create((set) => ({
	dishes: dishes,

	selectedDish: null,

	selectDish: (dish) => {
		set({
			selectedDish: dish,
		});
	},

	clearSelectedDish: () => {
		set({ selectedDish: null });
	},
}));

export default useRestaurantStore;
