import { Geist, Geist_Mono } from 'next/font/google';
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

export const metadata = {
	title: 'Ember & Oak | Lagos',
	description: 'Open-grill West African dining in the heart of Lagos.',
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
				{children}
			</body>
		</html>
	);
}
