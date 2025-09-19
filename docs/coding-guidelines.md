# 프로젝트 코딩 규칙 및 가이드라인

## 📋 개요

본 문서는 hyunqok.github.io 프로젝트의 모든 개발 작업에서 준수해야 할 코딩 규칙과 아키텍처 패턴을 정의합니다.

## 🎯 핵심 개발 원칙

### 1. 스타일링

-   **Tailwind CSS**를 사용하여 모든 스타일을 작성합니다.
-   인라인 클래스를 우선으로 하고, 필요시에만 커스텀 CSS를 작성합니다.

### 2. UI 컴포넌트

-   모든 UI는 **[shadcn/ui](https://ui.shadcn.com/)** 컴포넌트를 최우선으로 사용합니다.
-   shadcn/ui에서 제공하지 않는 컴포넌트만 추가로 제작합니다.
-   컴포넌트 재사용성을 최대화합니다.

### 3. 아키텍처 패턴: Container-Presenter 패턴

#### 🏗️ 구조

```
Feature/
├── FeatureName.tsx                    # 최상위 컴포넌트 (Provider + Presenter 조합)
├── FeatureNameContainer.tsx           # Context Provider (비즈니스 로직)
├── FeatureNamePresenter.tsx           # UI 렌더링 컴포넌트
├── types/
│   └── index.ts                      # 타입 정의
└── index.ts                          # Export 관리
```

#### 📦 Container (Context Provider)

-   **역할**: 상태 관리 및 비즈니스 로직 처리
-   **책임**:
    -   React Context를 통한 상태 관리
    -   API 호출 및 데이터 처리
    -   비즈니스 로직 구현
    -   에러 처리
-   **금지사항**: UI 렌더링 관련 코드 작성 금지
-   **명명 규칙**: 컴포넌트 이름은 역할을 명확히 드러내야 합니다. 일반적인 접미사인 `Container`만을 무작정 사용하는 것을 지양하고, Context 제공 역할인 컴포넌트는 명확히 구분되도록 `...Provider`를 사용할 수 있습니다(예: `FeatureProvider`). Presenter는 `...Presenter`로 명명하세요. 무엇보다 프로젝트 전체에서 일관된 네이밍을 유지하는 것이 중요합니다.

```tsx
// 예시: Container 패턴
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface FeatureContextType {
	// 상태와 함수 정의
}

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

export const useFeature = (): FeatureContextType => {
	const context = useContext(FeatureContext);
	if (context === undefined) {
		throw new Error('useFeature must be used within a FeatureProvider');
	}
	return context;
};

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

#### 🎨 Presenter (UI 컴포넌트)

-   **역할**: 순수 UI 렌더링
-   **책임**:
    -   JSX 렌더링
    -   사용자 인터페이스 구성
    -   Context에서 데이터 소비
-   **금지사항**: 비즈니스 로직 구현 금지

```tsx
// 예시: Presenter 패턴
'use client';

import { useFeature } from './FeatureContainer';

export const FeaturePresenter = () => {
  const { data, actions } = useFeature();

  return (
    // UI 렌더링만 담당
  );
};
```

#### 🔗 최상위 컴포넌트

```tsx
// 예시: 조합 컴포넌트
'use client';

import { FeatureProvider, FeaturePresenter } from './index';

export const Feature = () => {
	return (
		<FeatureProvider>
			<FeaturePresenter />
		</FeatureProvider>
	);
};
```

### 4. 개발 진행 방식

-   모든 기능은 **단계별로 점진적**으로 개발합니다.
-   각 단계마다 테스트를 진행하여 안정성을 확보합니다.
-   코드 리뷰를 통해 패턴 준수 여부를 확인합니다.

## ⚠️ 패턴 위반 사례 및 해결책

### 🚫 금지되는 패턴들

1. **Container에서 UI 렌더링**

```tsx
// ❌ 잘못된 예시
export const FeatureContainer = () => {
	const [state, setState] = useState();

	return <div>UI 렌더링</div>; // 금지!
};
```

2. **Presenter에서 비즈니스 로직 처리**

```tsx
// ❌ 잘못된 예시
export const FeaturePresenter = () => {
	const [data, setData] = useState(); // 금지!

	const handleApiCall = async () => {
		// 금지!
		// API 로직
	};

	return <div>UI</div>;
};
```

3. **직접적인 상태 관리 (Context 없이)**

```tsx
// ❌ 잘못된 예시
export const Feature = () => {
	const [state, setState] = useState(); // 금지!
	return <FeaturePresenter state={state} />; // 금지!
};
```

### ✅ 올바른 패턴

1. **Container는 Context Provider로만**
2. **Presenter는 useContext 훅 사용**
3. **최상위 컴포넌트는 조합만**

## 🔍 패턴 준수 체크리스트

개발 완료 후 다음 사항들을 확인해주세요:

-   [ ] Container가 Context Provider 형태로 구현되어 있는가?
-   [ ] Container에 UI 렌더링 코드가 없는가?
-   [ ] Presenter가 순수 UI 컴포넌트인가?
-   [ ] Presenter에 비즈니스 로직이 없는가?
-   [ ] 최상위 컴포넌트가 Provider와 Presenter를 조합하고 있는가?
-   [ ] shadcn/ui 컴포넌트를 최대한 활용하고 있는가?
-   [ ] Tailwind CSS로 스타일링되어 있는가?

## 📚 참고 구현 예시

현재 프로젝트에서 올바르게 구현된 예시:

-   `features/tradingStrategy/`
-   `features/accountInquiry/`

## 🚨 패턴 위반 시 대응 방안

패턴에 어긋나는 코딩이 필요한 경우:

1. **사전 컨펌 요청**: 구현 전에 반드시 검토 요청
2. **대안 제시**: 패턴을 준수하면서 목적을 달성할 수 있는 방법 모색
3. **예외 사항 문서화**: 불가피한 경우 예외 사유와 함께 문서화

## 📝 업데이트 이력

-   2025.09.19: 초기 문서 작성
-   Container-Presenter 패턴 정의
-   코딩 규칙 및 가이드라인 수립
