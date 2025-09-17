'use client';

import React, { memo, useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

declare global {
	interface Window {
		cursorBlending?: (bool: boolean) => void;
		cursorReset?: () => void;
	}
}

const Logo = () => {
	const logoRef = useRef<HTMLDivElement>(null);
	const logoEyeRef = useRef<SVGGElement>(null);
	const logoFaceRef = useRef<SVGGElement>(null);
	const logoEyePathsRef = useRef<SVGPathElement[]>([]);
	const logoHiddenTextRef = useRef<HTMLSpanElement[]>([]);
	const logoHoverTlRef = useRef<gsap.core.Timeline | null>(null);

	const handleMouseMove = useCallback((e: MouseEvent) => {
		const logoEye = logoEyeRef.current;
		if (!logoEye) return;
		const eyePosx = e.clientX / 250;
		const eyePosy = e.clientY / 350;
		gsap.to(logoEye, { x: eyePosx, y: eyePosy, duration: 0.1 });
	}, []);

	const handleMouseEnter = useCallback(() => {
		const logoEyePaths = logoEyePathsRef.current;
		const logoHiddenText = logoHiddenTextRef.current;
		if (!logoEyePaths.length || !logoHiddenText.length) return;

		// 기존 타임라인이 실행 중이면 중지
		if (logoHoverTlRef.current) {
			logoHoverTlRef.current.kill();
		}

		// 새로운 타임라인 생성
		const logoHoverTl = gsap.timeline({ paused: true });
		logoHoverTl.fromTo(
			logoHiddenText,
			{ scale: 0, opacity: 0, visibility: 'hidden', x: 10, y: 10 },
			{
				scale: 1,
				opacity: 1,
				visibility: 'visible',
				x: 0,
				y: 0,
				duration: 0.2,
				stagger: 0.1,
			},
			0,
		);

		logoHoverTlRef.current = logoHoverTl;
		window.cursorBlending?.(true);
		document.getElementById('custom-cursor')?.classList.add('logo');
		logoHoverTl.play();
	}, []);

	const handleMouseLeave = useCallback(() => {
		const logoEyePaths = logoEyePathsRef.current;
		const logoHiddenText = logoHiddenTextRef.current;
		if (!logoEyePaths.length || !logoHiddenText.length) return;

		// 기존 타임라인이 실행 중이면 중지
		if (logoHoverTlRef.current) {
			logoHoverTlRef.current.kill();
		}

		// 새로운 타임라인 생성
		const logoHoverTl = gsap.timeline({ paused: true });
		logoHoverTl.fromTo(
			logoHiddenText,
			{ scale: 1, opacity: 1, visibility: 'visible', x: 0, y: 0 },
			{
				scale: 0,
				opacity: 0,
				visibility: 'hidden',
				x: 10,
				y: 10,
				duration: 0.2,
				stagger: 0.1,
			},
			0,
		);

		logoHoverTlRef.current = logoHoverTl;
		logoHoverTl.reverse(-1);
		window.cursorBlending?.(false);
		window.cursorReset?.();
	}, []);

	useEffect(() => {
		const logo = logoRef.current;
		const logoEye = logoEyeRef.current;
		if (!logo) return;

		// 눈 깜빡임 애니메이션 (깜빡깜빡 -> 딜레이 -> 반복)
		if (logoEye) {
			const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 4 });
			// 첫 번째 깜빡임
			blinkTl
				.to(logoEye, {
					scaleY: 0.3,
					duration: 0.08,
					transformOrigin: 'center',
					ease: 'power2.inOut',
				})
				.to(
					logoEye,
					{
						scaleY: 1,
						duration: 0.08,
						ease: 'power2.inOut',
					},
					'+=0.1',
				) // 0.1초 후에 다시 뜸
				// 두 번째 깜빡임
				.to(
					logoEye,
					{
						scaleY: 0.3,
						duration: 0.08,
						ease: 'power2.inOut',
					},
					'+=0.2',
				) // 0.2초 후에 두 번째 깜빡임
				.to(logoEye, {
					scaleY: 1,
					duration: 0.08,
					ease: 'power2.inOut',
				});
		}

		document.addEventListener('mousemove', handleMouseMove);
		logo.addEventListener('mouseenter', handleMouseEnter);
		logo.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			logo.removeEventListener('mouseenter', handleMouseEnter);
			logo.removeEventListener('mouseleave', handleMouseLeave);
			// 타임라인 정리
			if (logoHoverTlRef.current) {
				logoHoverTlRef.current.kill();
			}
		};
	}, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

	return (
		<div
			ref={logoRef}
			className="inline-flex items-end text-gray-800"
			aria-label="Hyun Qook Jeong Logo"
			role="img"
		>
			<svg
				id="logo-g"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				width="43.715px"
				height="46.081px"
				viewBox="0 0 43.715 46.081"
				aria-hidden="true"
				className="fill-gray-900"
			>
				<g id="logo-face" ref={logoFaceRef}>
					<path
						d="M43.541,18.75c0.462,3.561,0.007,7.026-1.36,10.392c-1.369,3.369-3.528,6.289-6.478,8.76l2.8,3.8l-2.512,1.851
            l-2.8-3.8c-3.267,2.108-6.702,3.311-10.31,3.607c-3.606,0.299-7.041-0.301-10.305-1.797s-6.034-3.79-8.313-6.881
            c-2.371-3.221-3.754-6.699-4.146-10.435s0.195-7.335,1.766-10.803c1.569-3.467,4.013-6.421,7.33-8.866
            c3.316-2.444,6.857-3.909,10.621-4.398c3.766-0.488,7.372,0.009,10.824,1.49c3.451,1.481,6.376,3.849,8.771,7.101
            C41.708,11.864,43.079,15.19,43.541,18.75z M39.403,28.208c1.125-2.89,1.479-5.884,1.061-8.98
            c-0.417-3.095-1.599-5.963-3.545-8.604c-2.039-2.769-4.557-4.802-7.55-6.1c-2.993-1.297-6.114-1.756-9.36-1.375
            c-3.248,0.38-6.289,1.615-9.123,3.702c-2.833,2.088-4.921,4.633-6.262,7.633c-1.343,3.001-1.836,6.123-1.484,9.366
            s1.549,6.25,3.59,9.019c1.945,2.642,4.329,4.611,7.15,5.911c2.82,1.301,5.777,1.843,8.871,1.624
            c3.094-0.217,6.033-1.201,8.815-2.955l-3.8-5.2l2.367-1.744l3.8,5.2C36.456,33.597,38.279,31.099,39.403,28.208z"
					/>
				</g>
				<g id="logo-eye" ref={logoEyeRef}>
					<path
						ref={el => {
							if (el) logoEyePathsRef.current.push(el);
						}}
						d="M9.791,22.802c-0.5-0.5-0.75-1.111-0.75-1.83c0-0.721,0.25-1.321,0.75-1.801c0.5-0.48,1.089-0.72,1.77-0.72c0.68,0,1.27,0.24,1.77,0.72c0.5,0.48,0.75,1.08,0.75,1.801c0,0.719-0.25,1.33-0.75,1.83c-0.5,0.5-1.09,0.75-1.77,0.75C10.88,23.552,10.29,23.302,9.791,22.802z"
					/>
					<path
						ref={el => {
							if (el) logoEyePathsRef.current.push(el);
						}}
						d="M21.791,22.802c-0.5-0.5-0.75-1.111-0.75-1.83c0-0.721,0.25-1.321,0.75-1.801c0.5-0.48,1.089-0.72,1.77-0.72c0.68,0,1.27,0.24,1.77,0.72c0.5,0.48,0.75,1.08,0.75,1.801c0,0.719-0.25,1.33-0.75,1.83c-0.5,0.5-1.09,0.75-1.77,0.75C22.88,23.552,22.29,23.302,21.791,22.802z"
					/>
				</g>
			</svg>
			{/* <span
				ref={el => {
					if (el) logoHiddenTextRef.current.push(el);
				}}
				aria-hidden="true"
			>
				o
			</span>
			<span
				ref={el => {
					if (el) logoHiddenTextRef.current.push(el);
				}}
				aria-hidden="true"
			>
				o
			</span>
			<span
				ref={el => {
					if (el) logoHiddenTextRef.current.push(el);
				}}
				aria-hidden="true"
			>
				K.
			</span> */}
		</div>
	);
};

export default memo(Logo);
