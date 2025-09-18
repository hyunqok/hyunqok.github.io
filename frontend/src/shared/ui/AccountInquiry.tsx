'use client';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { PieChart } from 'lucide-react';
import { useStockAuth } from '../lib/context/StockAuthContext';
import { fn_ka01690, Ka01690OutputData } from '../api/stock/auth';
import { useState } from 'react';

// 응답 처리를 위한 타입 정의
interface InquiryState {
	isSuccess: boolean;
	data: Ka01690OutputData | null;
	errorMessage: string | null;
}

export function AccountInquiry() {
	const { accessToken } = useStockAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [inquiryDate, setInquiryDate] = useState('');
	const [inquiryResult, setInquiryResult] = useState<InquiryState>({
		isSuccess: false,
		data: null,
		errorMessage: null,
	});

	// 오늘 날짜를 YYYYMMDD 형식으로 가져오기
	const today = new Date();
	const formattedDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;

	// 계좌 조회 핸들러 함수
	const handleInquiry = async () => {
		if (!accessToken) {
			console.error('❌ 인증 토큰이 없습니다.');
			return;
		}

		const dateToUse = inquiryDate || formattedDate;

		setIsLoading(true);
		try {
			console.log('🔍 계좌 조회를 시작합니다...');
			// API 문서에 맞는 요청 데이터 구성
			const requestData = {
				qry_dt: dateToUse, // YYYYMMDD 형식의 조회일자 (필수)
			};

			// fn_ka01690 함수 호출 (일별잔고수익률 조회)
			const response = await fn_ka01690(accessToken, requestData);

			if (response?.return_code === 0) {
				console.log('🚀 ~ response:', response);
				setInquiryResult({
					isSuccess: true,
					data: response || null,
					errorMessage: null,
				});
			} else {
			}
		} catch (error) {
			// 예외 발생 케이스
			const errorMsg = error instanceof Error ? error.message : '알 수 없는 오류';
			console.error('❌ 계좌 조회 중 오류 발생:', errorMsg);
			setInquiryResult({
				isSuccess: false,
				data: null,
				errorMessage: errorMsg,
			});
		} finally {
			setIsLoading(false);
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
						<label htmlFor="date" className="text-sm font-medium">
							조회 날짜 (YYYYMMDD)
						</label>
						<input
							id="date"
							className="w-full rounded-md border border-gray-300 p-2 text-sm"
							value={inquiryDate}
							onChange={e => setInquiryDate(e.target.value)}
							placeholder={formattedDate}
							disabled={!accessToken || isLoading}
						/>
						<p className="text-muted-foreground text-xs">
							비워두면 오늘 날짜({formattedDate})로 조회합니다.
						</p>
					</div>

					{/* 조회하기 버튼 */}
					<Button
						variant="outline"
						className="w-full"
						onClick={handleInquiry}
						disabled={!accessToken || isLoading}
					>
						{isLoading ? '조회 중...' : '조회하기'}
					</Button>

					{!accessToken && (
						<p className="text-muted-foreground text-sm">
							인증이 필요합니다. 인증 정보가 로드되면 조회가 가능합니다.
						</p>
					)}

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
											<div className="max-h-60 overflow-auto">
												<table className="w-full text-xs">
													<thead className="bg-gray-100">
														<tr>
															<th className="p-1">종목명</th>
															<th className="p-1">수량</th>
															<th className="p-1">매수가</th>
															<th className="p-1">현재가</th>
															<th className="p-1">수익률</th>
														</tr>
													</thead>
													<tbody>
														{inquiryResult.data.day_bal_rt.map(
															(item, index) => (
																<tr
																	key={index}
																	className="border-b border-gray-200"
																>
																	<td className="p-1 text-center">
																		{item.stk_nm}
																	</td>
																	<td className="p-1 text-right">
																		{Number(
																			item.rmnd_qty,
																		).toLocaleString()}
																	</td>
																	<td className="p-1 text-right">
																		{Number(
																			item.buy_uv,
																		).toLocaleString()}
																	</td>
																	<td className="p-1 text-right">
																		{Number(
																			item.cur_prc,
																		).toLocaleString()}
																	</td>
																	<td
																		className={`p-1 text-right ${Number(item.prft_rt) >= 0 ? 'text-red-500' : 'text-blue-500'}`}
																	>
																		{item.prft_rt}%
																	</td>
																</tr>
															),
														)}
													</tbody>
												</table>
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
