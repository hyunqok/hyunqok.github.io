import { FibonacciPurchaseStrategyProvider } from './FibonacciPurchaseStrategyContainer';
import { FibonacciPurchaseStrategyPresenter } from './FibonacciPurchaseStrategyPresenter';

export default function FibonacciPurchaseStrategy() {
	return (
		<FibonacciPurchaseStrategyProvider>
			<FibonacciPurchaseStrategyPresenter />
		</FibonacciPurchaseStrategyProvider>
	);
}
