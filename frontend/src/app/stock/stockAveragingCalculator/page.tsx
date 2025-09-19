import { StockAuthProvider } from '@/app/providers/StockAuthContext';
import { AccountInquiryProvider } from '@/features/accountInquiry/AccountInquiryContainer';
import { AccountInquiryPresenter } from '@/features/accountInquiry/AccountInquiryPresenter';
import StockAveragingCalculator from '@/features/stockAveragingCalculator/StockAveragingCalculator';
import { StockAveragingCalculatorProvider } from '@/features/stockAveragingCalculator/StockAveragingCalculatorContainer';

export default function StockAveragingCalculatorPage() {
	return (
		<StockAuthProvider>
			<AccountInquiryProvider>
				<StockAveragingCalculatorProvider>
					<main>
						<div className="container mx-auto">
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-4">
									<AccountInquiryPresenter />
								</div>
								<div className="col-span-8">
									<StockAveragingCalculator />
								</div>
							</div>
						</div>
					</main>
				</StockAveragingCalculatorProvider>
			</AccountInquiryProvider>
		</StockAuthProvider>
	);
}
