'use client';

import React from 'react';
import { StockAveragingCalculatorProvider, StockAveragingCalculatorPresenter } from './index';

export const StockAveragingCalculator = () => {
	return (
		<StockAveragingCalculatorProvider>
			<StockAveragingCalculatorPresenter />
		</StockAveragingCalculatorProvider>
	);
};
