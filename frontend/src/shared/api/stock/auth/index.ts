import axios from 'axios';

// 타입 정의
interface AuthResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope?: string;
}

interface AuthRequest {
	expires_dt: string;
	token_type: string;
	token: string;
	return_code: number;
	return_msg: string;
}

const url = 'https://api.kiwoom.com';
// 모의 투자
const mock_url = 'https://mockapi.kiwoom.com';

// API 키 가져오기
const STOCK_API_KEY = 'twADkd1Su_c_rN__XUmKB5ANk0rJa4u2zXsp8n9591s';
const STOCK_SECRET_KEY = 'KpHu6qCWvJMgYXk3ngYqiaWD92AUYWCjZquAzvpQTPg';

/**
 * 키움증권 API 접근 토큰 발급
 * @param appKey 앱 키
 * @param secretKey 시크릿 키
 * @returns 인증 응답 데이터
 */
export async function getAccessToken(
	appKey: string,
	secretKey: string,
): Promise<AuthResponse | null> {
	try {
		const response = await axios.post<AuthResponse>(url + '/oauth2/token', {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
		});

		console.log('🚀 ~ response:', response);

		console.log('✅ 인증 성공');
		console.log('Status:', response.status);
		console.log('Access Token:', response.data.access_token);

		return response.data;
	} catch (error) {
		console.error('❌ 인증 실패:', error);
		if (axios.isAxiosError(error)) {
			console.error('응답 상태:', error.response?.status);
			console.error('응답 데이터:', error.response?.data);
		}
		return null;
	}
}

/**
 * 현재 환경의 API 키로 인증 실행
 * @returns 인증 결과
 */
export async function authenticateStockAPI(): Promise<AuthResponse | null> {
	if (!STOCK_API_KEY || !STOCK_SECRET_KEY) {
		console.error('❌ STOCK_API_KEY 또는 STOCK_SECRET_KEY 환경 변수가 설정되지 않았습니다.');
		return null;
	}

	console.log('🔐 주식 API 인증을 시작합니다...');
	return await getAccessToken(STOCK_API_KEY, STOCK_SECRET_KEY);
}

/**
 * API 요청 헤더 인터페이스
 */
interface Ka01690RequestHeader {
	'Content-Type': string; // 컨텐츠 타입 (application/json;charset=UTF-8)
	authorization: string; // 접근 토큰 (Bearer 형식)
	'cont-yn'?: string; // 연속 조회 여부 (Y/N)
	'next-key'?: string; // 연속 조회 키
	'api-id': string; // TR명 (ka01690)
}

/**
 * API 요청 바디 인터페이스
 */
interface Ka01690RequestBody {
	qry_dt: string; // 조회 일자 (YYYYMMDD 형식) - 필수
}

/**
 * 요청 데이터 인터페이스 정의
 */
interface RequestData {
	qry_dt?: string; // 조회 날짜 (YYYYMMDD 형식) - API 요청시 필수
	date?: string; // 대체 날짜 형식 (호환성 유지)
	account?: string; // 계좌 번호 (현재 미사용)
}

/**
 * API 응답 헤더 인터페이스
 */
interface Ka01690ResponseHeader {
	'cont-yn': string | null; // 연속 조회 여부
	'next-key': string | null; // 연속 조회 키
	'api-id': string | null; // TR명
}

/**
 * 일별잔고 종목별 정보 타입 (응답의 day_bal_rt 리스트 항목)
 */
interface StockBalanceItem {
	cur_prc: string; // 현재가
	stk_cd: string; // 종목코드
	stk_nm: string; // 종목명
	rmnd_qty: string; // 보유 수량
	buy_uv: string; // 매입 단가
	buy_wght: string; // 매수비중
	evltv_prft: string; // 평가손익
	prft_rt: string; // 수익률
	evlt_amt: string; // 평가금액
	evlt_wght: string; // 평가비중
}

/**
 * 일별잔고수익률 응답 데이터 타입 (API 응답 바디)
 */
