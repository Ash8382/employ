# Employ - 게시판 웹 애플리케이션

React, Next.js, TypeScript, styled-components를 사용하여 만든 반응형 게시판 앱입니다.  
회원가입, 로그인, 게시글 CRUD, 페이징 기능을 제공합니다.

---

## 프로젝트 설치 및 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/사용자명/employ.git
cd employ

npm install

NEXT_PUBLIC_API_BASE_URL=https://front-mission.bigs.or.kr

npm run dev

주요 기능
회원가입 및 로그인

JWT 토큰 기반 인증 처리

게시글 목록 조회 (페이지네이션)

게시글 작성, 수정, 삭제

반응형 UI (styled-components 활용)

employ/
├── components/      # 재사용 컴포넌트
├── pages/           # Next.js 페이지 (라우팅)
├── styles/          # 전역 스타일 (styled-components)
├── types/           # TypeScript 타입 정의
├── utils/           # API 호출 및 인증 유틸
└── constants/       # 상수값
```
