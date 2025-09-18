import { NextRequest, NextResponse } from 'next/server';

const URL = process.env.STOCK_REAL_URL;
const STOCK_API_KEY = process.env.STOCK_API_KEY;
const STOCK_SECRET_KEY = process.env.STOCK_SECRET_KEY;

export async function POST(request: NextRequest) {
	const endpoint = '/oauth2/token';
	const params = {
		grant_type: 'client_credentials', // grant_type
		appkey: STOCK_API_KEY, // 앱키
		secretkey: STOCK_SECRET_KEY, // 시크릿키
	};

	try {
		if (!STOCK_API_KEY || !STOCK_SECRET_KEY) {
			console.error('❌ 서버: 환경 변수가 설정되지 않았습니다');
			return NextResponse.json(
				{ success: false, error: '환경 변수가 설정되지 않았습니다' },
				{ status: 500 },
			);
		}

		const response = await fetch(URL + endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify(params),
		});

		const data = await response.json();

		console.log('✅ 서버: 인증 성공');

		return NextResponse.json({
			success: true,
			data: data,
		});
	} catch (error) {
		console.error('❌ 서버: 인증 API 오류:', error);

		if (error instanceof Error) {
			return NextResponse.json({ success: false, error: error.message }, { status: 500 });
		}

		return NextResponse.json({ success: false, error: '서버 내부 오류' }, { status: 500 });
	}
}
