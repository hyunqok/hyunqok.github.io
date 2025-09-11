import { FooterPresenter } from './FooterPresenter';

export interface FooterProps {
	currentYear: number;
}

export function FooterContainer() {
	const currentYear = new Date().getFullYear();

	return <FooterPresenter currentYear={currentYear} />;
}
