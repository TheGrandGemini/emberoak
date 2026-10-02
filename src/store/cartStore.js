import { create } from 'zustand';

const getConfigurations = (item) =>
	item.configurations || [
		{
			heat: item.heat,
			addOns: item.addOns || [],
			specialInstructions: item.specialInstructions || '',
			quantity: item.quantity,
			price: Number(item.price || 0),
			unitPrice:
				Number(item.total ?? item.price * item.quantity) / item.quantity,
			total: Number(item.total ?? item.price * item.quantity),
		},
	];

const hasSameConfiguration = (first, second) => {
	const firstOptions = (first.addOns || []).map((option) => option.id).sort();
	const secondOptions = (second.addOns || []).map((option) => option.id).sort();

	return (
		first.heat === second.heat &&
		(first.specialInstructions || '') === (second.specialInstructions || '') &&
		firstOptions.length === secondOptions.length &&
		firstOptions.every((id, index) => id === secondOptions[index])
	);
};

const makeConfiguration = (item) => ({
	heat: item.heat,
	addOns: item.addOns || [],
	specialInstructions: item.specialInstructions || '',
	quantity: item.quantity,
	price: Number(item.price || 0),
	unitPrice: Number(item.total ?? item.price * item.quantity) / item.quantity,
	total: Number(item.total ?? item.price * item.quantity),
});

const summarizeConfigurations = (configurations) => ({
	configurations,
	quantity: configurations.reduce(
		(sum, configuration) => sum + configuration.quantity,
		0,
	),
	total: configurations.reduce(
		(sum, configuration) => sum + configuration.total,
		0,
	),
});

const changeConfigurationQuantity = (configurations, quantity) => {
	const currentQuantity = configurations.reduce(
		(sum, configuration) => sum + configuration.quantity,
		0,
	);

	if (quantity > currentQuantity) {
		const addedQuantity = quantity - currentQuantity;
		return configurations.map((configuration, index) =>
			index === configurations.length - 1
				? {
						...configuration,
						quantity: configuration.quantity + addedQuantity,
						total:
							configuration.unitPrice *
							(configuration.quantity + addedQuantity),
					}
				: configuration,
		);
	}

	let remainingQuantity = quantity;
	return configurations
		.map((configuration) => {
			const keptQuantity = Math.min(configuration.quantity, remainingQuantity);
			remainingQuantity -= keptQuantity;
			return {
				...configuration,
				quantity: keptQuantity,
				total: configuration.unitPrice * keptQuantity,
			};
		})
		.filter((configuration) => configuration.quantity > 0);
};

const useCartStore = create((set) => ({
	cartItems: [],
	isCartOpen: false,
	cartOpenVersion: 0,

	openCart: () =>
		set((state) => ({
			isCartOpen: true,
			cartOpenVersion: state.cartOpenVersion + 1,
		})),
	closeCart: () => set({ isCartOpen: false }),
	clearCart: () => set({ cartItems: [] }),

	addToCart: (item) => {
		set((state) => {
			const existingItem = state.cartItems.find(
				(cartItem) => cartItem.dishId === item.dishId,
			);
			const addedConfiguration = makeConfiguration(item);

			if (!existingItem) {
				return {
					cartItems: [
						...state.cartItems,
						{ ...item, configurations: [addedConfiguration] },
					],
				};
			}

			const configurations = getConfigurations(existingItem);
			const matchingConfiguration = configurations.find((configuration) =>
				hasSameConfiguration(configuration, addedConfiguration),
			);
			const updatedConfigurations = matchingConfiguration
				? configurations.map((configuration) =>
						configuration === matchingConfiguration
							? {
									...configuration,
									quantity: configuration.quantity + item.quantity,
									total: configuration.total + addedConfiguration.total,
								}
							: configuration,
					)
				: [...configurations, addedConfiguration];

			return {
				cartItems: state.cartItems.map((cartItem) =>
					cartItem.id === existingItem.id
						? { ...cartItem, ...summarizeConfigurations(updatedConfigurations) }
						: cartItem,
				),
			};
		});
	},

	removeCartItem: (itemId) =>
		set((state) => ({
			cartItems: state.cartItems.filter((item) => item.id !== itemId),
		})),

	updateCartItemQuantity: (itemId, quantity) =>
		set((state) => ({
			cartItems: state.cartItems.map((item) => {
				if (item.id !== itemId) return item;

				const configurations = changeConfigurationQuantity(
					getConfigurations(item),
					quantity,
				);
				return { ...item, ...summarizeConfigurations(configurations) };
			}),
		})),
}));

export default useCartStore;
