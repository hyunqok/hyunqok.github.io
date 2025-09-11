# API 스키마

## 1. 인증 API

### 1.1 로그인

-   **엔드포인트**: `/api/auth/login`
-   **메서드**: `POST`
-   **요청 본문**:
    ```json
    {
    	"username": "string",
    	"password": "string"
    }
    ```
-   **응답**:
    ```json
    {
    	"access_token": "string",
    	"token_type": "string"
    }
    ```

### 1.2 로그아웃

-   **엔드포인트**: `/api/auth/logout`
-   **메서드**: `POST`
-   **인증**: 필요
-   **응답**:
    ```json
    {
    	"message": "성공적으로 로그아웃되었습니다."
    }
    ```

## 2. 프로젝트 API

### 2.1 프로젝트 목록 조회

-   **엔드포인트**: `/api/projects`
-   **메서드**: `GET`
-   **쿼리 파라미터**: `page`, `limit`, `category`
-   **응답**:
    ```json
    {
    	"items": [
    		{
    			"id": "integer",
    			"title": "string",
    			"description": "string",
    			"thumbnail": "string",
    			"category": "string",
    			"created_at": "datetime"
    		}
    	],
    	"total": "integer",
    	"page": "integer",
    	"limit": "integer"
    }
    ```

### 2.2 프로젝트 상세 조회

-   **엔드포인트**: `/api/projects/{id}`
-   **메서드**: `GET`
-   **응답**:
    ```json
    {
    	"id": "integer",
    	"title": "string",
    	"description": "string",
    	"content": "string",
    	"thumbnail": "string",
    	"images": ["string"],
    	"category": "string",
    	"skills": ["string"],
    	"github_url": "string",
    	"demo_url": "string",
    	"created_at": "datetime",
    	"updated_at": "datetime"
    }
    ```

### 2.3 프로젝트 생성

-   **엔드포인트**: `/api/projects`
-   **메서드**: `POST`
-   **인증**: 필요
-   **요청 본문**:
    ```json
    {
    	"title": "string",
    	"description": "string",
    	"content": "string",
    	"thumbnail": "string",
    	"category": "string",
    	"skills": ["string"],
    	"github_url": "string",
    	"demo_url": "string"
    }
    ```
-   **응답**: (생성된 프로젝트 객체)

### 2.4 프로젝트 수정

-   **엔드포인트**: `/api/projects/{id}`
-   **메서드**: `PUT`
-   **인증**: 필요
-   **요청 본문**: (2.3과 동일)
-   **응답**: (수정된 프로젝트 객체)

### 2.5 프로젝트 삭제

-   **엔드포인트**: `/api/projects/{id}`
-   **메서드**: `DELETE`
-   **인증**: 필요
-   **응답**:
    ```json
    {
    	"message": "프로젝트가 성공적으로 삭제되었습니다."
    }
    ```

## 3. 이미지 관리 API

### 3.1 이미지 업로드

-   **엔드포인트**: `/api/images`
-   **메서드**: `POST`
-   **인증**: 필요
-   **요청**: multipart/form-data
-   **응답**:
    ```json
    {
    	"url": "string"
    }
    ```

## 4. 문의 API

### 4.1 문의 메시지 전송

-   **엔드포인트**: `/api/contact`
-   **메서드**: `POST`
-   **요청 본문**:
    ```json
    {
    	"name": "string",
    	"email": "string",
    	"subject": "string",
    	"message": "string"
    }
    ```
-   **응답**:
    ```json
    {
    	"id": "integer",
    	"created_at": "datetime",
    	"message": "메시지가 성공적으로 전송되었습니다."
    }
    ```

### 4.2 문의 메시지 목록 조회

-   **엔드포인트**: `/api/contact`
-   **메서드**: `GET`
-   **인증**: 필요
-   **응답**:
    ```json
    {
    	"items": [
    		{
    			"id": "integer",
    			"name": "string",
    			"email": "string",
    			"subject": "string",
    			"message": "string",
    			"created_at": "datetime",
    			"is_read": "boolean"
    		}
    	],
    	"total": "integer"
    }
    ```
