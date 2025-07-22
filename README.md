# 웹 포트폴리오 사이트 제작

이 프로젝트는 AI 코딩 에이전트와 함께 "웹퍼블리싱 10년차 이상 경험을 어필하는 프론트엔드 구직을 위한 포트폴리오 사이트" 를 제작 하는 것이다.

## 프로젝트 개요

### 무엇을 만드는가?

-   다양한 프로젝트 경험을 DB에 저장하고 관리하고
-
-   일반 사용자는 서비스 상태를 확인할 수 있음
-   관리자는 로그인해서 장애 정보를 등록/수정할 수 있음

### 페이지 구성

1. **홈페이지** (`/`) - 서비스 목록 표시
2. **서비스 상태 페이지** (`/status/서비스ID`) - 특정 서비스의 장애 상태 표시
3. **로그인 페이지** (`/login`) - 관리자 인증
4. **관리자 페이지** (`/admin`) - 장애 등록/수정 (로그인 필요)

## 🚨 중요한 주의사항 (시행착오 방지)

### 1. 데이터베이스 인코딩 문제

**문제**: AI 어시스턴트가 MySQL 기본 설정을 사용하면 한글이 깨짐
**해결**: 반드시 다음 사항을 명시하여 요청

-   "MySQL 데이터베이스는 반드시 utf8mb4 인코딩을 사용해야 함"
-   "모든 테이블 생성 시 `DEFAULT CHARSET=utf8mb4` 명시"
-   "데이터베이스 연결 시 charset=utf8mb4 설정"

### 2. Tailwind CSS 버전 차이

**문제**: AI 어시스턴트가 구버전 Tailwind CSS 설정을 사용
**해결**: 반드시 다음 사항을 명시하여 요청

-   "Tailwind CSS 4.x 버전 사용"
-   "JavaScript 설정 파일(tailwind.config.js) 대신 CSS 설정(@import) 사용"
-   "PostCSS 설정에서 @tailwindcss/postcss 플러그인 사용"
-   "package.json에 @tailwindcss/postcss와 tailwindcss 둘 다 포함"

### 3. Next.js 버전 차이

**문제**: AI 어시스턴트가 구버전 Next.js 설정을 사용
**해결**: 반드시 다음 사항을 명시하여 요청

-   "Next.js 15.x 버전 사용"
-   "React 19.x 버전 사용"
-   "App Router 사용 (pages 디렉토리 아님)"

## 기술 스택 (AI 어시스턴트에게 알려줄 정보)

### 백엔드

-   Python + FastAPI
-   MySQL 8.0 (utf8mb4 인코딩 필수)
-   aiomysql (SQLAlchemy ORM 사용 안함)
-   JWT 인증

### 프론트엔드

-   Next.js 15.x (App Router)
-   React 19.x
-   TypeScript
-   Tailwind CSS 4.x (CSS 기반 설정)

### 배포

-   Docker Compose로 3개 컨테이너 관리
    -   MySQL 데이터베이스
    -   FastAPI 백엔드
    -   Next.js 프론트엔드
