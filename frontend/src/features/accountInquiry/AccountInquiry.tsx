import { AccountInquiryProvider } from './AccountInquiryContainer';
import { AccountInquiryPresenter } from './AccountInquiryPresenter';

export default function AccountInquiry() {
	return (
		<AccountInquiryProvider>
			<AccountInquiryPresenter />
		</AccountInquiryProvider>
	);
}
