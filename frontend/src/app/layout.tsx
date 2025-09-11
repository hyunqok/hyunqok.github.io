import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Qook - 웹퍼블리싱 전문가',
	description:
		'웹퍼블리싱 10년차 개발자로서 혁신적인 웹 솔루션을 제공합니다.',
	keywords: [
		'웹퍼블리싱',
		'프론트엔드',
		'개발자',
		'포트폴리오',
		'Next.js',
		'React',
	],
	authors: [{ name: 'Qook' }],
	openGraph: {
		title: 'Qook - 웹퍼블리싱 전문가',
		description:
			'웹퍼블리싱 10년차 개발자로서 혁신적인 웹 솔루션을 제공합니다.',
		type: 'website',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ko">
			<body
				className={`${inter.className} bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen`}
			>
				{children}
			</body>
		</html>
	);
}
