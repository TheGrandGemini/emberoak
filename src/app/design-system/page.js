import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Divider from '@/components/ui/Divider';
import IconButton from '@/components/ui/IconButton';
import Input from '@/components/ui/Input';
import QuantityStepper from '@/components/ui/QuantityStepper';

const colorTokens = [
	{ name: 'Ember', hex: '#A8402E' },
	{ name: 'Oak', hex: '#17130F' },
	{ name: 'Background', hex: '#F7F7F5' },
	{ name: 'Surface', hex: '#FFFFFF' },
	{ name: 'Muted', hex: '#F1F1EE' },
	{ name: 'Border', hex: '#E5E5E1' },
	{ name: 'Strong', hex: '#D4D4CF' },
	{ name: 'Primary', hex: '#181818' },
	{ name: 'Secondary', hex: '#666662' },
	{ name: 'Muted Text', hex: '#92928D' },
	{ name: 'Disabled', hex: '#B5B5AF' },
	{ name: 'Success', hex: '#5B7A52' },
	{ name: 'Warning', hex: '#B9812E' },
	{ name: 'Danger', hex: '#C4293F' },
	{ name: 'Info', hex: '#4A6FA1' },
];

const typographySamples = [
	{ label: 'Display', className: 'text-display' },
	{ label: 'H1', className: 'text-h1' },
	{ label: 'H2', className: 'text-h2' },
	{ label: 'H3', className: 'text-h3' },
	{ label: 'Body Large', className: 'text-body-lg' },
	{ label: 'Body', className: 'text-body' },
	{ label: 'Body Small', className: 'text-body-sm' },
	{ label: 'Caption', className: 'text-caption' },
	{ label: 'Label', className: 'text-label' },
	{ label: 'Price', className: 'text-price' },
];

export default function DesignSystemPage() {
	return (
		<main className='mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8'>
			<header className='mb-8 space-y-3'>
				<p className='text-label text-secondary'>Restora</p>
				<h1 className='text-h1 text-primary'>Design system foundation</h1>
			</header>

			<section className='radius-20 space-y-6 border border-border bg-surface p-5 shadow-subtle sm:p-7'>
				<div className='space-y-2'>
					<h2 className='text-h3 text-primary'>Colors</h2>
					<Divider />
				</div>

				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
					{colorTokens.map((token) => (
						<div
							key={token.name}
							className='radius-16 border border-border bg-background p-3'>
							<div
								className='radius-12 mb-3 h-16 border border-border'
								style={{ backgroundColor: token.hex }}
								aria-label={`${token.name} swatch`}
							/>
							<div className='space-y-1'>
								<p className='text-label text-secondary'>{token.name}</p>
								<p className='text-body-sm text-primary'>{token.hex}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className='mt-8 space-y-6 radius-20 border border-border bg-surface p-5 shadow-subtle sm:p-7'>
				<div className='space-y-2'>
					<h2 className='text-h3 text-primary'>Typography</h2>
					<Divider />
				</div>

				<div className='space-y-4'>
					{typographySamples.map((sample) => (
						<div
							key={sample.label}
							className='space-y-2'>
							<p className='text-label text-secondary'>{sample.label}</p>
							<p className={sample.className}>
								The quick brown fox jumps over the lazy dog.
							</p>
						</div>
					))}
				</div>
			</section>

			<section className='mt-8 space-y-6 radius-20 border border-border bg-surface p-5 shadow-subtle sm:p-7'>
				<div className='space-y-2'>
					<h2 className='text-h3 text-primary'>Buttons</h2>
					<Divider />
				</div>

				<div className='flex flex-wrap gap-3'>
					<Button>Primary</Button>
					<Button variant='secondary'>Secondary</Button>
					<Button variant='ghost'>Ghost</Button>
					<Button variant='destructive'>Destructive</Button>
				</div>

				<div className='flex flex-wrap gap-3'>
					<Button size='sm'>Small</Button>
					<Button size='md'>Medium</Button>
					<Button size='lg'>Large</Button>
				</div>
			</section>

			<section className='mt-8 space-y-6 radius-20 border border-border bg-surface p-5 shadow-subtle sm:p-7'>
				<div className='space-y-2'>
					<h2 className='text-h3 text-primary'>Inputs</h2>
					<Divider />
				</div>

				<div className='grid gap-4 md:grid-cols-3'>
					<div className='space-y-2'>
						<label className='text-label text-secondary'>Default</label>
						<Input placeholder='Email address' />
					</div>
					<div className='space-y-2'>
						<label className='text-label text-secondary'>Error</label>
						<Input
							placeholder='Email address'
							error
							value='invalid@'
						/>
					</div>
					<div className='space-y-2'>
						<label className='text-label text-secondary'>Disabled</label>
						<Input
							placeholder='Unavailable'
							disabled
							value='guest@example.com'
						/>
					</div>
				</div>
			</section>

			<section className='mt-8 space-y-6 radius-20 border border-border bg-surface p-5 shadow-subtle sm:p-7'>
				<div className='space-y-2'>
					<h2 className='text-h3 text-primary'>Badges</h2>
					<Divider />
				</div>

				<div className='flex flex-wrap gap-3'>
					<Badge>Default</Badge>
					<Badge variant='success'>Success</Badge>
					<Badge variant='warning'>Warning</Badge>
					<Badge variant='danger'>Danger</Badge>
					<Badge variant='info'>Info</Badge>
				</div>
			</section>

			<section className='mt-8 space-y-6 radius-20 border border-border bg-surface p-5 shadow-subtle sm:p-7'>
				<div className='space-y-2'>
					<h2 className='text-h3 text-primary'>Icon Button</h2>
					<Divider />
				</div>

				<div className='flex flex-wrap gap-3'>
					<IconButton
						label='Open menu'
						aria-label='Open menu'>
						☰
					</IconButton>
					<IconButton
						label='Add item'
						aria-label='Add item'>
						+
					</IconButton>
					<IconButton
						label='Delete item'
						aria-label='Delete item'
						disabled>
						×
					</IconButton>
				</div>
			</section>

			<section className='mt-8 space-y-6 radius-20 border border-border bg-surface p-5 shadow-subtle sm:p-7'>
				<div className='space-y-2'>
					<h2 className='text-h3 text-primary'>Quantity stepper</h2>
					<Divider />
				</div>

				<QuantityStepper value={2} />
			</section>

			<section className='mt-8 space-y-6 radius-20 border border-border bg-surface p-5 shadow-subtle sm:p-7'>
				<div className='space-y-2'>
					<h2 className='text-h3 text-primary'>Divider</h2>
					<Divider />
				</div>
			</section>
		</main>
	);
}
