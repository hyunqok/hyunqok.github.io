'use client';

import React from 'react';
import { FibonacciPurchaseStrategyProvider, FibonacciPurchaseStrategyPresenter } from './index';

export const FibonacciPurchaseStrategy = () => {
	return (
		<FibonacciPurchaseStrategyProvider>
			<FibonacciPurchaseStrategyPresenter />
		</FibonacciPurchaseStrategyProvider>
	);
};
