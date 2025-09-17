'use client';

import { ChangeEvent, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Badge } from '@/shared/ui/badge';
import { useFibonacciPurchaseStrategy } from './FibonacciPurchaseStrategyContainer';

interface PurchaseStep {
	step: number;
	amount: number;
	percentage: number;
	description: string;
}

interface SavedStrategy {
	id: string;
	name: string;
	strategyData: {
		totalBudget: number;
		steps: number;
	};
	result: {
		steps: PurchaseStep[];
		totalSteps: number;
		totalAmount: number;
	};
	createdAt: string;
}

export const FibonacciPurchaseStrategyPresenter = () => {
	const {
		strategyData,
		result,
		savedStrategies,
		updateStrategyData,
		calculateStrategy,
		reset,
		saveStrategy,
		deleteStrategy,
		loadSavedStrategy,
	} = useFibonacciPurchaseStrategy();

	const [strategyName, setStrategyName] = useState('');

	const handleInputChange = (field: keyof typeof strategyData, value: string) => {
		const numValue = parseFloat(value) || 0;
		updateStrategyData({ [field]: numValue });
	};

	const handleChange =
		(field: keyof typeof strategyData) => (e: ChangeEvent<HTMLInputElement>) => {
			handleInputChange(field, e.target.value);
		};

	const handleSaveStrategy = () => {
		if (!result) return;
		const name = strategyName.trim() || `전략 ${savedStrategies.length + 1}`;
		saveStrategy(name);
		setStrategyName('');
	};

	const handleLoadStrategy = (strategy: SavedStrategy) => {
		loadSavedStrategy(strategy);
		setStrategyName('');
	};

	const handleDeleteStrategy = (id: string) => {
		if (confirm('정말로 이 전략을 삭제하시겠습니까?')) {
			deleteStrategy(id);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					📈 피보나치 수열 매수 전략
				</CardTitle>
				<CardDescription>
					총 매수 예산을 피보나치 수열 비율로 분할하여 최적의 단계별 매수 전략을
					제시합니다.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* 입력 섹션 */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<Label className="mb-2" htmlFor="totalBudget">
							총 매수 예산 (만원)
						</Label>
						<Input
							id="totalBudget"
							type="number"
							step="10"
							min="0"
							value={strategyData.totalBudget || ''}
							onChange={handleChange('totalBudget')}
							placeholder="예: 1000"
							className="text-lg"
						/>
						<p className="mt-1 text-sm text-gray-500">
							피보나치 수열을 이용하여 총 예산을 여러 단계로 분할합니다.
						</p>
					</div>
					<div>
						<Label className="mb-2" htmlFor="steps">
							분할 매수
						</Label>
						<Input
							id="steps"
							type="number"
							step="1"
							min="1"
							max="20"
							value={strategyData.steps || ''}
							onChange={handleChange('steps')}
							placeholder="예: 5"
							className="text-lg"
						/>
						<p className="mt-1 text-sm text-gray-500">
							몇 단계로 분할 할지 설정하세요. (1-20단계)
						</p>
					</div>
				</div>

				{/* 계산 결과 */}
				{result && (
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<h4 className="text-xl font-semibold text-blue-700">
								🎯 매수 전략 결과
							</h4>
							<Badge variant="secondary" className="text-sm">
								총 {result.totalSteps}단계
							</Badge>
						</div>

						{/* 전략 요약 */}
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							<div className="rounded-lg bg-blue-50 p-4">
								<div className="text-sm text-blue-600">총 매수 예산</div>
								<div className="text-2xl font-bold text-blue-700">
									{result.totalAmount.toLocaleString('ko-KR')}만원
								</div>
							</div>
							<div className="rounded-lg bg-green-50 p-4">
								<div className="text-sm text-green-600">매수 단계</div>
								<div className="text-2xl font-bold text-green-700">
									{result.totalSteps}단계
								</div>
							</div>
							<div className="rounded-lg bg-purple-50 p-4">
								<div className="text-sm text-purple-600">평균 투자 비율</div>
								<div className="text-2xl font-bold text-purple-700">
									{Math.round((100 / result.totalSteps) * 100) / 100}%
								</div>
							</div>
						</div>

						{/* 단계별 매수 계획 */}
						<div className="space-y-4">
							<h5 className="text-lg font-semibold text-gray-700">
								📋 단계별 매수 계획
							</h5>
							<div className="space-y-3">
								{result.steps.map((step: PurchaseStep, index: number) => (
									<div
										key={index}
										className="flex items-center justify-between rounded-lg border bg-white p-4 transition-colors hover:bg-gray-50"
									>
										<div className="flex items-center gap-4">
											<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
												{step.step}
											</div>
											<div>
												<div className="font-medium text-gray-900">
													{step.step}차 매수
												</div>
												<div className="text-sm text-gray-500">
													{step.description}
												</div>
											</div>
										</div>
										<div className="text-right">
											<div className="text-lg font-bold text-gray-900">
												{step.amount.toLocaleString('ko-KR')}만원
											</div>
											<div className="text-sm text-gray-600">
												({step.percentage.toFixed(1)}%)
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* 피보나치 수열 설명 */}
						<div className="rounded-lg bg-yellow-50 p-4">
							<h6 className="mb-2 text-sm font-semibold text-yellow-800">
								ℹ️ 피보나치 수열 전략 설명
							</h6>
							<ul className="space-y-1 text-sm text-yellow-700">
								<li>
									• 피보나치 수열(1, 1, 2, 3, 5, 8, 13, 21, ...)의 비율을 활용
								</li>
								<li>• 가격이 하락할 때마다 더 많은 금액을 투자하는 전략</li>
								<li>• 리스크를 분산하면서도 하락장에서 더 많은 기회를 확보</li>
								<li>• 자연스러운 성장 패턴을 따르는 투자 방식</li>
							</ul>
						</div>
					</div>
				)}

				{/* 액션 버튼 */}
				<div className="flex gap-2 border-t pt-4">
					<Button onClick={reset} variant="outline">
						초기화
					</Button>
					<Button
						onClick={calculateStrategy}
						disabled={
							!strategyData.totalBudget ||
							strategyData.totalBudget <= 0 ||
							!strategyData.steps ||
							strategyData.steps <= 0
						}
					>
						계산하기
					</Button>
					{result && (
						<div className="ml-auto flex gap-2">
							<Input
								type="text"
								placeholder="전략 이름"
								value={strategyName}
								onChange={e => setStrategyName(e.target.value)}
								className="w-32"
							/>
							<Button onClick={handleSaveStrategy} variant="default">
								💾 저장
							</Button>
						</div>
					)}
				</div>

				{/* 저장된 전략 리스트 */}
				{savedStrategies.length > 0 && (
					<div className="space-y-4 border-t pt-6">
						<h4 className="text-lg font-semibold text-gray-700">📂 저장된 전략 목록</h4>
						<div className="space-y-3">
							{savedStrategies.map(strategy => (
								<div
									key={strategy.id}
									className="flex items-center justify-between rounded-lg border bg-gray-50 p-4"
								>
									<div className="flex-1">
										<div className="font-medium text-gray-900">
											{strategy.name}
										</div>
										<div className="text-sm text-gray-500">
											{strategy.result.totalAmount.toLocaleString('ko-KR')}
											만원 • {strategy.result.totalSteps}단계 •{' '}
											{new Date(strategy.createdAt).toLocaleDateString(
												'ko-KR',
											)}
										</div>
									</div>
									<div className="flex gap-2">
										<Button
											onClick={() => handleLoadStrategy(strategy)}
											variant="outline"
											size="sm"
										>
											불러오기
										</Button>
										<Button
											onClick={() => handleDeleteStrategy(strategy.id)}
											variant="outline"
											size="sm"
											className="text-red-600 hover:text-red-700"
										>
											삭제
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
