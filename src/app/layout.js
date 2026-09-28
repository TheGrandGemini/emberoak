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
	title: 'Restora',
	description: 'Minimal design foundation for Restora.',
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
