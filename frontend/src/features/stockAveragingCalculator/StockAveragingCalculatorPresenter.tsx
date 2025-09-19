'use client';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { ChangeEvent, useEffect } from 'react';
import { useStockAveragingCalculator } from './StockAveragingCalculatorContainer';

export const StockAveragingCalculatorPresenter = () => {
	const { stockData, result, currentAnalysis, mode, updateStockData, setMode, amounts, reset } =
		useStockAveragingCalculator();

	console.log('🚀 ~ StockAveragingCalculatorPresenter rendered with stockData:', stockData);

	// 데이터가 변경될 때 추적하기 위한 useEffect 추가
	useEffect(() => {
		console.log('🔄 stockData changed in StockAveragingCalculatorPresenter:', stockData);
	}, [stockData]);

	const handleInputChange = (field: keyof typeof stockData, value: string) => {
		const numValue = parseFloat(value) || 0;
		updateStockData({ [field]: numValue });
	};

	const handleChange = (field: keyof typeof stockData) => (e: ChangeEvent<HTMLInputElement>) => {
		handleInputChange(field, e.target.value);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>주식 물타기 계산기</CardTitle>
				<CardDescription>
					현재 보유 주식 정보와 목표 수익률을 입력하면 최적의 물타기 전략을
					계산해드립니다.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* 모드 선택 */}
				<div className="flex space-x-2">
					<Button
						variant={mode === 'quantity' ? 'default' : 'outline'}
						onClick={() => setMode('quantity')}
						className="flex-1"
					>
						추가 매수 수량 기준
					</Button>
					<Button
						variant={mode === 'amount' ? 'default' : 'outline'}
						onClick={() => setMode('amount')}
						className="flex-1"
					>
						추가 매수 금액 기준
					</Button>
					<Button
						variant={mode === 'profitRate' ? 'default' : 'outline'}
						onClick={() => setMode('profitRate')}
						className="flex-1"
					>
						목표 수익률 기준
					</Button>
				</div>

				{/* 입력 섹션 */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<Label className="mb-2" htmlFor="currentMarketPrice">
							현재 시장가 (원)
						</Label>
						<Input
							id="currentMarketPrice"
							type="number"
							step="1"
							min="0"
							value={stockData.currentMarketPrice || ''}
							onChange={handleChange('currentMarketPrice')}
							placeholder="예: 45000"
						/>
					</div>
					<div>
						<Label className="mb-2" htmlFor="currentQuantity">
							보유 수량
						</Label>
						<Input
							id="currentQuantity"
							type="number"
							step="1"
							min="1"
							value={stockData.currentQuantity || ''}
							onChange={handleChange('currentQuantity')}
							placeholder="예: 100"
						/>
					</div>
					<div>
						<Label className="mb-2" htmlFor="averagePrice">
							평균단가 (원)
						</Label>
						<Input
							id="averagePrice"
							type="number"
							step="1"
							min="0"
							value={stockData.averagePrice || ''}
							onChange={handleChange('averagePrice')}
							placeholder="예: 50000"
						/>
					</div>

					{mode === 'profitRate' && (
						<div>
							<Label className="mb-2" htmlFor="targetProfitRate">
								목표 수익률 (%)
							</Label>
							<Input
								id="targetProfitRate"
								type="number"
								step="0.1"
								min="-100"
								value={stockData.targetProfitRate || ''}
								onChange={handleChange('targetProfitRate')}
								placeholder="예: 10 또는 -0.5"
							/>
						</div>
					)}

					{mode === 'quantity' && (
						<div>
							<Label className="mb-2" htmlFor="additionalQuantity">
								추가 매수 수량
							</Label>
							<Input
								id="additionalQuantity"
								type="number"
								step="1"
								min="0"
								value={stockData.additionalQuantity || ''}
								onChange={handleChange('additionalQuantity')}
								placeholder="예: 50"
							/>
						</div>
					)}

					{mode === 'amount' && (
						<div>
							<Label className="mb-2" htmlFor="additionalAmount">
								추가 매수 금액 (원)
							</Label>
							<Input
								id="additionalAmount"
								type="number"
								step="1000"
								min="0"
								value={stockData.additionalAmount || ''}
								onChange={handleChange('additionalAmount')}
								placeholder="예: 100000"
							/>
							{/* 금액 단위 추가 버튼들 */}
							<div className="mt-2 flex flex-wrap gap-2">
								{amounts.map(amount => (
									<Button
										key={amount.value}
										type="button"
										variant="outline"
										size="sm"
										onClick={() => {
											const currentAmount = stockData.additionalAmount || 0;
											handleInputChange(
												'additionalAmount',
												(currentAmount + amount.value).toString(),
											);
										}}
										className="text-xs"
									>
										+{amount.label}
									</Button>
								))}
							</div>
						</div>
					)}
				</div>

				{/* 현재 보유 주식 분석 */}
				{currentAnalysis && (
					<div className="space-y-2 rounded-lg bg-blue-50 p-4">
						<h4 className="text-sm font-semibold text-blue-700">
							📊 현재 보유 주식 분석
						</h4>
						<div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
							<div>
								<span className="text-blue-600">수익률:</span>
								<span
									className={`ml-2 font-semibold ${currentAnalysis.profitRate >= 0 ? 'text-green-600' : 'text-red-600'}`}
								>
									{typeof currentAnalysis.profitRate === 'number' &&
									!isNaN(currentAnalysis.profitRate)
										? currentAnalysis.profitRate.toFixed(2)
										: '0'}
									%
								</span>
							</div>
							<div>
								<span className="text-blue-600">평가금액:</span>
								<span className="ml-2 font-semibold">
									{Math.round(currentAnalysis.evaluationAmount).toLocaleString()}
									원
								</span>
							</div>
							<div>
								<span className="text-blue-600">매입금액:</span>
								<span className="ml-2 font-semibold">
									{Math.round(currentAnalysis.investmentAmount).toLocaleString()}
									원
								</span>
							</div>
							<div>
								<span className="text-blue-600">손익:</span>
								<span
									className={`ml-2 font-semibold ${currentAnalysis.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}
								>
									{currentAnalysis.profitLoss >= 0 ? '+' : ''}
									{Math.round(currentAnalysis.profitLoss).toLocaleString()}원
								</span>
							</div>
						</div>
					</div>
				)}

				{/* 물타기 계산 결과 */}
				{result && currentAnalysis && (
					<div
						className={`space-y-2 rounded-lg p-4 ${
							mode === 'profitRate'
								? stockData.targetProfitRate > currentAnalysis.profitRate
									? 'bg-green-50'
									: stockData.targetProfitRate < currentAnalysis.profitRate
										? 'bg-orange-50'
										: 'bg-blue-50'
								: result.calculatedProfitRate !== undefined
									? result.calculatedProfitRate > 0
										? 'bg-green-50'
										: result.calculatedProfitRate < 0
											? 'bg-red-50'
											: 'bg-blue-50'
									: 'bg-blue-50'
						}`}
					>
						<h4
							className={`text-sm font-semibold ${
								mode === 'profitRate'
									? stockData.targetProfitRate > currentAnalysis.profitRate
										? 'text-green-700'
										: stockData.targetProfitRate < currentAnalysis.profitRate
											? 'text-orange-700'
											: 'text-blue-700'
									: result.calculatedProfitRate !== undefined
										? result.calculatedProfitRate > 0
											? 'text-green-700'
											: result.calculatedProfitRate < 0
												? 'text-red-700'
												: 'text-blue-700'
										: 'text-blue-700'
							}`}
						>
							🎯 물타기 계산 결과
							{mode === 'profitRate' &&
								stockData.targetProfitRate > currentAnalysis.profitRate &&
								' (추천)'}
							{mode === 'profitRate' &&
								stockData.targetProfitRate < currentAnalysis.profitRate &&
								' (주의)'}
							{mode === 'profitRate' &&
								stockData.targetProfitRate === currentAnalysis.profitRate &&
								' (불필요)'}
							{mode === 'quantity' &&
								result.calculatedProfitRate !== undefined &&
								result.calculatedProfitRate > 0 &&
								' (수익)'}
							{mode === 'quantity' &&
								result.calculatedProfitRate !== undefined &&
								result.calculatedProfitRate < 0 &&
								' (손실)'}
							{mode === 'quantity' &&
								result.calculatedProfitRate !== undefined &&
								result.calculatedProfitRate === 0 &&
								' (손익분기)'}
							{mode === 'amount' &&
								result.calculatedProfitRate !== undefined &&
								result.calculatedProfitRate > 0 &&
								' (수익)'}
							{mode === 'amount' &&
								result.calculatedProfitRate !== undefined &&
								result.calculatedProfitRate < 0 &&
								' (손실)'}
							{mode === 'amount' &&
								result.calculatedProfitRate !== undefined &&
								result.calculatedProfitRate === 0 &&
								' (손익분기)'}
						</h4>

						{/* 수익률 비교 표시 */}
						{mode === 'profitRate' && (
							<div className="mb-3 rounded bg-white p-2 text-xs">
								<span className="text-gray-600">현재 수익률:</span>
								<span
									className={`ml-1 font-semibold ${currentAnalysis.profitRate >= 0 ? 'text-green-600' : 'text-red-600'}`}
								>
									{currentAnalysis.profitRate.toFixed(2)}%
								</span>
								<span className="mx-2 text-gray-400">→</span>
								<span className="text-gray-600">목표 수익률:</span>
								<span
									className={`ml-1 font-semibold ${stockData.targetProfitRate >= 0 ? 'text-green-600' : 'text-red-600'}`}
								>
									{stockData.targetProfitRate.toFixed(2)}%
								</span>
							</div>
						)}

						{mode === 'quantity' && result.calculatedProfitRate !== undefined && (
							<div className="mb-3 rounded bg-white p-2 text-xs">
								<span className="text-gray-600">현재 수익률:</span>
								<span
									className={`ml-1 font-semibold ${currentAnalysis.profitRate >= 0 ? 'text-green-600' : 'text-red-600'}`}
								>
									{currentAnalysis.profitRate.toFixed(2)}%
								</span>
								<span className="mx-2 text-gray-400">→</span>
								<span className="text-gray-600">계산된 수익률:</span>
								<span
									className={`ml-1 font-semibold ${result.calculatedProfitRate >= 0 ? 'text-green-600' : 'text-red-600'}`}
								>
									{result.calculatedProfitRate.toFixed(2)}%
								</span>
							</div>
						)}

						{mode === 'amount' && result.calculatedProfitRate !== undefined && (
							<div className="mb-3 rounded bg-white p-2 text-xs">
								<span className="text-gray-600">현재 수익률:</span>
								<span
									className={`ml-1 font-semibold ${currentAnalysis.profitRate >= 0 ? 'text-green-600' : 'text-red-600'}`}
								>
									{currentAnalysis.profitRate.toFixed(2)}%
								</span>
								<span className="mx-2 text-gray-400">→</span>
								<span className="text-gray-600">계산된 수익률:</span>
								<span
									className={`ml-1 font-semibold ${result.calculatedProfitRate >= 0 ? 'text-green-600' : 'text-red-600'}`}
								>
									{result.calculatedProfitRate.toFixed(2)}%
								</span>
							</div>
						)}

						<div className="grid grid-cols-2 gap-4 text-sm">
							<div>
								<span
									className={`${
										mode === 'profitRate'
											? stockData.targetProfitRate >
												currentAnalysis.profitRate
												? 'text-green-600'
												: stockData.targetProfitRate <
													  currentAnalysis.profitRate
													? 'text-orange-600'
													: 'text-blue-600'
											: result.calculatedProfitRate !== undefined
												? result.calculatedProfitRate > 0
													? 'text-green-600'
													: result.calculatedProfitRate < 0
														? 'text-red-600'
														: 'text-blue-600'
												: 'text-blue-600'
									}`}
								>
									추가 매수 수량:
								</span>
								<span
									className={`ml-2 font-semibold ${
										mode === 'profitRate'
											? stockData.targetProfitRate >
												currentAnalysis.profitRate
												? 'text-green-700'
												: stockData.targetProfitRate <
													  currentAnalysis.profitRate
													? 'text-orange-700'
													: 'text-blue-700'
											: result.calculatedProfitRate !== undefined
												? result.calculatedProfitRate > 0
													? 'text-green-700'
													: result.calculatedProfitRate < 0
														? 'text-red-700'
														: 'text-blue-700'
												: 'text-blue-700'
									}`}
								>
									{result.additionalQuantity.toLocaleString()} 주
								</span>
							</div>
							<div>
								<span
									className={`${
										mode === 'profitRate'
											? stockData.targetProfitRate >
												currentAnalysis.profitRate
												? 'text-green-600'
												: stockData.targetProfitRate <
													  currentAnalysis.profitRate
													? 'text-orange-600'
													: 'text-blue-600'
											: result.calculatedProfitRate !== undefined
												? result.calculatedProfitRate > 0
													? 'text-green-600'
													: result.calculatedProfitRate < 0
														? 'text-red-600'
														: 'text-blue-600'
												: 'text-blue-600'
									}`}
								>
									추가 매수 비용:
								</span>
								<span
									className={`ml-2 font-semibold ${
										mode === 'profitRate'
											? stockData.targetProfitRate >
												currentAnalysis.profitRate
												? 'text-green-700'
												: stockData.targetProfitRate <
													  currentAnalysis.profitRate
													? 'text-orange-700'
													: 'text-blue-700'
											: result.calculatedProfitRate !== undefined
												? result.calculatedProfitRate > 0
													? 'text-green-700'
													: result.calculatedProfitRate < 0
														? 'text-red-700'
														: 'text-blue-700'
												: 'text-blue-700'
									}`}
								>
									{Math.round(result.additionalCost).toLocaleString()} 원
								</span>
							</div>
							<div>
								<span
									className={`${
										mode === 'profitRate'
											? stockData.targetProfitRate >
												currentAnalysis.profitRate
												? 'text-green-600'
												: stockData.targetProfitRate <
													  currentAnalysis.profitRate
													? 'text-orange-600'
													: 'text-blue-600'
											: result.calculatedProfitRate !== undefined
												? result.calculatedProfitRate > 0
													? 'text-green-600'
													: result.calculatedProfitRate < 0
														? 'text-red-600'
														: 'text-blue-600'
												: 'text-blue-600'
									}`}
								>
									새로운 평균단가:
								</span>
								<span
									className={`ml-2 font-semibold ${
										mode === 'profitRate'
											? stockData.targetProfitRate >
												currentAnalysis.profitRate
												? 'text-green-700'
												: stockData.targetProfitRate <
													  currentAnalysis.profitRate
													? 'text-orange-700'
													: 'text-blue-700'
											: result.calculatedProfitRate !== undefined
												? result.calculatedProfitRate > 0
													? 'text-green-700'
													: result.calculatedProfitRate < 0
														? 'text-red-700'
														: 'text-blue-700'
												: 'text-blue-700'
									}`}
								>
									{result.newAveragePrice.toLocaleString()} 원
								</span>
							</div>
							<div>
								<span
									className={`${
										mode === 'profitRate'
											? stockData.targetProfitRate >
												currentAnalysis.profitRate
												? 'text-green-600'
												: stockData.targetProfitRate <
													  currentAnalysis.profitRate
													? 'text-orange-600'
													: 'text-blue-600'
											: result.calculatedProfitRate !== undefined
												? result.calculatedProfitRate > 0
													? 'text-green-600'
													: result.calculatedProfitRate < 0
														? 'text-red-600'
														: 'text-blue-600'
												: 'text-blue-600'
									}`}
								>
									목표 총 가치:
								</span>
								<span
									className={`ml-2 font-semibold ${
										mode === 'profitRate'
											? stockData.targetProfitRate >
												currentAnalysis.profitRate
												? 'text-green-700'
												: stockData.targetProfitRate <
													  currentAnalysis.profitRate
													? 'text-orange-700'
													: 'text-blue-700'
											: result.calculatedProfitRate !== undefined
												? result.calculatedProfitRate > 0
													? 'text-green-700'
													: result.calculatedProfitRate < 0
														? 'text-red-700'
														: 'text-blue-700'
												: 'text-blue-700'
									}`}
								>
									{result.totalValue.toLocaleString()} 원
								</span>
							</div>
						</div>

						{/* 조언 메시지 */}
						{mode === 'profitRate' &&
							stockData.targetProfitRate < currentAnalysis.profitRate && (
								<div className="mt-3 rounded bg-orange-100 p-2 text-xs text-orange-800">
									⚠️ 목표 수익률이 현재 수익률보다 낮습니다. 물타기로 손실이
									확대될 수 있습니다.
								</div>
							)}
						{mode === 'profitRate' &&
							stockData.targetProfitRate === currentAnalysis.profitRate && (
								<div className="mt-3 rounded bg-blue-100 p-2 text-xs text-blue-800">
									ℹ️ 목표 수익률이 현재 수익률과 같습니다. 추가 매수가
									불필요합니다.
								</div>
							)}
						{mode === 'quantity' &&
							result.calculatedProfitRate !== undefined &&
							result.calculatedProfitRate < 0 && (
								<div className="mt-3 rounded bg-red-100 p-2 text-xs text-red-800">
									⚠️ 추가 매수 후 예상 수익률이 음수입니다. 손실이 예상됩니다.
								</div>
							)}
						{mode === 'quantity' &&
							result.calculatedProfitRate !== undefined &&
							result.calculatedProfitRate === 0 && (
								<div className="mt-3 rounded bg-blue-100 p-2 text-xs text-blue-800">
									ℹ️ 추가 매수 후 손익분기점입니다.
								</div>
							)}
					</div>
				)}

				{/* 초기화 버튼 */}
				<div className="flex justify-center">
					<Button onClick={reset} variant="outline">
						초기화
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
