'use client';

import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback,
	useEffect,
} from 'react';

/**
 *비즈니스 로직 Container에, UI 렌더링은 Presenter에 위치하여 패턴이 항상 올바르게 유지되어야 한다.
 */

interface PurchaseStrategyData {
	totalBudget: number; // 만원 단위
	steps: number; // 분할 단계 수
}

interface PurchaseStep {
	step: number;
	amount: number; // 만원 단위
	percentage: number; // 백분율
	description: string;
}

interface FibonacciPurchaseResult {
	steps: PurchaseStep[];
	totalSteps: number;
	totalAmount: number;
}

interface SavedStrategy {
	id: string;
	name: string;
	strategyData: PurchaseStrategyData;
	result: FibonacciPurchaseResult;
	createdAt: string;
}

interface FibonacciPurchaseStrategyContextType {
	strategyData: PurchaseStrategyData;
	result: FibonacciPurchaseResult | null;
	savedStrategies: SavedStrategy[];
	updateStrategyData: (data: Partial<PurchaseStrategyData>) => void;
	calculateStrategy: () => void;
	reset: () => void;
	saveStrategy: (name: string) => void;
	deleteStrategy: (id: string) => void;
	loadSavedStrategy: (strategy: SavedStrategy) => void;
}

const FibonacciPurchaseStrategyContext = createContext<
	FibonacciPurchaseStrategyContextType | undefined
>(undefined);

export const useFibonacciPurchaseStrategy = () => {
	const context = useContext(FibonacciPurchaseStrategyContext);
	if (!context) {
		throw new Error(
			'useFibonacciPurchaseStrategy must be used within FibonacciPurchaseStrategyProvider',
		);
	}
	return context;
};

// 피보나치 수열 생성 함수 (단계 수만큼)
const generateFibonacciSequenceBySteps = (steps: number): number[] => {
	if (steps <= 0) return [];
	if (steps === 1) return [1];
	if (steps === 2) return [1, 1];

	const sequence: number[] = [1, 1];

	while (sequence.length < steps) {
		const next = sequence[sequence.length - 1] + sequence[sequence.length - 2];
		sequence.push(next);
	}

	return sequence;
};

// 피보나치 수열을 이용한 분할 전략 계산
const calculateFibonacciStrategy = (totalBudget: number, numSteps: number): PurchaseStep[] => {
	// 지정된 단계 수만큼 피보나치 수열 생성
	const fibSequence = generateFibonacciSequenceBySteps(numSteps);

	// 피보나치 수열을 순서대로 사용하여 작은 금액부터 시작
	const orderedFib = [...fibSequence];

	// 총합 계산
	const totalFibSum = orderedFib.reduce((sum, num) => sum + num, 0);

	// 각 단계의 금액과 백분율 계산
	const purchaseSteps: PurchaseStep[] = [];
	let cumulativeAmount = 0;

	for (let i = 0; i < orderedFib.length; i++) {
		const fibValue = orderedFib[i];
		const amount = (fibValue / totalFibSum) * totalBudget;

		cumulativeAmount += amount;

		// 마지막 단계에서 남은 금액을 조정
		const adjustedAmount =
			i === orderedFib.length - 1 ? totalBudget - (cumulativeAmount - amount) : amount;

		const adjustedPercentage = (adjustedAmount / totalBudget) * 100;

		purchaseSteps.push({
			step: i + 1,
			amount: Math.round(adjustedAmount * 100) / 100, // 소수점 2자리까지
			percentage: Math.round(adjustedPercentage * 100) / 100,
			description: `${i + 1}차 매수: ${Math.round(adjustedAmount * 100) / 100}만원 (${Math.round(adjustedPercentage * 100) / 100}%)`,
		});
	}

	return purchaseSteps;
};

interface FibonacciPurchaseStrategyProviderProps {
	children: ReactNode;
}

