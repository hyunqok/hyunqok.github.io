# AI 개발 지원 가이드라인

## 📋 개요

본 문서는 AI가 hyunqok.github.io 프로젝트의 새로운 기능 개발을 지원할 때 항상 참조해야 할 가이드라인입니다.

## 🎯 AI의 역할과 책임

### 1. 필수 참조 문서

AI는 모든 개발 요청에서 다음 문서들을 **반드시 참조**해야 합니다:

1. **`docs/coding-guidelines.md`** - 코딩 규칙 및 아키텍처 패턴
2. **프로젝트 내 기존 구현 예시** - `features/tradingStrategy/`, `features/accountInquiry/`

### 2. 개발 프로세스

#### 2.1 요청 분석 단계

1. **요구사항 파악**: 사용자 요청의 정확한 의도 파악
2. **패턴 검증**: 요청이 기존 코딩 규칙에 부합하는지 확인
3. **위반 사항 식별**: 패턴에 어긋나는 부분이 있는지 사전 체크

#### 2.2 구현 계획 수립

1. **단계별 분해**: 복잡한 요청을 작은 단위로 분해
2. **우선순위 설정**: 핵심 기능부터 순차적 개발
3. **패턴 적용**: Container-Presenter 패턴 적용 방안 수립

#### 2.3 코드 작성

1. **규칙 준수**: `coding-guidelines.md`의 모든 규칙 준수
2. **예시 참조**: 기존 구현된 기능들의 패턴 활용
3. **점진적 개발**: 단계별로 완성도를 높여가며 개발

## ⚠️ 패턴 위반 대응 절차

### 1. 위반 사항 발견 시

사용자 요청이 다음 패턴에 어긋날 때 **반드시 사전 컨펌**을 받아야 합니다:

-   Container에서 UI 렌더링 요청
-   Presenter에서 상태 관리 요청
-   Context 없이 직접적인 props 전달 요청
-   shadcn/ui 대신 다른 UI 라이브러리 사용 요청

### 2. 컨펌 요청 방식

```
🚨 패턴 위반 감지

요청하신 기능이 프로젝트의 코딩 규칙에 어긋납니다:
- 위반 내용: [구체적인 위반 사항]
- 규칙: [해당하는 규칙 번호]

대안 제안:
1. [패턴을 준수하는 방법 1]
2. [패턴을 준수하는 방법 2]

진행하시겠습니까?
```

## 🛠️ 개발 지원 체크리스트

### 새로운 기능 개발 시

#### ✅ 시작 전 체크사항

-   [ ] `coding-guidelines.md` 검토 완료
-   [ ] 기존 구현 예시 분석 완료
-   [ ] Container-Presenter 패턴 적용 방안 수립
-   [ ] shadcn/ui 컴포넌트 활용 계획 수립

#### ✅ 구현 중 체크사항

-   [ ] Container가 Context Provider로 구현되고 있는가?
-   [ ] Presenter가 순수 UI 컴포넌트로 구현되고 있는가?
-   [ ] 비즈니스 로직과 UI가 명확히 분리되고 있는가?
-   [ ] Tailwind CSS로 스타일링되고 있는가?

#### ✅ 완료 후 체크사항

-   [ ] 모든 패턴 준수 여부 확인
-   [ ] 기존 구현 예시와 일관성 확인
-   [ ] 타입 안정성 확인
-   [ ] 에러 처리 구현 확인

## 📚 참조 가능한 구현 예시

### 1. 완벽한 패턴 구현 예시

#### tradingStrategy 기능

```
features/tradingStrategy/
├── FibonacciPurchaseStrategy.tsx          # ✅ 최상위 컴포넌트
├── FibonacciPurchaseStrategyContainer.tsx # ✅ Context Provider
├── FibonacciPurchaseStrategyPresenter.tsx # ✅ UI 컴포넌트
└── types/index.ts                         # ✅ 타입 정의
```

#### accountInquiry 기능

```
features/accountInquiry/
├── AccountInquiry.tsx                    # ✅ 최상위 컴포넌트
├── ui/AccountInquiryContainer.tsx        # ✅ Context Provider
├── ui/AccountInquiryPresenter.tsx        # ✅ UI 컴포넌트
└── types/index.ts                        # ✅ 타입 정의
```

### 2. 주요 패턴 요소

#### Context Provider 템플릿

```tsx
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

// 1. 타입 정의
interface FeatureContextType {
	// 상태와 함수들
}

// 2. Context 생성
const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

// 3. 커스텀 훅
export const useFeature = (): FeatureContextType => {
	const context = useContext(FeatureContext);
	if (context === undefined) {
		throw new Error('useFeature must be used within a FeatureProvider');
	}
	return context;
};

// 4. Provider 컴포넌트
export const FeatureProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// 비즈니스 로직 구현

	return (
		<FeatureContext.Provider value={contextValue}>
			{children}
		</FeatureContext.Provider>
	);
};
```

#### UI 컴포넌트 템플릿

```tsx
'use client';

import { useFeature } from './FeatureContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export const FeaturePresenter = () => {
	const { data, actions } = useFeature();

	return <Card>{/* UI 렌더링만 담당 */}</Card>;
};
```

## 🔄 지속적인 개선

### 1. 문서 업데이트

-   새로운 패턴이나 규칙이 추가될 때마다 문서 업데이트
-   구현 예시가 늘어날 때마다 참조 목록 업데이트

### 2. 피드백 수집

-   패턴 위반 사례 발생 시 문서에 추가
-   자주 발생하는 실수들을 가이드라인에 반영

### 3. 품질 향상

-   코드 리뷰 결과를 바탕으로 가이드라인 개선
-   성능 및 사용성 개선 사항 반영

## 📞 문의 및 지원

패턴이나 구현 방법에 대한 문의가 있을 때는:

1. 기존 구현 예시를 먼저 참조
2. `coding-guidelines.md`에서 해당 규칙 확인
3. 불명확한 경우 사용자에게 명확한 컨펌 요청

---

**중요**: 이 가이드라인은 프로젝트의 일관성과 품질을 보장하기 위한 필수 문서입니다. 모든 개발 지원 시 반드시 준수해주세요.
