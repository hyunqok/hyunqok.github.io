import React from 'react';
import { StockAveragingCalculatorProvider } from './StockAveragingCalculatorContainer';
import { StockAveragingCalculatorPresenter } from './StockAveragingCalculatorPresenter';

export default function StockAveragingCalculator() {
	return (
		<StockAveragingCalculatorProvider>
			<StockAveragingCalculatorPresenter />
		</StockAveragingCalculatorProvider>
	);
}
