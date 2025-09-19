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
					<main className="px-7">
						<div className="grid grid-cols-12 gap-4">
							<div className="col-span-12 lg:col-span-5">
								<AccountInquiryPresenter />
							</div>
							<div className="col-span-12 lg:col-span-7">
								<StockAveragingCalculator />
							</div>
						</div>
					</main>
				</StockAveragingCalculatorProvider>
			</AccountInquiryProvider>
		</StockAuthProvider>
	);
}
