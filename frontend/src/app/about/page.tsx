import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function About() {
	return (
		<div className="min-h-screen">
			<Navigation />

			<main className="pt-16">
				{/* About 헤더 */}
				<section className="px-4 py-20">
					<div className="mx-auto max-w-6xl text-center">
						<h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">About Me</h1>
						<p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/70">
							10년차 웹 퍼블리셔로서 혁신적인 웹 솔루션을 제공하며, 사용자 경험과
							기술의 완벽한 조화를 추구합니다.
						</p>
					</div>
				</section>

				{/* 경력 타임라인 */}
				<section className="px-4 py-20">
					<div className="mx-auto max-w-6xl">
						<h2 className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">
							경력
						</h2>

						<div className="space-y-8">
							{/* 현재 직장 */}
							<div className="glass rounded-2xl p-8">
								<div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
									<div>
										<h3 className="mb-2 text-2xl font-bold text-white">
											시니어 웹 퍼블리셔
										</h3>
										<p className="font-medium text-blue-300">
											현) 다양한 클라이언트 프로젝트
										</p>
									</div>
									<div className="mt-2 text-white/60 md:mt-0">2020 - 현재</div>
								</div>
								<p className="leading-relaxed text-white/80">
									대규모 웹 프로젝트의 프론트엔드 개발을 주도하며, 최신 웹 기술을
									활용한 혁신적인 사용자 경험을 구현합니다. 팀 리딩과 코드 리뷰를
									통해 후배 개발자들의 성장을 지원합니다.
								</p>
							</div>

							{/* 이전 경력 */}
							<div className="glass rounded-2xl p-8">
								<div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
									<div>
										<h3 className="mb-2 text-2xl font-bold text-white">
											웹 퍼블리셔
										</h3>
										<p className="font-medium text-blue-300">
											전) 다양한 웹 에이전시 및 기업
										</p>
									</div>
									<div className="mt-2 text-white/60 md:mt-0">2015 - 2020</div>
								</div>
								<p className="leading-relaxed text-white/80">
									반응형 웹 디자인, 크로스 브라우징 호환성, 웹 접근성 준수를
									중점으로 다양한 프로젝트를 수행했습니다. HTML5, CSS3,
									JavaScript를 활용한 인터랙티브 웹 구현에 전문성을 키웠습니다.
								</p>
							</div>

							{/* 초기 경력 */}
							<div className="glass rounded-2xl p-8">
								<div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
									<div>
										<h3 className="mb-2 text-2xl font-bold text-white">
											주니어 웹 퍼블리셔
										</h3>
										<p className="font-medium text-blue-300">
											전) 웹 디자인 회사
										</p>
									</div>
									<div className="mt-2 text-white/60 md:mt-0">2014 - 2015</div>
								</div>
								<p className="leading-relaxed text-white/80">
									웹 퍼블리싱의 기초를 배우고 실무 경험을 쌓았습니다. HTML, CSS를
									활용한 기본적인 웹 페이지 구현과 Photoshop을 이용한 웹 디자인
									작업을 수행했습니다.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* 가치관 & 철학 */}
				<section className="px-4 py-20">
					<div className="mx-auto max-w-6xl">
						<h2 className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">
							가치관 & 철학
						</h2>

						<div className="grid gap-8 md:grid-cols-2">
							<div className="glass rounded-2xl p-8">
								<h3 className="mb-6 text-2xl font-bold text-white">
									사용자 중심 설계
								</h3>
								<p className="leading-relaxed text-white/80">
									기술은 수단일 뿐, 최종 목표는 항상 사용자입니다. 사용자의 니즈를
									깊이 이해하고, 직관적이고 효율적인 사용자 경험을 제공하는 것을
									최우선으로 생각합니다.
								</p>
							</div>

							<div className="glass rounded-2xl p-8">
								<h3 className="mb-6 text-2xl font-bold text-white">
									지속적인 학습
								</h3>
								<p className="leading-relaxed text-white/80">
									웹 기술은 빠르게 변화합니다. 새로운 기술과 트렌드를 지속적으로
									학습하고 적용하여 최고의 솔루션을 제공하기 위해 노력합니다.
								</p>
							</div>

							<div className="glass rounded-2xl p-8">
								<h3 className="mb-6 text-2xl font-bold text-white">협업과 소통</h3>
								<p className="leading-relaxed text-white/80">
									개발은 혼자 하는 일이 아닙니다. 디자이너, 백엔드 개발자,
									기획자와의 원활한 협업을 통해 최고의 결과를 만들어 냅니다.
								</p>
							</div>

							<div className="glass rounded-2xl p-8">
								<h3 className="mb-6 text-2xl font-bold text-white">
									품질과 완성도
								</h3>
								<p className="leading-relaxed text-white/80">
									완벽에 가까운 품질을 추구합니다. 세심한 디테일과 철저한 테스트를
									통해 안정적이고 신뢰할 수 있는 웹 솔루션을 제공합니다.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* 개인적인 이야기 */}
				<section className="px-4 py-20">
					<div className="mx-auto max-w-4xl">
						<h2 className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">
							개인적인 이야기
						</h2>

						<div className="glass rounded-2xl p-8">
							<div className="prose prose-lg prose-invert max-w-none">
								<p className="mb-6 leading-relaxed text-white/80">
									웹 개발이라는 분야를 처음 접한 것은 2014년이었습니다. 당시에는
									웹이 단순한 정보 전달 수단으로 여겨지던 시기였지만, 인터넷이
									우리의 일상생활을 어떻게 변화시킬지 직감적으로 느꼈습니다.
								</p>

								<p className="mb-6 leading-relaxed text-white/80">
									처음에는 HTML과 CSS의 기초적인 태그들조차 어려웠지만, 하나하나
									배워나가며 웹 페이지가 브라우저에서 살아 움직이는 마법 같은
									경험을 하게 되었습니다. 그 매력에 빠져 웹 퍼블리싱의 세계로 깊이
									빠져들게 되었습니다.
								</p>

								<p className="mb-6 leading-relaxed text-white/80">
									지난 10년 동안 수많은 프로젝트를 진행하며 다양한 기술 스택을
									경험했습니다. jQuery로 시작해서 React, Vue.js, Next.js까지, 웹
									생태계의 빠른 변화를 함께 해왔습니다.
								</p>

								<p className="leading-relaxed text-white/80">
									이제는 단순히 코드를 작성하는 것을 넘어, 사용자 경험을 설계하고
									기술적 해결책을 제시하는 개발자로 성장했습니다. 앞으로도 웹
									기술의 발전과 함께 계속해서 성장해나갈 것입니다.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* 연락처 CTA */}
				<section className="px-4 py-20">
					<div className="mx-auto max-w-4xl text-center">
						<div className="glass rounded-2xl p-12">
							<h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
								함께 일해보고 싶으신가요?
							</h2>
							<p className="mb-8 text-xl leading-relaxed text-white/70">
								프로젝트 아이디어나 협업 제안이 있으시면 언제든 연락주세요. 함께
								혁신적인 웹 솔루션을 만들어 나가고 싶습니다.
							</p>
							<a
								href="#contact"
								className="glass inline-block rounded-lg px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-white/20"
							>
								연락하기
							</a>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
