'use client';

import Logo from '@/shared/ui/logo';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
	const [isGnbOpen, setIsGnbOpen] = useState(false);
	const gnbRef = useRef<HTMLDivElement>(null);

	const toggleGnb = () => {
		setIsGnbOpen(!isGnbOpen);
	};

	// 외부 클릭 시 메뉴 닫기
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (gnbRef.current && !gnbRef.current.contains(event.target as Node)) {
				setIsGnbOpen(false);
			}
		};

		if (isGnbOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isGnbOpen]);

	return (
		<>
			<header className="flex items-center justify-between p-6">
				<div className="flex items-center gap-4">
					<SidebarTrigger />
				</div>
				<div className="">
					<span className="sr-only">hyun qook jeong home</span>
					<h1 className="logo-block">
						<Link href="/" aria-label="hyun qook jeong home">
							<Logo />
						</Link>
					</h1>
				</div>
				<div className="">
					<div ref={gnbRef} className={`relative ${isGnbOpen ? 'gnb-open' : ''}`}>
						<button
							type="button"
							className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors hover:bg-gray-100 ${
								isGnbOpen ? 'bg-gray-100' : 'bg-white'
							}`}
							onClick={toggleGnb}
							data-cursorrole="none"
						>
							<span className="text-sm font-medium">
								{isGnbOpen ? 'CLOSE' : 'CONTACT'}
							</span>
							<div
								className={`h-2 w-2 rounded-full bg-blue-500 transition-transform ${
									isGnbOpen ? 'rotate-180' : ''
								}`}
							/>
						</button>

						{/* gnb-wrap */}
						<nav
							className={`absolute top-full right-0 mt-2 min-w-[200px] rounded-lg border bg-white shadow-lg transition-all duration-200 ${
								isGnbOpen
									? 'visible translate-y-0 transform opacity-100'
									: 'invisible -translate-y-2 transform opacity-0'
							}`}
						>
							<ul className="py-2">
								<li>
									<a
										href="mailto:hyunqok@kakao.com"
										className="block px-4 py-2 text-sm transition-colors hover:bg-gray-50"
										data-cursorrole="none"
									>
										📧 Mail
									</a>
								</li>
								<li>
									<a
										href="/work"
										className="block px-4 py-2 text-sm transition-colors hover:bg-gray-50"
										data-cursorrole="none"
									>
										📂 Project List
									</a>
								</li>
								<li>
									<a
										href="/certificate"
										className="block px-4 py-2 text-sm transition-colors hover:bg-gray-50"
										data-cursorrole="none"
									>
										🏆 SW Career Certificate
									</a>
								</li>
							</ul>
						</nav>
						{/* //gnb-wrap */}
					</div>
				</div>
				{/* <NavigationContainer /> */}
			</header>
		</>
	);
};

export default Header;
