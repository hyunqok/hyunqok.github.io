import { Card } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';

interface Skill {
	name: string;
	level: number;
	category: string;
	icon?: string;
}

interface SkillsSectionPresenterProps {
	skills: Skill[];
	categories: string[];
	activeCategory: string;
	isVisible: boolean;
	onCategoryChange: (category: string) => void;
}

export function SkillsSectionPresenter({
	skills,
	categories,
	activeCategory,
	isVisible,
	onCategoryChange,
}: SkillsSectionPresenterProps) {
	const filteredSkills = skills.filter(skill => skill.category === activeCategory);

	return (
		<section className="px-4 py-20">
			<div className="mx-auto max-w-6xl">
				{/* 섹션 헤더 */}
				<div
					className={`mb-16 text-center transition-all duration-1000 ${
						isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
					}`}
				>
					<h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">기술 스택</h2>
					<p className="mx-auto max-w-2xl text-xl text-white/70">
						10년간의 경험으로 다양한 기술을 활용하여 최적의 솔루션을 제공합니다.
					</p>
				</div>

				{/* 카테고리 탭 */}
				<div className="mb-12 flex flex-wrap justify-center gap-4">
					{categories.map(category => (
						<Badge
							key={category}
							variant={activeCategory === category ? 'default' : 'secondary'}
							className={`glass-light cursor-pointer rounded-full px-6 py-3 font-medium transition-all duration-300 hover:scale-105 ${
								activeCategory === category
									? 'border-blue-400/50 bg-blue-500/30 text-blue-300'
									: 'text-white/70 hover:bg-white/10 hover:text-white'
							}`}
							onClick={() => onCategoryChange(category)}
						>
							{category}
						</Badge>
					))}
				</div>

				{/* 스킬 그리드 */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{filteredSkills.map((skill, index) => (
						<Card
							key={skill.name}
							className="glass animate-fade-in-up rounded-xl border-white/10 p-6 transition-all duration-500 hover:scale-105"
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							{/* 스킬 아이콘 */}
							<div className="mb-4 text-center text-4xl">{skill.icon}</div>

							{/* 스킬 이름 */}
							<h3 className="mb-3 text-center text-lg font-semibold text-white">
								{skill.name}
							</h3>

							{/* 스킬 레벨 바 */}
							<div className="relative">
								<div className="mb-2 h-2 w-full rounded-full bg-white/20">
									<div
										className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-1000 ease-out"
										style={{
											width: isVisible ? `${skill.level}%` : '0%',
											transitionDelay: `${index * 0.1}s`,
										}}
									/>
								</div>
								<div className="text-right">
									<span className="text-sm text-white/60">{skill.level}%</span>
								</div>
							</div>
						</Card>
					))}
				</div>

				{/* 추가 정보 */}
				<div className="mt-16 text-center">
					<Card className="glass mx-auto max-w-4xl rounded-2xl border-white/10 p-8">
						<h3 className="mb-4 text-2xl font-bold text-white">지속적인 학습과 성장</h3>
						<p className="leading-relaxed text-white/80">
							웹 기술의 빠른 발전에 따라 지속적으로 새로운 기술을 학습하고 적용합니다.
							최신 트렌드를 따라가며, 프로젝트 요구사항에 맞는 최적의 기술 스택을
							선택합니다.
						</p>
					</Card>
				</div>
			</div>
		</section>
	);
}
