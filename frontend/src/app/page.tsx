import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { SkillsSection } from '@/components/SkillsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
	return (
		<div className="min-h-screen">
			<Navigation />
			<main>
				<HeroSection />
				<ProjectsGrid />
				<SkillsSection />
				<ContactSection />
			</main>
			<Footer />
		</div>
	);
}
