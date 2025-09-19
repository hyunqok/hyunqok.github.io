import '@/shared/css/globals.css';
import Header from '@/widgets/Header';
import { AppSidebar, SidebarProvider } from '@/widgets/AppSidebar';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

// SEO 최적화된 메타데이터 설정
export const metadata: Metadata = {
	title: {
		default: '주식 투자 도구 | 물타기 계산기 & 매수 전략',
		template: '%s | 주식 투자 도구',
	},
	description:
		'피보나치 수열 기반 주식 물타기 계산기와 최적의 매수 전략을 제공합니다. 데이터 기반 투자 결정을 위한 전문 도구입니다.',
	keywords: [
		'주식',
		'물타기',
		'계산기',
		'피보나치',
		'매수전략',
		'투자',
		'주식투자',
		'분할매수',
		'평균단가',
		'수익률',
		'포트폴리오',
	],
	authors: [{ name: 'hyunqok', url: 'https://github.com/hyunqok' }],
	creator: 'hyunqok',
	publisher: 'hyunqok',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL('https://hyunqok.github.io'),
	alternates: {
		canonical: '/',
		languages: {
			'ko-KR': '/',
		},
	},
	openGraph: {
		type: 'website',
		locale: 'ko_KR',
		url: 'https://hyunqok.github.io',
		title: '주식 투자 도구 | 물타기 계산기 & 매수 전략',
		description: '피보나치 수열 기반 주식 물타기 계산기와 최적의 매수 전략을 제공합니다.',
		siteName: '주식 투자 도구',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: '주식 투자 도구 - 물타기 계산기',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: '주식 투자 도구 | 물타기 계산기 & 매수 전략',
		description: '피보나치 수열 기반 주식 물타기 계산기와 최적의 매수 전략을 제공합니다.',
		images: ['/twitter-image.jpg'],
		creator: '@hyunqok',
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: 'your-google-verification-code',
	},
	category: 'finance',
	classification: 'Investment Tools',
};

// 뷰포트 설정
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#000000' },
	],
};

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<head>
				{/* 추가 SEO 메타태그들 */}
				<meta name="theme-color" content="#ffffff" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="msapplication-config" content="/browserconfig.xml" />
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/manifest.json" />

				{/* 구조화 데이터 (JSON-LD) */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'WebApplication',
							name: '주식 투자 도구',
							description:
								'피보나치 수열 기반 주식 물타기 계산기와 최적의 매수 전략을 제공합니다.',
							url: 'https://hyunqok.github.io',
							applicationCategory: 'FinanceApplication',
							operatingSystem: 'Web Browser',
							offers: {
								'@type': 'Offer',
								price: '0',
								priceCurrency: 'KRW',
							},
							creator: {
								'@type': 'Person',
								name: 'hyunqok',
								url: 'https://github.com/hyunqok',
							},
							publisher: {
								'@type': 'Person',
								name: 'hyunqok',
							},
						}),
					}}
				/>
			</head>
			<body className={`${inter.className} min-h-screen bg-white text-gray-900 antialiased`}>
				<SidebarProvider>
					<div className="flex min-h-screen w-full">
						<AppSidebar />
						<div className="flex w-full flex-1 flex-col">
							<Header />
							<main className="flex-1">{children}</main>
							{/* <Footer /> */}
						</div>
					</div>
				</SidebarProvider>
			</body>
		</html>
	);
}
