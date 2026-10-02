export default function CartLoadingState() {
	return (
		<div
			aria-label='Loading cart'
			aria-busy='true'
			className='flex min-h-64 flex-1 flex-col px-5'>
			<div className='flex-1 animate-pulse divide-y divide-line-soft'>
				{[0, 1].map((row) => (
					<div
						key={row}
						className='flex gap-3 py-4'>
						<div className='h-14 w-14 shrink-0 rounded-lg bg-skeleton' />
						<div className='flex-1 space-y-2 pt-1'>
							<div className='h-3 w-3/5 rounded bg-skeleton' />
							<div className='h-3 w-2/5 rounded bg-skeleton-light' />
							<div className='h-3 w-1/4 rounded bg-skeleton-light' />
						</div>
						<div className='h-3 w-12 rounded bg-skeleton' />
					</div>
				))}
			</div>
			<div className='animate-pulse space-y-3 border-t border-line-soft py-4'>
				<div className='flex justify-between'>
					<div className='h-3 w-16 rounded bg-skeleton' />
					<div className='h-3 w-12 rounded bg-skeleton' />
				</div>
				<div className='h-12 rounded-[0.625rem] bg-skeleton' />
			</div>
		</div>
	);
}
