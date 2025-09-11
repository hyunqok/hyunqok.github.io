'use client';

import { useState, useEffect } from 'react';
import { NavigationPresenter } from './NavigationPresenter';

export interface NavItem {
	name: string;
	href: string;
}

export interface NavigationProps {
	isScrolled: boolean;
	isMobileMenuOpen: boolean;
	navItems: NavItem[];
	onMenuToggle: () => void;
	onNavItemClick: (href: string) => void;
}

export function NavigationContainer() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navItems: NavItem[] = [
		{ name: '홈', href: '#home' },
		{ name: '프로젝트', href: '#projects' },
		{ name: '기술', href: '#skills' },
		{ name: '연락', href: '#contact' },
	];

	const handleNavItemClick = (href: string) => {
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
		setIsMobileMenuOpen(false);
	};

	const handleMenuToggle = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<NavigationPresenter
			isScrolled={isScrolled}
			isMobileMenuOpen={isMobileMenuOpen}
			navItems={navItems}
			onMenuToggle={handleMenuToggle}
			onNavItemClick={handleNavItemClick}
		/>
	);
}
