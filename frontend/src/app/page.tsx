import { ContactSectionContainer } from '@/components/ContactSectionContainer';
import { HeroSectionContainer } from '@/components/HeroSectionContainer';
import { ProjectsGridContainer } from '@/components/ProjectsGridContainer';
import { SkillsSectionContainer } from '@/components/SkillsSectionContainer';
import Logo from '@/shared/ui/logo';
import { NavigationContainer } from '@/widgets/gnb/NavigationContainer';
import { StockAveragingCalculator } from '@/features/stockAveragingCalculator';

export default function Home() {
	return (
		<main>
			{/* <HeroSectionContainer /> */}
			{/* <ProjectsGridContainer /> */}
			{/* <SkillsSectionContainer /> */}
			{/* <ContactSectionContainer /> */}
			<div className="container mx-auto py-8">
				<StockAveragingCalculator />
			</div>
		</main>
	);
}
