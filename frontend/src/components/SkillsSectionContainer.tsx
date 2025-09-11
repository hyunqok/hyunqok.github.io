'use client';

import { useState, useEffect } from 'react';
import { SkillsSectionPresenter } from './SkillsSectionPresenter';

interface Skill {
	name: string;
	level: number;
	category: string;
	icon?: string;
}

const skills: Skill[] = [
	// Frontend
	{ name: 'HTML5', level: 95, category: 'Frontend', icon: '🌐' },
	{ name: 'CSS3', level: 90, category: 'Frontend', icon: '🎨' },
	{ name: 'JavaScript', level: 85, category: 'Frontend', icon: '⚡' },
	{ name: 'TypeScript', level: 80, category: 'Frontend', icon: '🔷' },
	{ name: 'React', level: 90, category: 'Frontend', icon: '⚛️' },
	{ name: 'Next.js', level: 85, category: 'Frontend', icon: '▲' },
	{ name: 'Vue.js', level: 75, category: 'Frontend', icon: '💚' },
	{ name: 'Angular', level: 70, category: 'Frontend', icon: '🅰️' },

	// Styling
	{ name: 'Tailwind CSS', level: 90, category: 'Styling', icon: '🎯' },
	{ name: 'SCSS/SASS', level: 85, category: 'Styling', icon: '💅' },
	{ name: 'Styled Components', level: 75, category: 'Styling', icon: '🖌️' },

	// Backend
	{ name: 'Node.js', level: 80, category: 'Backend', icon: '🟢' },
	{ name: 'Python', level: 75, category: 'Backend', icon: '🐍' },
	{ name: 'FastAPI', level: 70, category: 'Backend', icon: '🚀' },
	{ name: 'MySQL', level: 80, category: 'Backend', icon: '🗄️' },

	// Tools
	{ name: 'Git', level: 85, category: 'Tools', icon: '📚' },
	{ name: 'Docker', level: 70, category: 'Tools', icon: '🐳' },
	{ name: 'AWS', level: 65, category: 'Tools', icon: '☁️' },
	{ name: 'Figma', level: 80, category: 'Tools', icon: '🎨' },
];

const categories = ['Frontend', 'Styling', 'Backend', 'Tools'];

export function SkillsSectionContainer() {
	const [activeCategory, setActiveCategory] = useState('Frontend');
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 200);
		return () => clearTimeout(timer);
	}, []);

	const handleCategoryChange = (category: string) => {
		setActiveCategory(category);
	};

	return (
		<SkillsSectionPresenter
			skills={skills}
			categories={categories}
			activeCategory={activeCategory}
			isVisible={isVisible}
			onCategoryChange={handleCategoryChange}
		/>
	);
}
