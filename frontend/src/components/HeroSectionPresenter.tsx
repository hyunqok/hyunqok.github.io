import { Button } from '@/shared/ui/button';

interface HeroSectionPresenterProps {
	isVisible: boolean;
}

export function HeroSectionPresenter({ isVisible }: HeroSectionPresenterProps) {
	return (
		<section className="relative flex min-h-screen items-center justify-center px-4 py-20">
			{/* 배경 그라데이션 오버레이 */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />

			{/* 메인 콘텐츠 */}
			<div
				className={`relative mx-auto max-w-4xl text-center transition-all duration-1000 ${
					isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
				}`}
			>
				{/* Glassmorphism 카드 */}
				<div className="glass rounded-3xl p-8 shadow-2xl md:p-12">
					<h1 className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl">
						<span className="text-white">안녕하세요!</span>
					</h1>

					<p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-white/80 md:text-2xl">
						다양한 프로젝트 경험과 최신 기술 스택으로
						<br className="hidden md:block" />
						혁신적인 웹 솔루션을 제공합니다.
					</p>

					{/* CTA 버튼들 */}
					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Button
							size="lg"
							className="glass-light border-white/20 text-white hover:border-white/40 hover:bg-white/20"
						>
							포트폴리오 보기
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="glass border-white/20 text-blue-300 hover:border-blue-400/50 hover:bg-blue-500/20 hover:text-blue-200"
						>
							연락하기
						</Button>
					</div>
				</div>

				{/* 스크롤 인디케이터 */}
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
					<div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
						<div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white/50"></div>
					</div>
				</div>
			</div>
		</section>
	);
}
