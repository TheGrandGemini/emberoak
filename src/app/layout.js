import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/layout/Header';
import '@fontsource/fraunces/index.css';
import '@fontsource/inter/index.css';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const siteUrl =
	process.env.NEXT_PUBLIC_SITE_URL ||
	(process.env.VERCEL_PROJECT_PRODUCTION_URL &&
		`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
	(process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`);
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;
const socialImage = metadataBase
	? [
			{
				url: new URL('/assets/exterior.jpg', metadataBase),
				alt: 'Ember & Oak restaurant in Lagos',
			},
		]
	: undefined;

export const metadata = {
	metadataBase,
	title: {
		default: 'Ember & Oak | Open-Grill West African Dining in Lagos',
		template: '%s | Ember & Oak Lagos',
	},
	description:
		'Discover Ember & Oak, a Lagos restaurant serving West African-rooted dishes over a real open grill. Dine in, order takeaway, or get delivery.',
	applicationName: 'Ember & Oak',
	keywords: [
		'Ember & Oak',
		'Lagos restaurant',
		'restaurant in Lagos',
		'West African food Lagos',
		'open grill restaurant',
		'dine-in Lagos',
		'Lagos takeaway',
		'Lagos food delivery',
	],
	category: 'food and dining',
	creator: 'Ember & Oak',
	publisher: 'Ember & Oak',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
	icons: {
		icon: [{ url: '/favicon.png', type: 'image/png' }],
		shortcut: '/favicon.png',
		apple: '/favicon.png',
	},
	openGraph: {
		type: 'website',
		locale: 'en_NG',
		siteName: 'Ember & Oak',
		title: 'Ember & Oak | Open-Grill West African Dining in Lagos',
		description:
			'West African-rooted dishes cooked over a real open grill in Lagos. Dine in, order takeaway, or get delivery.',
		images: socialImage,
	},
	twitter: {
		card: socialImage ? 'summary_large_image' : 'summary',
		title: 'Ember & Oak | Open-Grill West African Dining in Lagos',
		description:
			'West African-rooted dishes cooked over a real open grill in Lagos. Dine in, order takeaway, or get delivery.',
		images: socialImage,
	},
};

export const viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
};

export default function RootLayout({ children }) {
	return (
		<html
			lang='en'
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
			<body className='min-h-full flex flex-col bg-background text-primary'>
				<Header />
				{children}
			</body>
		</html>
	);
}
