# 데이터베이스 스키마

## 1. 사용자 테이블 (users)

| 필드명     | 타입         | 제약조건                                                        | 설명                |
| ---------- | ------------ | --------------------------------------------------------------- | ------------------- |
| id         | INT          | PRIMARY KEY, AUTO_INCREMENT                                     | 사용자 고유 ID      |
| username   | VARCHAR(50)  | UNIQUE, NOT NULL                                                | 사용자 로그인 ID    |
| password   | VARCHAR(255) | NOT NULL                                                        | 암호화된 비밀번호   |
| email      | VARCHAR(100) | UNIQUE, NOT NULL                                                | 이메일 주소         |
| name       | VARCHAR(100) | NOT NULL                                                        | 실명 또는 표시 이름 |
| created_at | DATETIME     | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | 계정 생성 시간      |
| updated_at | DATETIME     | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 계정 정보 수정 시간 |

## 2. 프로젝트 테이블 (projects)

| 필드명      | 타입         | 제약조건                                                        | 설명                                    |
| ----------- | ------------ | --------------------------------------------------------------- | --------------------------------------- |
| id          | INT          | PRIMARY KEY, AUTO_INCREMENT                                     | 프로젝트 고유 ID                        |
| title       | VARCHAR(100) | NOT NULL                                                        | 프로젝트 제목                           |
| description | VARCHAR(255) | NOT NULL                                                        | 간략한 프로젝트 설명                    |
| content     | TEXT         | NOT NULL                                                        | 프로젝트 상세 내용 (마크다운 또는 HTML) |
| thumbnail   | VARCHAR(255) | NULL                                                            | 썸네일 이미지 URL                       |
| category    | VARCHAR(50)  | NOT NULL                                                        | 프로젝트 카테고리                       |
| github_url  | VARCHAR(255) | NULL                                                            | GitHub 저장소 URL                       |
| demo_url    | VARCHAR(255) | NULL                                                            | 데모 사이트 URL                         |
| created_at  | DATETIME     | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | 생성 시간                               |
| updated_at  | DATETIME     | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 수정 시간                               |

## 3. 프로젝트 이미지 테이블 (project_images)

| 필드명     | 타입         | 제약조건                    | 설명               |
| ---------- | ------------ | --------------------------- | ------------------ |
| id         | INT          | PRIMARY KEY, AUTO_INCREMENT | 이미지 고유 ID     |
| project_id | INT          | FOREIGN KEY, NOT NULL       | 연결된 프로젝트 ID |
| image_url  | VARCHAR(255) | NOT NULL                    | 이미지 URL         |
| alt_text   | VARCHAR(255) | NULL                        | 대체 텍스트        |
| order      | INT          | NOT NULL, DEFAULT 0         | 표시 순서          |

## 4. 기술 스택 테이블 (skills)

| 필드명 | 타입         | 제약조건                    | 설명                     |
| ------ | ------------ | --------------------------- | ------------------------ |
| id     | INT          | PRIMARY KEY, AUTO_INCREMENT | 기술 고유 ID             |
| name   | VARCHAR(50)  | UNIQUE, NOT NULL            | 기술 이름                |
| icon   | VARCHAR(255) | NULL                        | 아이콘 URL 또는 클래스명 |

## 5. 프로젝트-기술 연결 테이블 (project_skills)

| 필드명      | 타입                   | 제약조건              | 설명        |
| ----------- | ---------------------- | --------------------- | ----------- |
| project_id  | INT                    | FOREIGN KEY, NOT NULL | 프로젝트 ID |
| skill_id    | INT                    | FOREIGN KEY, NOT NULL | 기술 ID     |
| PRIMARY KEY | (project_id, skill_id) | 복합 기본 키          |             |

## 6. 문의 메시지 테이블 (contact_messages)

| 필드명     | 타입         | 제약조건                            | 설명             |
| ---------- | ------------ | ----------------------------------- | ---------------- |
| id         | INT          | PRIMARY KEY, AUTO_INCREMENT         | 메시지 고유 ID   |
| name       | VARCHAR(100) | NOT NULL                            | 보낸 사람 이름   |
| email      | VARCHAR(100) | NOT NULL                            | 보낸 사람 이메일 |
| subject    | VARCHAR(200) | NOT NULL                            | 메시지 제목      |
| message    | TEXT         | NOT NULL                            | 메시지 내용      |
| created_at | DATETIME     | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 생성 시간        |
| is_read    | BOOLEAN      | NOT NULL, DEFAULT FALSE             | 읽음 여부        |

## 7. SQL 생성 스크립트

```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  thumbnail VARCHAR(255),
  category VARCHAR(50) NOT NULL,
  github_url VARCHAR(255),
  demo_url VARCHAR(255),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE project_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  alt_text VARCHAR(255),
  `order` INT NOT NULL DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  icon VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE project_skills (
  project_id INT NOT NULL,
  skill_id INT NOT NULL,
  PRIMARY KEY (project_id, skill_id),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_read BOOLEAN NOT NULL DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 초기 관리자 계정 생성 (비밀번호는 해싱된 값으로 대체 필요)
INSERT INTO users (username, password, email, name)
VALUES ('admin', 'hashed_password_here', 'admin@example.com', '관리자');

-- 샘플 기술 데이터
INSERT INTO skills (name, icon) VALUES
('React', 'fab fa-react'),
('TypeScript', 'fab fa-js'),
('Next.js', 'fas fa-code'),
('Tailwind CSS', 'fab fa-css3'),
('FastAPI', 'fas fa-server'),
('MySQL', 'fas fa-database');
```
