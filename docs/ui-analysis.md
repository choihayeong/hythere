# Web UI 분석 — hythere22.vercel.app (최하영 포트폴리오)

> web-ui-analysis 스킬로 생성한 **현재 상태 참고 문서**입니다. 합격/불합격 감사가 아니라 리뉴얼 범위를 잡기 위한 기술서입니다.
> 분석 목적: `renewal` (이 Next.js 프로젝트로 재구축)

## 1. 개요

- **분석 URL:** `https://hythere22.vercel.app/` (홈), `https://hythere22.vercel.app/projects` (라우터에 정의돼 있으나 직접 접근 시 404)
- **뷰포트:** desktop 1440×900 (DPR 1) / iPhone 14 프로필 390×664 (DPR 3, iOS Safari UA)
- **모바일 전달 모델:** `responsive` (같은 URL, 리다이렉트 없음)
  - 기기 프로필·엔진: Playwright `devices['iPhone 14']` (실제 iOS UA + 터치 + DPR 3) 를 로컬 Chrome(headless)로 에뮬레이션. Claude in Chrome 확장이 꺼져 있어 Playwright 스크립트로 대체함. UA 스니핑 경로까지 실제로 통과했으므로 근사가 아닌 정식 모바일 패스.
- **뷰포트 축:** 아래 발견은 특별히 표시하지 않으면 **both**(데스크톱·모바일 동일). 값이 다른 곳만 나란히 표기.
- **날짜:** 2026-10-28
- **범위:** 사실상 단일 페이지(SPA). `/projects` 라우트는 코드에 있지만 Vercel SPA 리라이트가 없어 직접 접근하면 Vercel 기본 404가 뜸.
- **상호작용 차단 요소(완전성):** 없음. 프로브가 `div.light`(히어로 섹션의 장식용 absolute 레이어, 뷰포트 100% 덮음)를 오버레이로 보고했으나 모달/동의창이 아니며 스크롤도 정상 진행(`scrolled: true`). 발견은 모두 전체 로드 후 결과.

## 2. 프레임워크·라이브러리

| 라이브러리                                      | 상태           | 근거 신호                                                                                | 비고                                                |
| ----------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Vue 3                                           | loaded+used    | DOM에 `__vue_app__` 인스턴스, `data-v-app`, `window.__VUE__` 전역, scoped CSS `data-v-*` | SPA. Composition API(`setup`) 사용                  |
| vue-router                                      | loaded+used    | 번들 내 `RouterLink`/`RouterView`, 라우트 `home`, `projects`, 전환 이름 `fade-transform` | history 모드 추정 (`popstate` 리스너)               |
| Vite                                            | loaded+used    | `/assets/*-[hash].js                                                                     | css`명명,`modulepreload` 링크, ESM 번들             | 빌드 도구 |
| React / jQuery / lodash / GSAP / Lenis / Lottie | not-loaded     | 전역·DOM·네트워크 신호 없음                                                              | 애니메이션은 전부 CSS `@keyframes`                  |
| 웹폰트(Pretendard)                              | **not-loaded** | `font-family`에 Pretendard 선언만 있고 `@font-face`·`<link>`·폰트 요청이 없음            | 사용자 PC에 설치돼 있지 않으면 시스템 폰트로 대체됨 |

> "loaded" = 파일 요청됨, "loaded+used" = 확정 런타임 신호 1개 이상 또는 독립 신호 2개 이상.

## 3. CSS 아키텍처

- **방법론·관례:** BEM(`timeline__panel`, `air--01`, `main-section--visual`) + Vue scoped CSS(`[data-v-xxxx]` 속성 셀렉터). 리셋은 Eric Meyer 계열 전역 리셋 + `box-sizing:border-box`. `.blind` 스크린리더 전용 클래스 있음.
- **디자인 시스템·토큰:** CSS 커스텀 프로퍼티 **없음**(별 위치용 `--star-top/left/size` 인라인 값만 존재). 색상·여백이 전부 하드코딩. 추출한 실제 팔레트:
  - 다크 네이비 `#1f2c37` (본문 글자색, 히어로 그라데이션 시작, `::selection`, `theme-color`)
  - 바이올렛 `#5a5aff` (강조, 포커스 링, 보더, 프로젝트 hover 밑줄)
  - 레몬 `#fff689` (hover 텍스트, 다크 모드 강조)
  - 회색 `#e9ecef`, `#ccc`, `#6c757d`(설명 텍스트)
  - 타임라인 아이콘 색: 검정/흰색, `#fee101`(B DOT), `#bfdba7`(GitHub)
  - 타이포: body 18px/1.25, 섹션 제목 48px→36px→28px, 타임라인 제목 28px→24px→18px, 히어로 `10vw`→`6vw`→60px
  - 섹션 패딩 `160px 60px`→`70px 20px`→`70px 0`, 컨테이너 `max-width:1440px`
