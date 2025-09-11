'use client';

'use client';

import { useState, useEffect } from 'react';
import { HeroSectionPresenter } from './HeroSectionPresenter';

export function HeroSectionContainer() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	return <HeroSectionPresenter isVisible={isVisible} />;
}
