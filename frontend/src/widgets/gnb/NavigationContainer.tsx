'use client';

import { useState, useEffect } from 'react';
import { NavItem } from './NavigationType';
import { NavigationPresenter } from './NavigationPresenter';

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
		{ name: 'Home', href: '#home' },
		{ name: 'Projects', href: '#projects' },
		{ name: 'Skills', href: '#skills' },
		{ name: 'Contact', href: '#contact' },
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
