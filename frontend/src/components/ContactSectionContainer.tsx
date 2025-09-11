'use client';

import { useState } from 'react';
import { ContactSectionPresenter } from './ContactSectionPresenter';

interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export function ContactSectionContainer() {
	const [formData, setFormData] = useState<ContactFormData>({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// 실제로는 API 호출
		setTimeout(() => {
			alert('메시지가 성공적으로 전송되었습니다!');
			setFormData({ name: '', email: '', subject: '', message: '' });
			setIsSubmitting(false);
		}, 1000);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<ContactSectionPresenter
			formData={formData}
			isSubmitting={isSubmitting}
			onSubmit={handleSubmit}
			onChange={handleChange}
		/>
	);
}
