/**
 *  ./api_schema 참조
 */
const url = 'https://api.kiwoom.com';

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
 * 실시간종목조회순위(ka00198) 요청 바디
 */
interface Ka00198RequestBody {
	qry_tp: string; // 1:1분,2:10분,3:1시간,4:당일 누적,5:30초
}

/**
 * 실시간종목조회순위(ka00198) 응답 항목
 */
export interface Ka00198Item {
	stk_nm: string; // 종목명
	bigd_rank: string; // 빅데이터 순위
	rank_chg: string; // 순위 등락
	rank_chg_sign: string; // 순위 등락 부호
	past_curr_prc: string; // 과거 현재가
	base_comp_sign: string; // 기준가 대비 부호
	base_comp_chgr: string; // 기준가 대비 등락율
	prev_base_sign: string; // 직전 기준 대비 부호
	prev_base_chgr: string; // 직전 기준 대비 등락율
	dt: string; // 일자
	tm: string; // 시간
	stk_cd: string; // 종목코드
}

/**
 * ka00198 응답 바디
 */
export interface Ka00198Response {
	item_inq_rank?: Ka00198Item[];
	return_code?: number;
	return_msg?: string;
	[key: string]: unknown;
}

/**
 * 실시간종목조회순위 호출 (ka00198)
 */
export async function fn_ka00198(
	token: string,
	body: Ka00198RequestBody,
	cont_yn: string = 'N',
	next_key: string = '',
): Promise<Ka00198Response | null> {
	const endpoint = '/api/dostk/stkinfo';

	// 요청 바디 검증
	if (!/^[1-5]$/.test(body.qry_tp)) {
		console.error('❌ qry_tp 값이 올바르지 않습니다. 1-5 값 중 하나여야 합니다.');
		return null;
	}

	const requestBody = { qry_tp: body.qry_tp };

	const headers: Record<string, string> = {
		'Content-Type': 'application/json;charset=UTF-8',
		authorization: `Bearer ${token}`,
		'api-id': 'ka00198',
	};

	if (cont_yn === 'Y' && next_key) {
		headers['cont-yn'] = cont_yn;
		headers['next-key'] = next_key;
	}

	try {
		console.log('📡 ka00198 요청 시작...', requestBody);
		const response = await fetch(url + endpoint, {
			method: 'POST',
			headers,
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			console.error('❌ ka00198 API 요청 실패:', response.status, response.statusText);
			return null;
		}

		const responseHeaders = {
			'cont-yn': response.headers.get('cont-yn'),
			'next-key': response.headers.get('next-key'),
			'api-id': response.headers.get('api-id'),
		};

		console.log('응답 헤더:', responseHeaders);

		const data: Ka00198Response = await response.json();
		console.log('ka00198 응답:', data);

		return data;
	} catch (error) {
		console.error('❌ ka00198 요청 실패:', error);
		return null;
	}
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