- **브레이크포인트(사이트 전역):** `width <= 1440px`, `<= 1025px`, `<= 769px` (max-width 기준 데스크톱 퍼스트, CSS 범위 문법 사용). `prefers-reduced-motion: reduce` 대응 있음.
  - 참고: 스킬 프로브는 `(max-width: Npx)` 형태만 인식해 범위 문법(`width<=769px`)을 놓침. 수동으로 CSS를 읽어 복구함.
- **크로스오리진 시트:** 없음. CSS 2개 모두 same-origin이며 전부 읽힘.
- **데드 CSS:** `.header`, `.table`, `.projects__list table`, `.work-info__*`, `.contents`, `.section`, `.main.black`(다크 테마) 규칙이 있으나 DOM에 해당 요소가 없음. 이전 버전 잔재로 추정.

## 4. JS 아키텍처

- **전역 네임스페이스:** `__VUE__`, `__VUE_INSTANCE_SETTERS__`, `__VUE_SSR_SETTERS__` (Vue 런타임이 추가). 사이트 자체 전역 없음.
- **모듈 시스템:** `<script type="module">` 1개 + `modulepreload` 2개. import map 없음. ESM 추가 가능.
- **주요 패턴:**
  - 프로젝트 데이터가 별도 청크 `work-*.js`에 **정적 배열**로 내장(39건, `exposure===1` 필터 후 26건 노출). 필드: `id, exposure, category, title, start_date, end_date, open_date, summary, link, description[]`.
  - 히어로 별 300개를 `v-for`로 렌더링(각각 `div.star` + 인라인 CSS 변수 + keyframe 애니메이션).
  - 상태 관리·API 호출 없음. 완전 정적.

## 5. 자산 로딩

- **자산 요약:** 총 6개 요청, 전부 same-origin, 서드파티 0.
  - 문서 1 (1.2KB), JS 3 (총 ~116KB raw: `index` 94KB, `work` 15KB, `Home` 7KB), CSS 2 (총 ~11.5KB), favicon 1
  - 이미지 0개 (`<img>` 없음, 히어로 파도는 data-URI SVG 배경)
- **캐시 버스팅:** Vite 해시 파일명(`index-CIgarMl8.js`). 프로브는 해시 패턴을 `.[hash].js`로만 봐서 `-[hash].js`를 `none`으로 오판 — 실제는 `hashed`.
- **지연 로딩:** `loading="lazy"` 0, IntersectionObserver 없음, 라우트 단위 동적 import는 Vite가 처리(`Home-*.js` 분리).

## 6. 커스텀 UI 시스템·API

- **감지된 UI 런타임:** 없음. 모달·토스트·탭·캐러셀 등 상호작용 컴포넌트가 0개. 유일한 상호작용은 외부 링크 28개의 hover 효과.
- **공개 JS API:** 없음.
- **커스텀 이벤트:** 없음 (번들 스크립트라 탐지 한계 있으나, 코드 검토상 `popstate` 등 표준 이벤트만 존재).
- **차단 오버레이:** 없음 (`div.light`는 장식).

## 7. 마크업 시맨틱

- **페이지 아웃라인:**
  - h1 `Hythere!` (인사말이 h1이고 이름 "choi hayeong"은 `div`)
  - h2 `Careers` → h3 `CTTD 사원 / Frontend Development`, h3 `B DOT CREATIVE 사원 / 마크업개발팀`
  - h2 `Strength` → h3 `Javascript`, h3 `vue.js`, h3 `html5/css3`
  - h2 `Projects` (하위 항목 26개는 `span`으로만 구성, 제목 레벨 없음)
- **랜드마크:** `main` 1, `footer`(contentinfo) 1, `section` 4 (모두 `aria-label` 없음 → 이름 없는 region). **`header`/`nav` 없음**, skip link 없음.
- **WAI-ARIA 사용:** 작성된 `role=`·`aria-*` 속성 **0개**.
- **컴포넌트 인벤토리(렌더링된 DOM 기준, DOM 511노드):**
  - **확정(네이티브 태그 + ARIA 역할):** `link` 28개 (프로젝트 26 + GitHub + Detail). button/input/dialog 등 0.
  - **웹 컴포넌트:** 없음.
  - **휴리스틱(클래스명 추론):** 0 (BEM 블록명이 `timeline`, `strength`, `projects-list`, `air`, `star`라 스킬 패밀리 사전에 없음). 실제 UI 조각은 **타임라인, 태그 리스트, 강점 카드 3종, 프로젝트 그리드, 히어로(별·파도)** 5종.
  - **격차(리뉴얼 관점):** 작성된 ARIA 0 vs 확정 역할 28 — 역할이 전부 네이티브 `<a>`에서 나오므로 시맨틱 부채는 적음. 다만 `section`에 이름이 없고, 프로젝트 항목이 제목 구조 없이 `span`만으로 돼 있으며, `strength__content` 본문이 `<br>`로 줄을 끊은 텍스트 덩어리(리스트 아님)인 점은 고칠 대상.

