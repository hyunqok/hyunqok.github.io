import { StockAuthProvider } from '@/app/providers/StockAuthContext';
import { AccountInquiryProvider } from '@/features/accountInquiry/AccountInquiryContainer';
import { AccountInquiryPresenter } from '@/features/accountInquiry/AccountInquiryPresenter';
import StockAveragingCalculator from '@/features/stockAveragingCalculator/StockAveragingCalculator';
import { StockAveragingCalculatorProvider } from '@/features/stockAveragingCalculator/StockAveragingCalculatorContainer';
import FibonacciPurchaseStrategy from '@/features/tradingStrategy/FibonacciPurchaseStrategy';

export default function StockAveragingCalculatorPage() {
	return (
		<StockAuthProvider>
			<AccountInquiryProvider>
				<StockAveragingCalculatorProvider>
					<main>
						<div className="container mx-auto">
							<div className="grid grid-cols-2 gap-4">
								<div className="">
									<StockAveragingCalculator />
								</div>
								<div className="">
									<FibonacciPurchaseStrategy />
								</div>
							</div>

							{/* 계좌 조회 섹션 */}
							<div className="mt-8">
								<AccountInquiryPresenter />
							</div>
						</div>
					</main>
				</StockAveragingCalculatorProvider>
			</AccountInquiryProvider>
		</StockAuthProvider>
	);
}
