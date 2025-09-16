import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';

interface Project {
	id: number;
	title: string;
	description: string;
	image: string;
	tags: string[];
	link?: string;
}

interface ProjectsGridPresenterProps {
	projects: Project[];
	hoveredId: number | null;
	onMouseEnter: (id: number) => void;
	onMouseLeave: () => void;
}

export function ProjectsGridPresenter({
	projects,
	hoveredId,
	onMouseEnter,
	onMouseLeave,
}: ProjectsGridPresenterProps) {
	return (
		<section className="px-4 py-20">
			<div className="mx-auto max-w-7xl">
				{/* 섹션 헤더 */}
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
						주요 프로젝트
					</h2>
					<p className="mx-auto max-w-2xl text-xl text-white/70">
						10년간의 웹퍼블리싱 경험으로 다양한 산업 분야의 프로젝트를 성공적으로
						완수했습니다.
					</p>
				</div>

				{/* 프로젝트 그리드 */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{projects.map((project, index) => (
						<Card
							key={project.id}
							className="group glass animate-fade-in-up relative overflow-hidden rounded-2xl border-white/10 transition-all duration-500 hover:scale-105"
							style={{ animationDelay: `${index * 0.1}s` }}
							onMouseEnter={() => onMouseEnter(project.id)}
							onMouseLeave={onMouseLeave}
						>
							{/* 프로젝트 이미지 */}
							<div className="relative aspect-video overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
								<div className="absolute inset-0 bg-black/40 transition-all duration-300 group-hover:bg-black/20" />

								{/* 플레이스홀더 이미지 (실제 이미지로 교체 필요) */}
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="text-6xl text-white/50">
										<svg
											className="h-16 w-16"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 7v10h16V7H4zm8 2l5 4H7l5-4z" />
										</svg>
									</div>
								</div>

								{/* 호버 오버레이 */}
								<div
									className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-all duration-300 ${
										hoveredId === project.id ? 'opacity-100' : 'opacity-0'
									}`}
								>
									<div className="absolute right-4 bottom-4 left-4">
										<button className="glass-light rounded-full px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20">
											자세히 보기
										</button>
									</div>
								</div>
							</div>

							{/* 프로젝트 정보 */}
							<CardContent className="p-6">
								<h3 className="mb-2 text-xl font-semibold text-white transition-colors duration-200 group-hover:text-blue-300">
									{project.title}
								</h3>
								<p className="mb-4 text-sm leading-relaxed text-white/70">
									{project.description}
								</p>

								{/* 기술 태그 */}
								<div className="flex flex-wrap gap-2">
									{project.tags.map(tag => (
										<Badge
											key={tag}
											variant="secondary"
											className="glass-light text-blue-300 transition-all duration-200 hover:bg-blue-500/20"
										>
											{tag}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* 더 보기 버튼 */}
				<div className="mt-12 text-center">
					<button className="glass rounded-full px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-white/20">
						모든 프로젝트 보기
					</button>
				</div>
			</div>
		</section>
	);
}
