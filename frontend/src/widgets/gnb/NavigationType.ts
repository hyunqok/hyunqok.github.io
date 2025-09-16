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