## 8. UX·접근성

- **관찰:**
  - [both] `axe` 위반: `color-contrast` serious 1건 — "DETAIL" 링크(`opacity:.2`, 12vw 크기)가 배경 대비 미달.
  - [both] 프로젝트 제목 hover 색 `#fff689`(레몬)이 흰 배경 위라 hover 중 대비가 거의 없음.
  - [both] 외부 링크 28개가 모두 `target="_blank"`인데 새 창 열림을 알리는 텍스트/아이콘 없음. `rel="noopener noreferrer"`는 적용됨.
  - [both] `PAULMADE MALL` 항목의 `href=""` → 클릭 시 같은 페이지가 새 탭으로 열림(깨진 링크).
  - [both] 내비게이션이 없어 섹션 이동이 스크롤뿐. 페이지가 데스크톱 4,534px / 모바일 15,831px로 길어 모바일에서 특히 이동 비용이 큼.
  - [mobile-only] 프로젝트 그리드가 2열로 줄지만 제목·요약이 중앙 정렬된 채 줄바꿈이 많아 스캔이 어려움. 타임라인은 아이콘 80px 좌측 정렬로 잘 대응됨.
  - [both] 히어로 별 300개가 각각 무한 keyframe 애니메이션 → 저사양 기기에서 CPU 부담. `prefers-reduced-motion`은 처리됨.
  - [both] Pretendard 폰트가 실제로 로드되지 않아 디자인 의도와 다르게 렌더링될 가능성.
  - [both] 푸터 저작권이 `2023`으로 고정. `og:image` 없음.
  - [both] 프로젝트 데이터에 기간·카테고리·상세 설명이 있는데 화면에는 제목·요약만 노출돼 정보가 묻힘.
  - 포커스 링(`:focus-visible` 3px `#5a5aff`)은 잘 돼 있음. `lang="ko"`, `meta description`, OG 태그는 갖춰짐.
- **Lighthouse:** 미실행(Chrome DevTools MCP 비활성). axe-core 4.10 결과로 대체.
- **스펙 참고(리뉴얼 시):** WCAG 2.2 1.4.3(대비), 2.4.1(블록 건너뛰기), 2.4.6(제목·레이블), 3.2.5/G201(새 창 알림). 필요 시 `a11y-specs` 스킬로 원문 확인.

## 9. 통합 노트 (리뉴얼)

- **ESM 추가 가능?** 해당 없음 — 기존 사이트에 끼워 넣지 않고 Next.js로 전면 재구축.
- **캐시 버스팅:** Next.js 빌드가 자동으로 해시 처리. 별도 대응 불필요.
- **기존 UI 시스템 훅:** 없음. 재사용할 것은 **콘텐츠(경력·강점·프로젝트 데이터)와 시각 아이덴티티(색·히어로 연출)** 뿐이며, 프로젝트 데이터는 `work-*.js`에서 JSON으로 추출해 `src/data/works.json`으로 가져옴.
- **리스크·주의:**
  - `/projects` 404: 새 사이트에서는 App Router가 파일 기반이라 자동 해결되지만, 기존 URL과의 호환을 원하면 같은 경로를 만들어야 함.
  - 히어로의 별·파도·그라데이션은 CSS만으로 구현돼 있어 그대로 이식 가능. 별 개수는 줄이고 `will-change`/`opacity`만 애니메이션하도록 정리.
  - 프로젝트 외부 링크 중 `http://` 2건(korloy, haesungind)과 빈 링크 1건은 데이터 정리 필요.

## 부록 A. 추출 데이터

- `src/data/works.json` — 프로젝트 39건 원본(`exposure` 포함). 카테고리 토큰: 구축, 기업사이트, 관리자 페이지, 운영, 쇼핑몰, 이커머스, 고도몰, 반응형, mobile-first, 유지보수, 리뉴얼, 그누보드, APP, 하이브리드앱, 적응형, 제안, 사이드 프로젝트.
- 경력 2건, 강점 태그 12개, 강점 카드 3종은 리포트 §7 아웃라인과 원문 텍스트 기준으로 코드에 옮김.
