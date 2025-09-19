'use client';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { PieChart } from 'lucide-react';
import { useAccountInquiry } from './AccountInquiryContainer';
import { useStockAveragingCalculator } from '../stockAveragingCalculator/StockAveragingCalculatorContainer';

export function AccountInquiryPresenter() {
	const {
		accessToken,
		isLoading,
		inquiryDate,
		inquiryResult,
		formattedDate,
		updateInquiryDate,
		executeInquiry,
		reset,
	} = useAccountInquiry();

	const { updateStockData } = useStockAveragingCalculator();

	// 보유 종목 클릭 핸들러
	const handleStockItemClick = (item: {
		stk_nm: string;
		rmnd_qty: string;
		buy_uv: string;
		cur_prc: string;
		prft_rt: string;
	}) => {
		console.log('💫 AccountInquiry handleStockItemClick called with:', item);
		console.log('💫 updateStockData function available:', !!updateStockData);

		// 데이터를 숫자로 변환하고 null 체크를 추가
		const qty = Number(item.rmnd_qty);
		const price = Number(item.buy_uv);
		const marketPrice = Number(item.cur_prc);

		console.log('💫 Converted values:', { qty, price, marketPrice });

		// 데이터 유효성 검증
		if (isNaN(qty) || isNaN(price) || isNaN(marketPrice)) {
			console.error('💫 Invalid data conversion:', { qty, price, marketPrice });
			return;
		}

		const data = {
			currentQuantity: qty, // 보유 수량
			averagePrice: price, // 평균 매수가
			currentMarketPrice: marketPrice, // 현재가
		};

		console.log('💫 Sending data to StockAveragingCalculator:', data);
		try {
			updateStockData(data);
			console.log('💫 updateStockData called successfully');
		} catch (error) {
			console.error('💫 Error calling updateStockData:', error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<PieChart className="mr-2 h-4 w-4" />
					계좌 조회
				</CardTitle>
				<CardDescription>주식 API를 통한 실시간 계좌 정보 조회</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{/* 조회 날짜 입력 필드 */}
					<div className="grid w-full items-center gap-1.5">
						<Label htmlFor="date">조회 날짜 (YYYYMMDD)</Label>
						<Input
							id="date"
							type="text"
							value={inquiryDate}
							onChange={e => updateInquiryDate(e.target.value)}
							placeholder={formattedDate}
							disabled={!accessToken || isLoading}
						/>
						<p className="text-muted-foreground text-xs">
							비워두면 오늘 날짜({formattedDate})로 조회합니다.
						</p>
					</div>

					{/* 조회하기 버튼 */}
					<div className="flex gap-2">
						<Button
							variant="outline"
							className="flex-1"
							onClick={executeInquiry}
							disabled={!accessToken || isLoading}
						>
							{isLoading ? '조회 중...' : '조회하기'}
						</Button>
						<Button variant="ghost" onClick={reset} disabled={isLoading}>
							초기화
						</Button>
					</div>

					{/* 조회 결과 표시 */}
					{inquiryResult.isSuccess && inquiryResult.data ? (
						<div className="mt-4 rounded-md bg-gray-50 p-3">
							<h3 className="font-medium text-green-600">조회 완료</h3>
							<div className="mt-2 space-y-2">
								<div className="grid grid-cols-2 gap-2 text-sm">
									<div className="font-medium">날짜</div>
									<div>{inquiryResult.data.dt}</div>
									<div className="font-medium">총 매수 금액</div>
									<div>
										{Number(inquiryResult.data.tot_buy_amt).toLocaleString()}원
									</div>
									<div className="font-medium">총 평가 금액</div>
									<div>
										{Number(inquiryResult.data.tot_evlt_amt).toLocaleString()}원
									</div>
									<div className="font-medium">총 평가 손익</div>
									<div
										className={`${Number(inquiryResult.data.tot_evltv_prft) >= 0 ? 'text-red-500' : 'text-blue-500'}`}
									>
										{Number(inquiryResult.data.tot_evltv_prft).toLocaleString()}
										원
									</div>
									<div className="font-medium">총 수익률</div>
									<div
										className={`${Number(inquiryResult.data.tot_prft_rt) >= 0 ? 'text-red-500' : 'text-blue-500'}`}
									>
										{inquiryResult.data.tot_prft_rt}%
									</div>
								</div>

								{/* 종목별 정보 표시 */}
								{inquiryResult.data.day_bal_rt &&
									inquiryResult.data.day_bal_rt.length > 0 && (
										<div className="mt-3">
											<h4 className="mb-1 text-sm font-medium">
												보유 종목 ({inquiryResult.data.day_bal_rt.length})
											</h4>
											<p className="text-muted-foreground mb-2 text-xs">
												💡 종목을 클릭하면 물타기 계산기에 데이터가 자동으로
												입력됩니다
											</p>
											<div className="max-h-60 overflow-auto">
												<Table>
													<TableHeader>
														<TableRow>
															<TableHead>종목명</TableHead>
															<TableHead className="text-right">
																수량
															</TableHead>
															<TableHead className="text-right">
																매수가
															</TableHead>
															<TableHead className="text-right">
																현재가
															</TableHead>
															<TableHead className="text-right">
																수익률
															</TableHead>
														</TableRow>
													</TableHeader>
													<TableBody>
														{inquiryResult.data.day_bal_rt.map(
															(item, index) => (
																<TableRow
																	key={index}
																	className="cursor-pointer transition-colors hover:bg-gray-50"
																	onClick={() =>
																		handleStockItemClick(item)
																	}
																>
																	<TableCell className="font-medium">
																		{item.stk_nm}
																	</TableCell>
																	<TableCell className="text-right">
																		{Number(
																			item.rmnd_qty,
																		).toLocaleString()}
																	</TableCell>
																	<TableCell className="text-right">
																		{Number(
																			item.buy_uv,
																		).toLocaleString()}
																	</TableCell>
																	<TableCell className="text-right">
																		{Number(
																			item.cur_prc,
																		).toLocaleString()}
																	</TableCell>
																	<TableCell
																		className={`text-right font-medium ${Number(item.prft_rt) >= 0 ? 'text-red-500' : 'text-blue-500'}`}
																	>
																		{item.prft_rt}%
																	</TableCell>
																</TableRow>
															),
														)}
													</TableBody>
												</Table>
											</div>
										</div>
									)}
							</div>
						</div>
					) : inquiryResult.errorMessage ? (
						<div className="mt-4 rounded-md bg-red-50 p-3">
							<h3 className="font-medium text-red-600">조회 오류</h3>
							<p className="mt-1 text-sm text-red-800">
								{inquiryResult.errorMessage}
							</p>
						</div>
					) : null}
				</div>
			</CardContent>
		</Card>
	);
}