export interface Ka01690OutputData {
	dt: string; // 일자
	tot_buy_amt: string; // 총 매입가
	tot_evlt_amt: string; // 총 평가금액
	tot_evltv_prft: string; // 총 평가손익
	tot_prft_rt: string; // 수익률
	dbst_bal: string; // 예수금
	day_stk_asst: string; // 추정자산
	buy_wght: string; // 현금비중
	day_bal_rt: StockBalanceItem[]; // 일별잔고수익률 목록
	return_code?: number; // 리턴 코드 (0: 성공) - API 문서에 없지만 호환성 유지
	return_msg?: string; // 리턴 메시지 - API 문서에 없지만 호환성 유지
}

/**
 * 일별잔고수익률 조회 (ka01690)
 * @param token 접근 토큰
 * @param data 요청 데이터 (qry_dt: 조회날짜 YYYYMMDD)
 * @param cont_yn 연속 조회 여부 (Y/N)
 * @param next_key 연속 조회 키
 * @returns 일별잔고수익률 응답 데이터
 */
export async function fn_ka01690(
	token: string,
	data: RequestData,
	cont_yn: string = 'N',
	next_key: string = '',
): Promise<Ka01690OutputData | null> {
	const endpoint = '/api/dostk/acnt';

	// 날짜 형식 검증 (YYYYMMDD)
	const dateToUse =
		data.qry_dt || data.date || new Date().toISOString().slice(0, 10).replace(/-/g, '');

	if (!/^\d{8}$/.test(dateToUse)) {
		console.error('❌ 날짜 형식이 올바르지 않습니다. YYYYMMDD 형식으로 입력해주세요.');
		return null;
	}

	// 요청 데이터 준비 (API 문서에 따라 qry_dt만 필요)
	const requestBody = {
		qry_dt: dateToUse,
	};

	// API 문서에 명시된 헤더 데이터
	// Record<string, string> 타입으로 정의하여 동적 필드 추가 가능하게 함
	const headers: Record<string, string> = {
		'Content-Type': 'application/json;charset=UTF-8', // 컨텐츠 타입
		authorization: `Bearer ${token}`, // 접근 토큰 (Bearer 형식)
		'api-id': 'ka01690', // TR명 (필수)
	};

	// 연속 조회 시 필요한 헤더 추가
	if (cont_yn === 'Y' && next_key) {
		headers['cont-yn'] = cont_yn; // 연속 조회 여부
		headers['next-key'] = next_key; // 연속 조회 키
	}

	try {
		console.log('📡 일별잔고수익률(ka01690) 요청 시작...');
		console.log('요청 데이터:', JSON.stringify(requestBody, null, 2));
		console.log('요청 헤더:', JSON.stringify(headers, null, 2));

		// HTTP POST 요청
		const response = await fetch(url + endpoint, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(requestBody),
		});

		// 응답 상태 코드 확인
		if (!response.ok) {
			console.error(`❌ API 요청 실패: ${response.status} ${response.statusText}`);
			return null;
		}

		// API 문서에 명시된 응답 헤더 추출
		const responseHeaders = {
			'next-key': response.headers.get('next-key'), // 연속 조회 키
			'cont-yn': response.headers.get('cont-yn'), // 연속 조회 여부
			'api-id': response.headers.get('api-id'), // TR명
		};

		// 연속 조회 여부 확인 및 출력
		const hasMoreData = responseHeaders['cont-yn'] === 'Y';

		console.log('응답 상태 코드:', response.status);
		console.log('응답 헤더:', JSON.stringify(responseHeaders, null, 4));
		console.log(
			hasMoreData ? '⚠️ 연속 데이터 있음 - 추가 조회 필요' : '✅ 모든 데이터 수신 완료',
		);

		// 응답 본문 출력
		const responseBody: Ka01690OutputData = await response.json();
		console.log('응답 본문:', JSON.stringify(responseBody, null, 4));

		return responseBody;
	} catch (error) {
		console.error('❌ 요청 실패:', error);
		return null;
	} finally {
		console.log('fn_ka01690 요청 완료');
	}
}
