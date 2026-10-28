# Hythere! — 최하영 포트폴리오

프론트엔드 및 UI 개발자 최하영의 포트폴리오 사이트입니다.

## 구성

- **홈** `/` — 히어로, About, Careers(타임라인), Strength, 최근 프로젝트, 연락처
- **All works** `/projects` — 참여 프로젝트 전체 목록, 카테고리 필터
- **UI Kit** `/component` — 이 사이트에서 쓰는 재사용 컴포넌트 쇼케이스

## 기술 스택

- Next.js 16 (App Router) · React 19 · TypeScript
- SCSS + CSS Modules, 디자인 토큰은 CSS 변수 (`src/styles/_variables.scss`)
- Pretendard (다이내믹 서브셋으로 자체 호스팅)
- ESLint (next + jsx-a11y) · Prettier
- 배포: Vercel

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드 (타입 체크 포함)
npm run lint
```

## 콘텐츠 수정하기

코드가 아니라 데이터 파일만 고치면 됩니다.

| 내용            | 파일                                                       |
| --------------- | ---------------------------------------------------------- |
| 소개 문구       | `src/data/about.ts`                                        |
| 경력            | `src/data/careers.ts`                                      |
| 강점·기술 태그  | `src/data/strengths.ts`                                    |
| 프로젝트 목록   | `src/data/works.json` (`exposure: 1` 인 항목만 노출)       |
| 프로젝트 썸네일 | `public/works/{id}.jpg` + `src/data/thumbnails.ts` 의 id   |
| 연락처          | `src/app/page.tsx` 의 `CONTACT`, `src/layouts/Footer`      |
| 로고·파비콘     | `src/components/Logo`, `src/app/icon.svg`, `public/logo.*` |

## 폴더 구조

```
src/
  app/          # 라우팅 (폴더 = URL). layout, page, not-found, icon, opengraph-image
  components/   # Hero, Timeline, WorkCard, WorkList, Logo, Button, Modal ...
  layouts/      # Header, Footer, Section
  data/         # 화면에 들어가는 콘텐츠 데이터
  styles/       # 토큰(_variables), 리셋, 믹스인, 전역 스타일
  utils/        # 순수 함수 (works 가공, 시드 난수)
  types/        # 공용 타입
public/         # 정적 파일 (logo, works 썸네일)
docs/           # 기존 사이트 분석 리포트, 개선 계획
```

## 문서

- `docs/ui-analysis.md` — 리뉴얼 전 운영 사이트 분석
- `docs/improvement-plan.md` — 개선 우선순위와 반영 내역
