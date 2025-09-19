import { Ka01690OutputData } from '@/shared/api/stock';

// 응답 처리를 위한 타입 정의
export interface InquiryState {
	isSuccess: boolean;
	data: Ka01690OutputData | null;
	errorMessage: string | null;
}
