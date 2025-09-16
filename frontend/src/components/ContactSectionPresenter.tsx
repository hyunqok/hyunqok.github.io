import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

interface ContactSectionPresenterProps {
	formData: ContactFormData;
	isSubmitting: boolean;
	onSubmit: (e: React.FormEvent) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function ContactSectionPresenter({
	formData,
	isSubmitting,
	onSubmit,
	onChange,
}: ContactSectionPresenterProps) {
	return (
		<section className="px-4 py-20">
			<div className="mx-auto max-w-6xl">
				{/* 섹션 헤더 */}
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">연락하기</h2>
					<p className="mx-auto max-w-2xl text-xl text-white/70">
						프로젝트 문의나 협업 제안이 있으시면 언제든 연락주세요.
					</p>
				</div>

				<div className="grid gap-12 lg:grid-cols-2">
					{/* 연락 정보 */}
					<div className="space-y-8">
						<Card className="glass rounded-2xl border-white/10 p-8">
							<h3 className="mb-6 text-2xl font-bold text-white">빠른 연락</h3>

							<div className="space-y-6">
								<div className="flex items-center space-x-4">
									<div className="glass-light rounded-full p-3">
										<svg
											className="h-6 w-6 text-blue-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
									</div>
									<div>
										<p className="font-medium text-white">이메일</p>
										<a
											href="mailto:hyunqok@gmail.com"
											className="text-blue-300 transition-colors hover:text-blue-200"
										>
											hyunqok@gmail.com
										</a>
									</div>
								</div>

								<div className="flex items-center space-x-4">
									<div className="glass-light rounded-full p-3">
										<svg
											className="h-6 w-6 text-purple-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</svg>
									</div>
									<div>
										<p className="font-medium text-white">GitHub</p>
										<a
											href="https://github.com/hyunqok"
											target="_blank"
											rel="noopener noreferrer"
											className="text-purple-300 transition-colors hover:text-purple-200"
										>
											github.com/hyunqok
										</a>
									</div>
								</div>

								<div className="flex items-center space-x-4">
									<div className="glass-light rounded-full p-3">
										<svg
											className="h-6 w-6 text-green-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
											/>
										</svg>
									</div>
									<div>
										<p className="font-medium text-white">LinkedIn</p>
										<a
											href="https://linkedin.com/in/hyunqok"
											target="_blank"
											rel="noopener noreferrer"
											className="text-green-300 transition-colors hover:text-green-200"
										>
											linkedin.com/in/hyunqok
										</a>
									</div>
								</div>
							</div>
						</Card>

						{/* 추가 정보 */}
						<Card className="glass rounded-2xl border-white/10 p-8">
							<h3 className="mb-4 text-2xl font-bold text-white">응답 시간</h3>
							<p className="leading-relaxed text-white/80">
								일반 문의: 24시간 이내
								<br />
								프로젝트 제안: 48시간 이내
								<br />
								긴급 건: 즉시 연락 가능
							</p>
						</Card>
					</div>

					{/* 연락 폼 */}
					<Card className="glass rounded-2xl border-white/10 p-8">
						<h3 className="mb-6 text-2xl font-bold text-white">메시지 보내기</h3>

						<form onSubmit={onSubmit} className="space-y-6">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<label
										htmlFor="name"
										className="mb-2 block font-medium text-white"
									>
										이름 *
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={onChange}
										required
										className="glass-light w-full rounded-lg border border-white/20 px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-blue-400/50 focus:outline-none"
										placeholder="이름을 입력하세요"
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="mb-2 block font-medium text-white"
									>
										이메일 *
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={onChange}
										required
										className="glass-light w-full rounded-lg border border-white/20 px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-blue-400/50 focus:outline-none"
										placeholder="이메일을 입력하세요"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="subject"
									className="mb-2 block font-medium text-white"
								>
									제목 *
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									value={formData.subject}
									onChange={onChange}
									required
									className="glass-light w-full rounded-lg border border-white/20 px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-blue-400/50 focus:outline-none"
									placeholder="문의 제목을 입력하세요"
								/>
							</div>

							<div>
								<label
									htmlFor="message"
									className="mb-2 block font-medium text-white"
								>
									메시지 *
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={onChange}
									required
									rows={6}
									className="glass-light w-full resize-none rounded-lg border border-white/20 px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-blue-400/50 focus:outline-none"
									placeholder="문의 내용을 자세히 입력하세요"
								/>
							</div>

							<Button
								type="submit"
								disabled={isSubmitting}
								size="lg"
								className="glass w-full text-white transition-all duration-300 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{isSubmitting ? '전송 중...' : '메시지 보내기'}
							</Button>
						</form>
					</Card>
				</div>
			</div>
		</section>
	);
}
