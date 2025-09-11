import { NavigationProps } from './NavigationContainer';

export function NavigationPresenter({
	isScrolled,
	isMobileMenuOpen,
	navItems,
	onMenuToggle,
	onNavItemClick,
}: NavigationProps) {
	return (
		<nav
			className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
				isScrolled ? 'glass' : 'bg-transparent'
			}`}
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* 로고 */}
					<div className="flex-shrink-0">
						<button
							onClick={() => onNavItemClick('#home')}
							className="text-xl font-bold text-white transition-colors hover:text-blue-300"
						>
							Qook
						</button>
					</div>

					{/* 데스크톱 메뉴 */}
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							{navItems.map(item => (
								<button
									key={item.name}
									onClick={() => onNavItemClick(item.href)}
									className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
								>
									{item.name}
								</button>
							))}
						</div>
					</div>

					{/* 모바일 메뉴 버튼 */}
					<div className="md:hidden">
						<button
							onClick={onMenuToggle}
							className="glass-light rounded-md p-2 text-white transition-colors hover:text-blue-300"
						>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{isMobileMenuOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* 모바일 메뉴 */}
			<div
				className={`overflow-hidden transition-all duration-300 md:hidden ${
					isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
				}`}
			>
				<div className="space-y-1 bg-black/20 px-2 pt-2 pb-3 backdrop-blur-md">
					{navItems.map(item => (
						<button
							key={item.name}
							onClick={() => onNavItemClick(item.href)}
							className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
						>
							{item.name}
						</button>
					))}
				</div>
			</div>
		</nav>
	);
}
