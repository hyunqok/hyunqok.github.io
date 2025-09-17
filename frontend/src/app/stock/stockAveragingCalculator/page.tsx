import { StockAveragingCalculator } from '@/features/stockAveragingCalculator';
import { FibonacciPurchaseStrategy } from '@/features/tradingStrategy';

export default function StockAveragingCalculatorPage() {
	return (
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
			</div>
		</main>
	);
}
