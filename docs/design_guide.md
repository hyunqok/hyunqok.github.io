# 디자인 가이드라인

**Tailwind CSS Core concepts를 따름**

## https://www.figma.com/design/YkZRNRI69ZXvtFOgW0OPRo/Portfolio-for-Developers-Concept-V.2.1--Community-?node-id=26532-1280

#### figma 정보를 참고 하여 레이아웃 및 디자인 구성

## 1. 색상 팔레트 (Glassmorphism 스타일)

### 1.1 배경 색상 (Background)

-   **주 배경**: rgba(255, 255, 255, 0.1) - 반투명 흰색
-   **보조 배경**: rgba(255, 255, 255, 0.05) - 더 투명한 흰색
-   **다크 배경**: rgba(0, 0, 0, 0.1) - 반투명 검정 (다크 모드용)

### 1.2 전경 색상 (Foreground)

-   **기본 텍스트**: rgba(255, 255, 255, 0.9) - 반투명 흰색 텍스트
-   **보조 텍스트**: rgba(255, 255, 255, 0.7) - 더 투명한 텍스트
-   **다크 텍스트**: rgba(0, 0, 0, 0.8) - 반투명 검정 텍스트

### 1.3 강조 색상 (Accent)

-   **주 색상**: rgba(59, 130, 246, 0.8) - 반투명 파란색
-   **보조 색상**: rgba(16, 185, 129, 0.8) - 반투명 초록색
-   **액센트 색상**: rgba(245, 158, 11, 0.8) - 반투명 주황색

### 1.4 테두리 및 효과 (Borders & Effects)

-   **미세 테두리**: rgba(255, 255, 255, 0.2) - 얇은 흰색 테두리
-   **그림자 효과**: rgba(0, 0, 0, 0.1) - 부드러운 그림자
-   **블러 효과**: backdrop-blur-md (Tailwind 클래스)

### 1.5 Glassmorphism 색상 팔레트 상세

| 색상           | RGBA 값                   | Tailwind 클래스 | 사용처          |
| -------------- | ------------------------- | --------------- | --------------- |
| Glass White    | rgba(255, 255, 255, 0.1)  | bg-white/10     | 카드 배경, 모달 |
| Glass Light    | rgba(255, 255, 255, 0.05) | bg-white/5      | 오버레이, 툴팁  |
| Glass Dark     | rgba(0, 0, 0, 0.1)        | bg-black/10     | 다크 모드 카드  |
| Text Primary   | rgba(255, 255, 255, 0.9)  | text-white/90   | 메인 텍스트     |
| Text Secondary | rgba(255, 255, 255, 0.7)  | text-white/70   | 보조 텍스트     |
| Border Light   | rgba(255, 255, 255, 0.2)  | border-white/20 | 테두리          |
| Shadow Soft    | rgba(0, 0, 0, 0.1)        | shadow-black/10 | 그림자          |

## 2. 타이포그래피

-   **주 폰트**: Inter, sans-serif
-   **제목 폰트**: Inter, sans-serif
-   **본문 폰트**: Inter, sans-serif
-   **폰트 크기 체계**:
    -   제목 1: 2.5rem (40px)
    -   제목 2: 2rem (32px)
    -   제목 3: text-2xl (24px)
    -   본문: text-base (16px)
    -   작은 텍스트: text-sm (14px)
    -   매우 작은 텍스트: text-xs (12px)

## 3. 컴포넌트 스타일

### 3.1 버튼 (Glassmorphism)

-   기본 스타일:
    -   배경: rgba(255, 255, 255, 0.1)
    -   테두리: rgba(255, 255, 255, 0.2)
    -   블러 효과: backdrop-blur-md
    -   둥근 모서리 (border-radius: 0.75rem)
    -   패딩: 0.75rem 1.5rem
-   호버 상태:
    -   배경 불투명도 증가: rgba(255, 255, 255, 0.2)
    -   살짝 올라오는 효과
-   비활성화 상태:
    -   불투명도 감소: rgba(255, 255, 255, 0.05)
    -   포인터 이벤트 없음

### 3.2 카드 (Glassmorphism)

-   기본 스타일:
    -   배경: rgba(255, 255, 255, 0.1)
    -   테두리: rgba(255, 255, 255, 0.2)
    -   블러 효과: backdrop-blur-lg
    -   둥근 모서리: 1rem
    -   그림자: rgba(0, 0, 0, 0.1)
-   호버 상태:
    -   배경 불투명도 증가
    -   테두리 강조
    -   살짝 확대 효과
-   활성화 상태:
    -   테두리 색상 변경

### 3.3 내비게이션

-   기본 스타일:
    -   배경: rgba(255, 255, 255, 0.05)
    -   블러 효과 적용
    -   고정 위치 (sticky)
-   모바일 스타일:
    -   슬라이드 메뉴
    -   블러 배경 오버레이
-   활성화 상태:
    -   배경 불투명도 증가

## 4. 반응형 브레이크포인트

-   **모바일**: 0px ~ 639px
-   **태블릿**: 640px ~ 1023px
-   **데스크톱**: 1024px ~ 1279px
-   **와이드 스크린**: 1280px 이상

## 5. 애니메이션 & 트랜지션

-   **전환 속도**: 0.3s ~ 0.5s (기본: 0.3s)
-   **기본 애니메이션**:
    -   페이드인
    -   슬라이드
    -   스케일
-   **인터랙션 피드백**:
    -   호버 시 불투명도 변화
    -   클릭 시 스케일 효과
    -   로딩 상태 표시 (반투명 오버레이)

## 6. Glassmorphism 구현 팁

### 6.1 Tailwind CSS 클래스 사용

```css
/* Glassmorphism 카드 */
.glass-card {
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	border-radius: 1rem;
}

/* Glassmorphism 버튼 */
.glass-button {
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(5px);
	transition: all 0.3s ease;
}

.glass-button:hover {
	background: rgba(255, 255, 255, 0.2);
	transform: translateY(-2px);
}
```

### 6.2 배경 이미지 고려

-   Glassmorphism은 배경 이미지와 함께 사용할 때 가장 효과적
-   배경이 복잡할수록 유리 효과가 더 잘 드러남
-   그라데이션이나 패턴 배경 추천

### 6.3 브라우저 지원

-   `backdrop-filter`는 최신 브라우저에서 지원
-   폴백 스타일 준비 (단순 반투명 배경)
