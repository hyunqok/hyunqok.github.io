import { FooterProps } from './FooterContainer';

export function FooterPresenter({ currentYear }: FooterProps) {
	return (
		<footer className="py-12 px-4 border-t border-white/10">
			<div className="max-w-6xl mx-auto">
				<div className="grid md:grid-cols-3 gap-8">
					{/* 브랜드 정보 */}
					<div className="space-y-4">
						<h3 className="text-2xl font-bold text-white">Qook</h3>
						<p className="text-white/70 leading-relaxed">
							웹퍼블리싱 10년차 개발자로서 혁신적인 웹 솔루션을
							제공합니다. 다양한 프로젝트 경험과 최신 기술
							스택으로 고객의 비즈니스 성장을 지원합니다.
						</p>
					</div>

					{/* 빠른 링크 */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-white">
							빠른 링크
						</h4>
						<div className="space-y-2">
							<a
								href="#home"
								className="block text-white/70 hover:text-white transition-colors"
							>
								홈
							</a>
							<a
								href="#projects"
								className="block text-white/70 hover:text-white transition-colors"
							>
								프로젝트
							</a>
							<a
								href="#skills"
								className="block text-white/70 hover:text-white transition-colors"
							>
								기술 스택
							</a>
							<a
								href="#contact"
								className="block text-white/70 hover:text-white transition-colors"
							>
								연락하기
							</a>
						</div>
					</div>

					{/* 연락 정보 */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-white">
							연락처
						</h4>
						<div className="space-y-2">
							<a
								href="mailto:hyunqok@gmail.com"
								className="block text-white/70 hover:text-blue-300 transition-colors"
							>
								📧 hyunqok@gmail.com
							</a>
							<a
								href="https://github.com/hyunqok"
								target="_blank"
								rel="noopener noreferrer"
								className="block text-white/70 hover:text-purple-300 transition-colors"
							>
								💻 GitHub
							</a>
							<a
								href="https://linkedin.com/in/hyunqok"
								target="_blank"
								rel="noopener noreferrer"
								className="block text-white/70 hover:text-green-300 transition-colors"
							>
								💼 LinkedIn
							</a>
						</div>
					</div>
				</div>

				{/* 저작권 정보 */}
				<div className="border-t border-white/10 mt-8 pt-8 text-center">
					<p className="text-white/60">
						© {currentYear} Qook. All rights reserved.
						<br />
						Built with Next.js, TypeScript, and Tailwind CSS
					</p>
				</div>
			</div>
		</footer>
	);
}
