'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

// Stock Auth Context 타입 정의
interface StockAuthContextType {
	expiresDate: string | null;
	accessToken: string | null;
	isAuthenticated: boolean;
	isAuthenticating: boolean;
	authError: string | null;
	authenticate: () => Promise<void>;
	clearAuth: () => void;
}

// Context 생성
const StockAuthContext = createContext<StockAuthContextType | undefined>(undefined);

// Provider Props 타입
interface StockAuthProviderProps {
	children: ReactNode;
}

// Provider 컴포넌트
export function StockAuthProvider({ children }: StockAuthProviderProps) {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const [authError, setAuthError] = useState<string | null>(null);
	const [expiresDate, setExpiresDate] = useState<string | null>(null);

	// 인증 함수
	const authenticate = useCallback(async () => {
		try {
			setIsAuthenticating(true);
			setAuthError(null);

			// API route를 통해 인증 요청
			const response = await fetch('/api/stock/auth', { method: 'POST' });
			const data = await response.json();

			if (response.ok && data.success) {
				// 전체 응답 구조 로깅 (디버깅용)
				// console.log('⚡ 인증 응답 전체:', JSON.stringify(data, null, 2));

				// 응답 데이터는 data.data 내에 있음
				const responseData = data.data;
				// console.log('⚡ 응답 데이터 객체:', responseData);

				// 토큰 정보 추출 (한국투자증권 API는 주로 access_token 필드 사용)
				const token = responseData?.access_token || responseData?.token;
				// 만료 시간은 expires_in (초 단위)로 제공됨
				const expiresIn = responseData?.expires_in;
				// 만료 날짜 계산 (현재 시간 + expires_in 초)
				const expires = expiresIn
					? new Date(Date.now() + expiresIn * 1000).toISOString()
					: null;

				// 상태 업데이트
				setIsAuthenticated(true);
				setAccessToken(token);
				setExpiresDate(expires);
				// console.log('✅ 클라이언트 사이드 인증 성공', { token, expires });
			} else {
				throw new Error(data.error || '인증에 실패했습니다.');
			}
		} catch (error) {
			console.error('❌ 클라이언트 사이드 인증 실패:', error);
			setAuthError(error instanceof Error ? error.message : '알 수 없는 오류');
			setIsAuthenticated(false);
		} finally {
			setIsAuthenticating(false);
		}
	}, []); // 빈 종속성 배열: 컴포넌트가 마운트될 때만 함수 생성

	// 인증 정보 초기화
	const clearAuth = useCallback(() => {
		setExpiresDate(null);
		setAccessToken(null);
		setIsAuthenticated(false);
		setIsAuthenticating(false);
		setAuthError(null);
	}, []);

	// 컴포넌트 마운트 시 자동 인증 시도 (선택사항)
	useEffect(() => {
		const shouldAuthenticate = !accessToken && !isAuthenticated;

		if (shouldAuthenticate) {
			authenticate();
		}
	}, [isAuthenticated, accessToken, authenticate]);

	// Context 값
	const value: StockAuthContextType = {
		expiresDate,
		accessToken,
		isAuthenticated,
		isAuthenticating,
		authError,
		authenticate,
		clearAuth,
	};

	return <StockAuthContext.Provider value={value}>{children}</StockAuthContext.Provider>;
}

// Custom Hook
export function useStockAuth() {
	const context = useContext(StockAuthContext);

	if (context === undefined) {
		throw new Error('useStockAuth must be used within a StockAuthProvider');
	}
	return context;
}
