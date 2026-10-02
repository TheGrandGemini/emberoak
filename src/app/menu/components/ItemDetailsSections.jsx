import { motion } from 'framer-motion';

const heatOptions = ['Mild', 'Medium', 'Hot'];

export function DetailSkeleton() {
	return (
		<div className='animate-pulse space-y-5 py-1' aria-hidden='true'>
			<div className='flex items-center justify-between gap-4'>
				<div className='h-5 w-3/5 rounded bg-skeleton' />
				<div className='h-5 w-16 rounded bg-skeleton' />
			</div>
			<div className='h-3 w-4/5 rounded bg-skeleton-light' />
			<div className='space-y-3 pt-2'>
				<div className='h-4 w-28 rounded bg-skeleton' />
				<div className='h-4 w-2/3 rounded bg-skeleton-light' />
				<div className='h-4 w-1/2 rounded bg-skeleton-light' />
			</div>
			<div className='h-24 rounded-[0.625rem] bg-skeleton-light' />
			<div className='h-20 rounded-[0.625rem] bg-skeleton-light' />
		</div>
	);
}

export function DishSummary({ dish }) {
	return (
		<>
			<div className='flex items-start justify-between gap-3'>
				<h3 className='font-mono text-[1.05rem] font-semibold leading-tight text-primary'>
					{dish?.name}
				</h3>
				<p className='font-mono text-[0.95rem] font-semibold text-primary'>
					₦{Number(dish?.price ?? 0).toLocaleString()}
				</p>
			</div>
			<p className='font-mono text-[0.78rem] leading-normal text-text-soft'>
				{dish?.description}
			</p>
		</>
	);
}

export function UnavailableDetails({ dish }) {
	return (
		<div className='space-y-4 py-3'>
			<span className='inline-flex items-center rounded-full border border-danger-soft bg-danger-soft px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ember'>
				Sold out today
			</span>
			<DishSummary dish={dish} />
			<p className='font-mono text-[0.8rem] leading-normal text-secondary'>
				This item is sold out today. Check back tomorrow, or browse other dishes
				on the menu.
			</p>
			<div className='rounded-[0.625rem] border border-line-muted bg-surface-warm px-4 py-3 text-center font-mono text-[0.82rem] font-medium uppercase tracking-widest text-secondary'>
				Currently Unavailable
			</div>
		</div>
	);
}

export function HeatSelector({ selectedHeat, onSelect }) {
	return (
		<div>
			<p className='mb-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ember'>
				Heat <span>* Required · Choose 1</span>
			</p>
			<div className='space-y-2.5'>
				{heatOptions.map((heat) => (
					<label key={heat} className='flex cursor-pointer items-center gap-3 text-[0.95rem] text-secondary'>
						<input type='radio' name='heat' checked={selectedHeat === heat} onChange={() => onSelect(heat)} className='h-4 w-4 accent-ember' />
						<span>{heat}</span>
					</label>
				))}
			</div>
			{!selectedHeat ? (
				<div className='mt-3 flex items-center gap-2 rounded-md border border-danger-soft bg-danger-soft px-2.5 py-2 text-[0.75rem] text-ember'>
					<span className='text-base leading-none'>⚠</span>
					<span>Please select a heat level to continue.</span>
				</div>
			) : null}
		</div>
	);
}

export function AddOnSelector({ options, selected, onToggle }) {
	return (
		<div>
			<p className='mb-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-secondary'>
				Add-ons <span className='text-text-soft'>Optional</span>
			</p>
			<div className='space-y-2.5'>
				{options.map((option) => (
					<label key={option.id} className='flex cursor-pointer items-center justify-between gap-3 text-[0.95rem] text-secondary'>
						<span className='flex items-center gap-3'>
							<input type='checkbox' checked={selected.includes(option.name)} onChange={() => onToggle(option.name)} className='h-4 w-4 accent-ember' />
							<span>{option.name}</span>
						</span>
						<span className='font-mono text-[0.8rem] text-secondary'>+₦{option.price.toLocaleString()}</span>
					</label>
				))}
			</div>
		</div>
	);
}

export function SpecialInstructions({ value, onChange }) {
	return (
		<div>
			<label className='mb-2 block font-mono text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-secondary'>Special instructions</label>
			<textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder='E.g. no onions' className='min-h-21 w-full resize-none rounded-[0.625rem] border border-strong bg-white px-3 py-2 font-mono text-[0.85rem] text-oak outline-none transition-colors placeholder:text-text-faint focus:border-ember' />
		</div>
	);
}

export function QuantityControl({ quantity, onChange }) {
	return (
		<div className='mb-4 flex items-center justify-between'>
			<p className='font-mono text-[0.95rem] font-medium text-primary'>Quantity</p>
			<div className='flex items-center rounded-xl border border-strong bg-white'>
				<button type='button' aria-label='Decrease quantity' onClick={() => onChange((value) => Math.max(1, value - 1))} className='flex h-11 w-12 items-center justify-center border-r border-line-soft text-xl text-primary transition-colors hover:bg-surface-warm'>−</button>
+				<span className='min-w-11 text-center font-mono text-base font-semibold text-primary'>{quantity}</span>
+				<button type='button' aria-label='Increase quantity' onClick={() => onChange((value) => value + 1)} className='flex h-11 w-12 items-center justify-center border-l border-line-soft text-xl text-primary transition-colors hover:bg-surface-warm'>+</button>
+			</div>
+		</div>
+	);
+}
+
+export function AddToCartButton({ label, disabled, isAdding, isAdded, isAvailable, onViewCart, onClick }) {
+	const colorClass = isAdded
+		? 'bg-success text-white'
+		: !isAvailable || disabled
+			? 'cursor-not-allowed bg-muted text-text-soft'
+			: 'bg-ember text-white hover:bg-ember-hover';
+
+	return (
+		<button type='button' onClick={isAdded ? onViewCart : onClick} disabled={disabled && !isAdded} className={`flex w-full items-center justify-center gap-2 rounded-[0.625rem] px-4 py-3 font-mono text-[0.9rem] font-semibold transition-colors ${colorClass}`}>
+			{isAdding ? (
+				<>
+					<span className='h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white' />
+					Adding to cart...
+				</>
+			) : isAdded ? (
+				<>
+					<svg className='h-4 w-4' viewBox='0 0 20 20' fill='none' aria-hidden='true'><path d='m4 10 4 4 8-8' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' /></svg>
+					View Cart
+				</>
+			) : label}
+		</button>
+	);
+}
+
+export function AddedConfirmation({ dishName }) {
+	return (
+		<p role='status' className='mt-2 text-center font-mono text-[0.75rem] text-success'>
+			{dishName} has been added to your cart.
+		</p>
+	);
+}
