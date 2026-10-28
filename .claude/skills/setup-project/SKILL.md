---
name: setup-project
description: 프로젝트 초기 세팅. 빈 폴더에 Next.js(App Router)+TypeScript, SCSS(CSS Modules), ESLint, Prettier, 폴더 구조, 전역 스타일(reset·토큰)을 만든다. "프로젝트 세팅", "초기 설정", "처음 시작", "스캐폴딩" 요청 시 사용.
---

# 프로젝트 초기 세팅

퍼블리셔가 프론트엔드 프로젝트를 처음 시작할 때 필요한 것을 한 번에 세팅한다.
각 단계마다 **무엇을 왜 설치하는지** 한 줄로 설명한다.

## 0. 먼저 확인

- `package.json`이 이미 있으면 덮어쓰지 말고 부족한 것만 추가한다.
  (이 템플릿은 이미 세팅되어 있다. 보통은 `npm install` 만 필요하다.)
- 사용자가 스택을 지정하지 않았으면 기본값을 쓴다:
  **Next.js (App Router) + TypeScript + SCSS(CSS Modules) + ESLint + Prettier**
- 다른 선택지(Vite, Astro, Tailwind 등)를 사용자가 말하면 그에 맞춘다.

## 1. 스캐폴딩

폴더에 `CLAUDE.md` 등 파일이 이미 있으면 `create-next-app`이 거부하므로,
임시 폴더에 생성한 뒤 필요한 파일만 옮긴다.

```bash
npx create-next-app@latest <임시폴더> --ts --app --src-dir --eslint --no-tailwind \
  --import-alias "@/*" --use-npm --skip-install --disable-git --yes
# tsconfig.json, next-env.d.ts, AGENTS.md, src/app/favicon.ico 만 복사
npm install
npm install -D sass prettier eslint-config-prettier eslint-plugin-jsx-a11y
```

- `sass`: SCSS 사용 (퍼블리셔에게 익숙한 중첩·변수·믹스인)
- `prettier` + `eslint-config-prettier`: 코드 포맷 자동화, ESLint와 충돌 방지
- `eslint-plugin-jsx-a11y`: JSX 접근성 린트 (퍼블리셔 강점 유지)
- Tailwind는 끈다: 토큰 기반 SCSS로 CSS 실력을 그대로 활용하기 위해

## 2. 폴더 구조 생성

```
src/
  app/
    layout.tsx         # 루트 레이아웃 (html/body, Header/Footer, global.scss import)
    layout.module.scss
    page.tsx           # "/"
    page.module.scss
  assets/
  styles/
    _variables.scss    # 디자인 토큰 → CSS 변수
    _reset.scss
    _mixins.scss       # mq(), visually-hidden, focus-ring
    global.scss        # 위 셋을 모아서 layout.tsx에서 import
  components/
  layouts/
    Header/  Footer/   # tsx + module.scss + index.ts
  hooks/
  utils/
  types/
public/
```

빈 폴더에는 `.gitkeep`을 넣어 커밋되게 한다.

## 3. 전역 스타일

`src/styles/_variables.scss` 에 CSS 변수로 토큰을 정의한다 (색·간격·폰트·브레이크포인트).
SCSS 변수가 아닌 **CSS 변수(`--color-primary`)** 로 두는 이유: 런타임 테마 변경, 브라우저 devtools에서 바로 확인 가능.
`_mixins.scss` 에 반응형 믹스인(`@mixin mq($bp)`)을 넣는다.
자세한 규칙은 `/css-guide` 스킬 참조.

## 4. 설정 파일

- `.prettierrc`: `{ "semi": true, "singleQuote": true, "printWidth": 100, "trailingComma": "all" }`
- `eslint.config.mjs`: `eslint-config-next` 기본 설정에 jsx-a11y **recommended 규칙**과 `eslint-config-prettier/flat` 추가.
  jsx-a11y 플러그인은 `eslint-config-next`가 이미 등록하므로 `rules`만 덧붙인다. (다시 등록하면 "Cannot redefine plugin" 오류)
- `next.config.ts`: `sassOptions.includePaths`와 `loadPaths`에 `src/styles`를 넣어 `@use 'mixins' as *;` 가 어디서든 동작하게 한다.
- `tsconfig.json`: create-next-app 기본값 유지 (`@/*` → `src/*` 별칭 포함)
- `.editorconfig`, `.vscode/settings.json` (저장 시 포맷, 기본 포매터 Prettier), `.vscode/extensions.json`
- `package.json` scripts: `dev`, `build`, `start`, `lint`(`eslint .`), `type-check`, `format`

## 5. 샘플 코드 정리

create-next-app이 만든 `globals.css`, `page.module.css`, 로고 SVG, Geist 폰트 로딩을 지우고
`layout.tsx`에 `<header>`, `<main id="main">`, `<footer>` + 본문 건너뛰기 링크만 남긴다. `lang="ko"`.
폰트는 시스템 폰트 스택(Pretendard → Apple SD Gothic Neo → Noto Sans KR)을 CSS 변수로 둔다.
(`next/font/google`은 빌드 시 네트워크가 필요해 템플릿 기본값으로는 피한다.)

## 6. 검증

```bash
npm run lint && npm run build
```

통과하면 완료 보고. 실패하면 원인과 수정 내용을 설명한다.

## 7. 마무리

- `CLAUDE.md`의 기술 스택·폴더 구조 섹션이 실제와 다르면 갱신한다.
- 사용자에게 `CLAUDE.local.md`에 담당 영역을 적도록 안내한다.
