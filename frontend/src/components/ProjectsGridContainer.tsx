'use client';

import { useState } from 'react';
import { ProjectsGridPresenter } from './ProjectsGridPresenter';

interface Project {
	id: number;
	title: string;
	description: string;
	image: string;
	tags: string[];
	link?: string;
}

const projects: Project[] = [
	{
		id: 1,
		title: '바이브 컴퍼니 썸트렌드',
		description: '기업 데이터 분석 플랫폼 개발 - 실시간 데이터 시각화 및 분석 도구',
		image: '/images/projects/project1.jpg',
		tags: ['React', 'TypeScript', 'Node.js', 'D3.js'],
		link: '#',
	},
	{
		id: 2,
		title: '카카오페이증권',
		description: '금융 서비스 웹 플랫폼 - 주식 거래 및 포트폴리오 관리 시스템',
		image: '/images/projects/project2.jpg',
		tags: ['Next.js', 'Tailwind CSS', 'FastAPI'],
		link: '#',
	},
	{
		id: 3,
		title: 'SK하이닉스시스템아이씨',
		description: '기업 내부 시스템 개발 - 업무 자동화 및 데이터 관리 플랫폼',
		image: '/images/projects/project3.jpg',
		tags: ['Vue.js', 'SCSS', 'Python'],
		link: '#',
	},
	{
		id: 4,
		title: '삼성전자 C-Lab',
		description: '이노베이션 프로젝트 - AI 기반 사용자 경험 개선 솔루션',
		image: '/images/projects/project4.jpg',
		tags: ['React Native', 'TensorFlow', 'AWS'],
		link: '#',
	},
	{
		id: 5,
		title: 'LG전자 스마트홈',
		description: 'IoT 플랫폼 개발 - 스마트 디바이스 통합 관리 시스템',
		image: '/images/projects/project5.jpg',
		tags: ['Angular', 'RxJS', 'MQTT'],
		link: '#',
	},
	{
		id: 6,
		title: '현대자동차 커넥티드카',
		description: '자동차 인포테인먼트 시스템 - 차량 내 웹 플랫폼 개발',
		image: '/images/projects/project6.jpg',
		tags: ['React', 'WebSocket', 'Canvas API'],
		link: '#',
	},
];

export function ProjectsGridContainer() {
	const [hoveredId, setHoveredId] = useState<number | null>(null);

	const handleMouseEnter = (id: number) => {
		setHoveredId(id);
	};

	const handleMouseLeave = () => {
		setHoveredId(null);
	};

	return (
		<ProjectsGridPresenter
			projects={projects}
			hoveredId={hoveredId}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		/>
	);
}
