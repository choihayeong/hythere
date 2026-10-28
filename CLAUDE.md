# CLAUDE.md (프로젝트 지침)

> 이 폴더는 **웹퍼블리셔(UI Developer) → 프론트엔드 개발자** 성장을 위한 프로젝트 시작 템플릿입니다.
> 새 프로젝트를 시작할 때 이 폴더를 복사해서 사용합니다.

## 기본 원칙

- 응답과 코드 주석은 **한국어**로 작성합니다. (코드 식별자는 영어)
- 사용자는 HTML/CSS/기초 JS에 익숙하지만 React·TypeScript·빌드 도구는 배우는 중입니다.
  새 개념이 나오면 **왜 그렇게 하는지 한두 줄**로 설명을 덧붙입니다.
- 시맨틱 마크업·접근성·반응형 등 퍼블리셔의 강점은 그대로 지킵니다.
- 작업을 마치면 `npm run lint`와 `npm run build`가 통과하는지 확인합니다.
- Next.js 코드를 쓰기 전에 `AGENTS.md`의 안내대로 `node_modules/next/dist/docs/`를 참고합니다.
  (설치된 버전의 API가 학습 데이터와 다를 수 있음)

## 기술 스택

- **Next.js 16 (App Router) + React 19 + TypeScript**
- 스타일: CSS Modules + SCSS (디자인 토큰은 CSS 변수, `src/styles/_variables.scss`)
- 린트/포맷: ESLint 9 (flat config, next + jsx-a11y) + Prettier
- 패키지 매니저: npm
- 경로 별칭: `@/` → `src/` (예: `import Header from '@/layouts/Header'`)
- SCSS 공용 파일은 `@use 'mixins' as *;` 처럼 짧게 불러옵니다. (`next.config.ts`의 `sassOptions`)

## 폴더 구조

```
src/
  app/           # 라우팅. 폴더 = URL, page.tsx = 화면, layout.tsx = 공통 틀
    layout.tsx   #   루트 레이아웃 (html/body, Header/Footer, 전역 스타일 import)
    page.tsx     #   "/" 페이지
    about/       #   "/about" 페이지 예시
  assets/        # 이미지, 폰트 (import해서 쓰는 것)
  styles/        # 전역 스타일: _variables(토큰), _reset, _mixins, global.scss
  components/    # 재사용 UI 컴포넌트 (Button, Modal ...)
  layouts/       # Header, Footer 등 레이아웃 조각
  hooks/         # 커스텀 훅
  utils/         # 순수 함수 유틸
  types/         # 공용 타입
public/          # 그대로 서빙되는 정적 파일 (/favicon.ico 처럼 URL로 접근)
```

### Next.js에서 주의할 점

- `src/app` 안의 컴포넌트는 기본이 **서버 컴포넌트**입니다. `useState`, `onClick` 등 브라우저 동작이
  필요한 컴포넌트는 파일 맨 위에 `'use client';`를 적습니다.
- 페이지 이동은 `<a>` 대신 `next/link`의 `<Link>`를, 이미지는 `next/image`의 `<Image>`를 우선 사용합니다.
- `<title>` 등 메타 정보는 `export const metadata` 로 선언합니다.

## 명령어

- `npm run dev` : 개발 서버 (http://localhost:3000)
- `npm run build` : 프로덕션 빌드 (타입 체크 포함)
- `npm run start` : 빌드 결과 실행
- `npm run lint` : 린트
- `npm run type-check` : 타입 체크만
- `npm run format` : 포맷

## 스킬 (`.claude/skills/`)

| 스킬                 | 용도                                                    |
| -------------------- | ------------------------------------------------------- |
| `/setup-project`     | 프로젝트 초기 세팅 (Next.js+TS, ESLint, Prettier, 폴더) |
| `/html-to-component` | 퍼블리싱된 HTML/CSS를 React 컴포넌트로 변환             |
| `/new-component`     | 규칙에 맞는 새 컴포넌트 생성                            |
| `/css-guide`         | 스타일 아키텍처·토큰·네이밍 가이드                      |
| `/a11y-check`        | 접근성·시맨틱 마크업 점검                               |
| `/explain`           | 퍼블리셔 눈높이로 개념 설명                             |
| `/review-learn`      | 학습형 코드 리뷰                                        |
| `/pre-commit-check`  | 린트·빌드 확인 후 커밋 메시지 작성                      |

## 담당 영역

- 개인별 담당 타입과 로컬 설정은 `CLAUDE.local.md`에 적습니다. (git에 올리지 않음)