export const FibonacciPurchaseStrategyProvider = ({
	children,
}: FibonacciPurchaseStrategyProviderProps) => {
	const [strategyData, setStrategyData] = useState<PurchaseStrategyData>({
		totalBudget: 0,
		steps: 5, // 기본 5단계
	});
	const [result, setResult] = useState<FibonacciPurchaseResult | null>(null);
	const [savedStrategies, setSavedStrategies] = useState<SavedStrategy[]>([]);

	// 로컬 스토리지에서 저장된 전략들 로드
	useEffect(() => {
		const saved = localStorage.getItem('fibonacciStrategies');
		if (saved) {
			try {
				setSavedStrategies(JSON.parse(saved));
			} catch (error) {
				console.error('Failed to load saved strategies:', error);
			}
		}
	}, []);

	// 저장된 전략들을 로컬 스토리지에 저장
	const saveStrategiesToStorage = useCallback((strategies: SavedStrategy[]) => {
		localStorage.setItem('fibonacciStrategies', JSON.stringify(strategies));
	}, []);

	const updateStrategyData = useCallback((data: Partial<PurchaseStrategyData>) => {
		setStrategyData(prev => ({ ...prev, ...data }));
	}, []);

	const calculateStrategy = useCallback(() => {
		const { totalBudget, steps } = strategyData;

		if (!totalBudget || totalBudget <= 0 || !steps || steps <= 0) {
			setResult(null);
			return;
		}

		const purchaseSteps = calculateFibonacciStrategy(totalBudget, steps);

		const strategyResult: FibonacciPurchaseResult = {
			steps: purchaseSteps,
			totalSteps: purchaseSteps.length,
			totalAmount: totalBudget,
		};

		setResult(strategyResult);
	}, [strategyData]);

	// 자동 계산 로직 - strategyData가 변경될 때마다 계산 실행
	useEffect(() => {
		if (
			strategyData.totalBudget &&
			strategyData.totalBudget > 0 &&
			strategyData.steps &&
			strategyData.steps > 0
		) {
			calculateStrategy();
		}
	}, [strategyData.totalBudget, strategyData.steps, calculateStrategy]);

	const reset = useCallback(() => {
		setStrategyData({
			totalBudget: 0,
			steps: 5,
		});
		setResult(null);
	}, []);

	// 전략 저장 함수
	const saveStrategy = useCallback(
		(name: string) => {
			if (!result) return;

			const newStrategy: SavedStrategy = {
				id: Date.now().toString(),
				name: name || `전략 ${savedStrategies.length + 1}`,
				strategyData: { ...strategyData },
				result: { ...result },
				createdAt: new Date().toISOString(),
			};

			const updatedStrategies = [...savedStrategies, newStrategy];
			setSavedStrategies(updatedStrategies);
			saveStrategiesToStorage(updatedStrategies);
		},
		[result, strategyData, savedStrategies, saveStrategiesToStorage],
	);

	// 전략 삭제 함수
	const deleteStrategy = useCallback(
		(id: string) => {
			const updatedStrategies = savedStrategies.filter(strategy => strategy.id !== id);
			setSavedStrategies(updatedStrategies);
			saveStrategiesToStorage(updatedStrategies);
		},
		[savedStrategies, saveStrategiesToStorage],
	);

	// 저장된 전략 로드 함수
	const loadSavedStrategy = useCallback((strategy: SavedStrategy) => {
		setStrategyData({ ...strategy.strategyData });
		setResult({ ...strategy.result });
	}, []);

	const value: FibonacciPurchaseStrategyContextType = {
		strategyData,
		result,
		savedStrategies,
		updateStrategyData,
		calculateStrategy,
		reset,
		saveStrategy,
		deleteStrategy,
		loadSavedStrategy,
	};

	return (
		<FibonacciPurchaseStrategyContext.Provider value={value}>
			{children}
		</FibonacciPurchaseStrategyContext.Provider>
	);
};
