import { StockAuthProvider } from '@/app/providers/StockAuthContext';
import AccountInquiry from '@/features/accountInquiry/AccountInquiry';
import StockAveragingCalculator from '@/features/stockAveragingCalculator/StockAveragingCalculator';
import FibonacciPurchaseStrategy from '@/features/tradingStrategy/FibonacciPurchaseStrategy';

export default function StockAveragingCalculatorPage() {
	return (
		<StockAuthProvider>
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
						<AccountInquiry />
					</div>
				</div>
			</main>
		</StockAuthProvider>
	);
}
