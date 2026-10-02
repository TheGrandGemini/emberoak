export function reconcileCartItem(item, dishes) {
	const dish = dishes.find((menuItem) => menuItem.id === item.dishId);
	const configurations = item.configurations || [item];
	const checkedConfigurations = configurations.map((configuration) => {
		const selectedAddOns = configuration.addOns || [];
		const currentAddOns = selectedAddOns.map((selected) =>
			dish?.addOns?.find((option) => option.name === selected.name),
		);
		const hasUnavailableAddOn = currentAddOns.some(
			(option) => !option || option.available === false,
		);
		const isUnavailable =
			!dish || dish.available === false || hasUnavailableAddOn;
		const currentUnitPrice =
			Number(dish?.price ?? configuration.price ?? item.price ?? 0) +
			currentAddOns.reduce(
				(sum, option, index) =>
					sum + Number(option?.price ?? selectedAddOns[index]?.price ?? 0),
				0,
			);
		const previousTotal = Number(
			configuration.total ??
				item.total ??
				Number(item.price ?? 0) * item.quantity,
		);
		const previousUnitPrice = Number(
			configuration.unitPrice ??
				(previousTotal / configuration.quantity ||
					configuration.price ||
					item.price ||
					0),
		);

		return {
			...configuration,
			isUnavailable,
			priceChanged:
				Boolean(dish) &&
				!isUnavailable &&
				(Number(dish.price) !== Number(configuration.price ?? item.price) ||
					currentAddOns.some(
						(option, index) =>
							option &&
							Number(option.price) !== Number(selectedAddOns[index].price),
					)),
			currentTotal: isUnavailable
				? Number(
						configuration.total ?? previousUnitPrice * configuration.quantity,
					)
				: currentUnitPrice * configuration.quantity,
		};
	});
	const isUnavailable = checkedConfigurations.some(
		(configuration) => configuration.isUnavailable,
	);
	const priceChanged = checkedConfigurations.some(
		(configuration) => configuration.priceChanged,
	);

	return {
		...item,
		dish,
		configurations: checkedConfigurations,
		isUnavailable,
		priceChanged,
		currentTotal: checkedConfigurations.reduce(
			(sum, configuration) => sum + configuration.currentTotal,
			0,
		),
	};
}

export function getCartWarnings(items) {
	const unavailableItems = items.filter((item) => item.isUnavailable);
	const hasPriceChanges = items.some((item) => item.priceChanged);
	const unavailableMessage =
		unavailableItems.length === 0
			? null
			: unavailableItems.length === 1
				? `${unavailableItems[0].name} is sold out today — remove it to continue.`
				: 'Some items are sold out today — remove them to continue.';

	return { unavailableItems, hasPriceChanges, unavailableMessage };
}

export function getCartTotals(items) {
	const subtotal = items.reduce((sum, item) => sum + item.currentTotal, 0);
	const serviceCharge = Math.round(subtotal * 0.1);

	return { subtotal, serviceCharge, total: subtotal + serviceCharge };
}
