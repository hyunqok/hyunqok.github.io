'use client';

import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback,
	useMemo,
	useEffect,
} from 'react';

export interface StockData {
	currentQuantity: number;
	averagePrice: number;
	currentMarketPrice: number;
	targetProfitRate: number;
	additionalQuantity?: number; // 추가 매수 수량 (수량 모드에서 사용)
	additionalAmount?: number; // 추가 매수 금액 (금액 모드에서 사용)
}

interface CalculationResult {
	additionalQuantity: number;
	additionalCost: number;
	newAveragePrice: number;
	totalValue: number;
	calculatedProfitRate?: number; // 수량 모드에서 계산된 목표 수익률
}

interface CurrentAnalysis {
	investmentAmount: number;
	evaluationAmount: number;
	profitLoss: number;
	profitRate: number;
}

interface StockAveragingCalculatorContextType {
	stockData: StockData;
	result: CalculationResult | null;
	currentAnalysis: CurrentAnalysis | null;
	mode: 'profitRate' | 'quantity' | 'amount';
	amounts: { label: string; value: number }[];
	updateStockData: (data: Partial<StockData>) => void;
	setMode: (mode: 'profitRate' | 'quantity' | 'amount') => void;
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

export const StockAveragingCalculatorProvider = ({
	children,
}: StockAveragingCalculatorProviderProps) => {
	const [stockData, setStockData] = useState<StockData>({
		currentQuantity: 0,
		averagePrice: 0,
		currentMarketPrice: 0,
		targetProfitRate: 0,
		additionalQuantity: 0,
		additionalAmount: 0,
	});
	const [result, setResult] = useState<CalculationResult | null>(null);
	const [mode, setMode] = useState<'profitRate' | 'quantity' | 'amount'>('quantity');
	const amounts: { label: string; value: number }[] = [
		{ label: '10만원', value: 100000 },
		{ label: '50만원', value: 500000 },
		{ label: '100만원', value: 1000000 },
		{ label: '1000만원', value: 10000000 },
	];

	const updateStockData = useCallback(
		(data: Partial<StockData>) => {
			console.log('🚀 StockAveragingCalculator updateStockData called with:', data);

			// 보다 명확한 디버깅을 위한 로그 추가
			console.log('Previous stockData:', stockData);

			setStockData(prevState => {
				const newStockData = { ...prevState, ...data };
				console.log('New stockData will be:', newStockData);
				return newStockData;
			});
		},
		[], // stockData 종속성 제거
	);

	// 현재 보유 주식 분석 계산
	const currentAnalysis = useMemo(() => {
		const { currentQuantity, averagePrice, currentMarketPrice } = stockData;
		if (!currentQuantity || !averagePrice || !currentMarketPrice) {
			return null;
		}

		const investmentAmount = currentQuantity * averagePrice;
		const evaluationAmount = currentQuantity * currentMarketPrice;
		const profitLoss = evaluationAmount - investmentAmount;
		const profitRate = investmentAmount > 0 ? (profitLoss / investmentAmount) * 100 : 0;

		return {
			investmentAmount,
			evaluationAmount,
			profitLoss,
			profitRate,
		};
	}, [stockData]);

	const calculate = useCallback(() => {
		const {
			currentQuantity,
			averagePrice,
			currentMarketPrice,
			targetProfitRate,
			additionalQuantity,
			additionalAmount,
		} = stockData;

		// 현재 투자 상태 계산
		const currentInvestment = currentQuantity * averagePrice; // 현재 총 투자금액
		const currentEvaluation = currentQuantity * currentMarketPrice; // 현재 평가금액

		if (mode === 'profitRate') {
			// 목표 수익률을 기준으로 추가 매수 수량 계산 (기존 로직)
			let additionalQuantityCalc = 0;

			if (Math.abs(targetProfitRate) < 0.0001) {
				// 목표 수익률이 0인 경우 (손익분기점)
				const targetEvaluation = currentInvestment;
				const additionalValue = Math.max(0, targetEvaluation - currentEvaluation);
				additionalQuantityCalc = Math.ceil(additionalValue / currentMarketPrice);
			} else {
				// 목표 수익률이 0이 아닌 경우
				const numerator =
					currentInvestment * (1 + targetProfitRate / 100) - currentEvaluation;
				const denominator = currentMarketPrice * (-targetProfitRate / 100);

				if (Math.abs(denominator) > 0.0001) {
					const calculatedQuantity = numerator / denominator;
					additionalQuantityCalc = Math.ceil(Math.max(0, calculatedQuantity));
				}
			}

			// 추가 비용 계산
			const additionalCost = additionalQuantityCalc * currentMarketPrice;

			// 새로운 포지션 계산
			const newTotalQuantity = currentQuantity + additionalQuantityCalc;
			const newAveragePrice = (currentInvestment + additionalCost) / newTotalQuantity;
			const newEvaluation = newTotalQuantity * currentMarketPrice;

			setResult({
				additionalQuantity: additionalQuantityCalc,
				additionalCost,
				newAveragePrice,
				totalValue: newEvaluation,
			});
		} else if (mode === 'quantity') {
			// 추가 매수 수량을 기준으로 목표 수익률 계산
			const additionalQuantityCalc = additionalQuantity || 0;
			const additionalCost = additionalQuantityCalc * currentMarketPrice;

			// 새로운 포지션 계산
			const newTotalQuantity = currentQuantity + additionalQuantityCalc;
			const newAveragePrice = (currentInvestment + additionalCost) / newTotalQuantity;
			const newEvaluation = newTotalQuantity * currentMarketPrice;
			const newInvestment = currentInvestment + additionalCost;
			const calculatedProfitRate =
				newInvestment > 0 ? ((newEvaluation - newInvestment) / newInvestment) * 100 : 0;

			setResult({
				additionalQuantity: additionalQuantityCalc,
				additionalCost,
				newAveragePrice,
				totalValue: newEvaluation,
				calculatedProfitRate,
			});
		} else if (mode === 'amount') {
			// 추가 매수 금액을 기준으로 수량 계산 및 수익률 계산
			const additionalAmountCalc = additionalAmount || 0;
			const additionalQuantityCalc = Math.floor(additionalAmountCalc / currentMarketPrice);
			const additionalCost = additionalQuantityCalc * currentMarketPrice;

			// 새로운 포지션 계산
			const newTotalQuantity = currentQuantity + additionalQuantityCalc;
			const newAveragePrice = (currentInvestment + additionalCost) / newTotalQuantity;
			const newEvaluation = newTotalQuantity * currentMarketPrice;
			const newInvestment = currentInvestment + additionalCost;
			const calculatedProfitRate =
				newInvestment > 0 ? ((newEvaluation - newInvestment) / newInvestment) * 100 : 0;

			setResult({
				additionalQuantity: additionalQuantityCalc,
				additionalCost,
				newAveragePrice,
				totalValue: newEvaluation,
				calculatedProfitRate,
			});
		}
	}, [stockData, mode]);

	// 자동 계산 로직 - stockData나 mode가 변경될 때마다 계산 실행
	useEffect(() => {
		console.log('🔄 Running calculation effect check with data:', stockData);
		if (mode === 'profitRate') {
			if (
				stockData.currentQuantity &&
				stockData.averagePrice &&
				stockData.currentMarketPrice &&
				stockData.targetProfitRate !== undefined
			) {
				console.log('✅ Executing calculate() for profitRate mode');
				calculate();
			}
		} else if (mode === 'quantity') {
			if (
				stockData.currentQuantity &&
				stockData.averagePrice &&
				stockData.currentMarketPrice &&
				stockData.additionalQuantity !== undefined
			) {
				console.log('✅ Executing calculate() for quantity mode');
				calculate();
			} else {
				console.log('❌ Skipping calculate() for quantity mode - missing data:', {
					currentQuantity: stockData.currentQuantity,
					averagePrice: stockData.averagePrice,
					currentMarketPrice: stockData.currentMarketPrice,
					additionalQuantity: stockData.additionalQuantity,
				});
			}
		} else if (mode === 'amount') {
			if (
				stockData.currentQuantity &&
				stockData.averagePrice &&
				stockData.currentMarketPrice &&
				stockData.additionalAmount !== undefined
			) {
				console.log('✅ Executing calculate() for amount mode');
				calculate();
			}
		}
	}, [
		stockData.currentQuantity,
		stockData.averagePrice,
		stockData.currentMarketPrice,
		stockData.targetProfitRate,
		stockData.additionalQuantity,
		stockData.additionalAmount,
		mode,
		calculate,
	]);

	const reset = useCallback(() => {
		setStockData({
			currentQuantity: 0,
			averagePrice: 0,
			currentMarketPrice: 0,
			targetProfitRate: 0,
			additionalQuantity: 0,
			additionalAmount: 0,
		});
		setResult(null);
	}, []);

	const value: StockAveragingCalculatorContextType = {
		stockData,
		result,
		currentAnalysis,
		mode,
		amounts,
		updateStockData,
		setMode,
		calculate,
		reset,
	};

	return (
		<StockAveragingCalculatorContext.Provider value={value}>
			{children}
		</StockAveragingCalculatorContext.Provider>
	);
};
