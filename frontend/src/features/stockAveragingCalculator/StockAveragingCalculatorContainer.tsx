'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface StockData {
	currentQuantity: number;
	averagePrice: number;
	currentMarketPrice: number;
	targetProfitRate: number;
}

interface CalculationResult {
	additionalQuantity: number;
	additionalCost: number;
	newAveragePrice: number;
	totalValue: number;
}

interface StockAveragingCalculatorContextType {
	stockData: StockData;
	result: CalculationResult | null;
	updateStockData: (data: Partial<StockData>) => void;
	calculate: () => void;
	reset: () => void;
}

const StockAveragingCalculatorContext = createContext<
	StockAveragingCalculatorContextType | undefined
>(undefined);

export const useStockAveragingCalculator = () => {
	const context = useContext(StockAveragingCalculatorContext);
	if (!context) {
		throw new Error(
			'useStockAveragingCalculator must be used within StockAveragingCalculatorProvider',
		);
	}
	return context;
};

interface StockAveragingCalculatorProviderProps {
	children: ReactNode;
}

export const StockAveragingCalculatorProvider: React.FC<StockAveragingCalculatorProviderProps> = ({
	children,
}) => {
	const [stockData, setStockData] = useState<StockData>({
		currentQuantity: 0,
		averagePrice: 0,
		currentMarketPrice: 0,
		targetProfitRate: 0,
	});
	const [result, setResult] = useState<CalculationResult | null>(null);

	const updateStockData = useCallback((data: Partial<StockData>) => {
		setStockData(prev => ({ ...prev, ...data }));
	}, []);

	const calculate = useCallback(() => {
		const { currentQuantity, averagePrice, currentMarketPrice, targetProfitRate } = stockData;

		// 현재 투자 상태 계산
		const currentInvestment = currentQuantity * averagePrice; // 현재 총 투자금액
		const currentEvaluation = currentQuantity * currentMarketPrice; // 현재 평가금액

		// 목표 수익률을 달성하기 위한 추가 매수 수량 계산
		// 수학 공식: q = [I×(1+R) - Q×P] / [P×(-R)]
		// 단, R ≠ 0인 경우

		let additionalQuantity = 0;

		if (Math.abs(targetProfitRate) < 0.0001) {
			// 목표 수익률이 0인 경우 (손익분기점)
			const targetEvaluation = currentInvestment;
			const additionalValue = Math.max(0, targetEvaluation - currentEvaluation);
			additionalQuantity = Math.ceil(additionalValue / currentMarketPrice);
		} else {
			// 목표 수익률이 0이 아닌 경우
			const numerator = currentInvestment * (1 + targetProfitRate / 100) - currentEvaluation;
			const denominator = currentMarketPrice * (-targetProfitRate / 100);

			if (Math.abs(denominator) > 0.0001) {
				const calculatedQuantity = numerator / denominator;
				additionalQuantity = Math.ceil(Math.max(0, calculatedQuantity));
			}
		}

		// 추가 비용 계산
		const additionalCost = additionalQuantity * currentMarketPrice;

		// 새로운 포지션 계산
		const newTotalQuantity = currentQuantity + additionalQuantity;
		const newAveragePrice = (currentInvestment + additionalCost) / newTotalQuantity;
		const newEvaluation = newTotalQuantity * currentMarketPrice;

		setResult({
			additionalQuantity,
			additionalCost,
			newAveragePrice,
			totalValue: newEvaluation,
		});
	}, [stockData]);

	const reset = useCallback(() => {
		setStockData({
			currentQuantity: 0,
			averagePrice: 0,
			currentMarketPrice: 0,
			targetProfitRate: 0,
		});
		setResult(null);
	}, []);

	const value: StockAveragingCalculatorContextType = {
		stockData,
		result,
		updateStockData,
		calculate,
		reset,
	};

	return (
		<StockAveragingCalculatorContext.Provider value={value}>
			{children}
		</StockAveragingCalculatorContext.Provider>
	);
};
