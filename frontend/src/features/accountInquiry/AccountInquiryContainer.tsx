'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useStockAuth } from '@/app/providers/StockAuthContext';
import { fn_ka01690, Ka01690OutputData } from '@/shared/api/stock';

// 가공된 종목별 항목 타입
interface ProcessedStockBalanceItem {
	stk_cd?: string;
	stk_nm?: string;
	rmnd_qty?: string;
	buy_uv?: string;
	cur_prc?: string;
	// 숫자 필드
	quantity: number;
	buyPrice: number;
	currentPrice: number;
	investmentAmount: number;
	evaluationAmount: number;
	profitLoss: number;
	profitRate: number;
	[key: string]: unknown;
}

interface InquiryState {
	isSuccess: boolean;
	data: Ka01690OutputData | null;
	errorMessage: string | null;
	processedBalances: ProcessedStockBalanceItem[] | null;
}

interface AccountInquiryContextType {
	accessToken: string | null;
	isLoading: boolean;
	inquiryDate: string;
	inquiryResult: InquiryState;
	formattedDate: string;
	updateInquiryDate: (date: string) => void;
	executeInquiry: () => void;
	reset: () => void;
}

const AccountInquiryContext = createContext<AccountInquiryContextType | undefined>(undefined);

export const useAccountInquiry = (): AccountInquiryContextType => {
	const context = useContext(AccountInquiryContext);
	if (context === undefined) {
		throw new Error('useAccountInquiry must be used within an AccountInquiryProvider');
	}
	return context;
};

interface AccountInquiryProviderProps {
	children: ReactNode;
}

export const AccountInquiryProvider: React.FC<AccountInquiryProviderProps> = ({ children }) => {
	const { accessToken } = useStockAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [inquiryDate, setInquiryDate] = useState('');
	const [inquiryResult, setInquiryResult] = useState<InquiryState>({
		isSuccess: false,
		data: null,
		errorMessage: null,
		processedBalances: null,
	});

	// 오늘 날짜를 YYYYMMDD 형식으로 가져오기
	const getFormattedDate = useCallback((): string => {
		const today = new Date();
		return `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
	}, []);

	// 조회 날짜 업데이트
	const updateInquiryDate = useCallback((date: string) => {
		setInquiryDate(date);
	}, []);

	// 계좌 조회 실행
	const executeInquiry = useCallback(async () => {
		if (!accessToken) {
			console.error('❌ 인증 토큰이 없습니다.');
			return;
		}

		const dateToUse = inquiryDate || getFormattedDate();

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

				// response.day_bal_rt 에는 문자열 형태의 숫자들이 들어있음
				// 이를 숫자로 파싱하여 종목별 평가손익을 계산해서 노출
				const processed: ProcessedStockBalanceItem[] = (response.day_bal_rt || []).map(
					item => {
						const parseNum = (s: string | undefined | null) => {
							if (s === undefined || s === null) return 0;
							// +, - 기호와 쉼표 제거
							const cleaned = String(s).replace(/,/g, '').replace(/\+/g, '');
							const n = parseFloat(cleaned);
							return isNaN(n) ? 0 : n;
						};

						const quantity =
							parseInt((item.rmnd_qty || '0').replace(/,/g, ''), 10) || 0;
						const buyPrice = parseNum(item.buy_uv);
						const currentPrice = parseNum(item.cur_prc);
						const investmentAmount = quantity * buyPrice;
						const evaluationAmount = quantity * currentPrice;
						const profitLoss = evaluationAmount - investmentAmount;
						const profitRate =
							investmentAmount > 0 ? (profitLoss / investmentAmount) * 100 : 0;

						return {
							...item,
							quantity,
							buyPrice,
							currentPrice,
							investmentAmount,
							evaluationAmount,
							profitLoss,
							profitRate,
						};
					},
				);

				setInquiryResult({
					isSuccess: true,
					data: response || null,
					errorMessage: null,
					processedBalances: processed,
				});
			} else {
				// API 응답에 오류가 있는 경우 처리 로직 추가 필요
				setInquiryResult({
					isSuccess: false,
					data: response || null,
					errorMessage: response?.return_msg || 'API 오류',
					processedBalances: null,
				});
			}
		} catch (error) {
			// 예외 발생 케이스
			const errorMsg = error instanceof Error ? error.message : '알 수 없는 오류';
			console.error('❌ 계좌 조회 중 오류 발생:', errorMsg);
			setInquiryResult({
				isSuccess: false,
				data: null,
				errorMessage: errorMsg,
				processedBalances: null,
			});
		} finally {
			setIsLoading(false);
		}
	}, [accessToken, inquiryDate, getFormattedDate]);

	// 리셋 기능
	const reset = useCallback(() => {
		setInquiryDate('');
		setInquiryResult({
			isSuccess: false,
			data: null,
			errorMessage: null,
			processedBalances: null,
		});
	}, []);

	const contextValue: AccountInquiryContextType = {
		accessToken,
		isLoading,
		inquiryDate,
		inquiryResult,
		formattedDate: getFormattedDate(),
		updateInquiryDate,
		executeInquiry,
		reset,
	};

	return (
		<AccountInquiryContext.Provider value={contextValue}>
			{children}
		</AccountInquiryContext.Provider>
	);
};
