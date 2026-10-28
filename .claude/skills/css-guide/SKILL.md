---
name: css-guide
description: 스타일 아키텍처 가이드. 디자인 토큰(CSS 변수), SCSS 구조, CSS Modules 네이밍, 반응형 믹스인, 기존 CSS 리팩터링 규칙. "스타일 어떻게 짜야", "토큰 정리", "CSS 구조", "SCSS 변수" 관련 질문·작업 시 사용.
---

# 스타일 가이드

퍼블리셔의 CSS 실력을 컴포넌트 기반 구조에 맞게 옮기는 규칙이다.

## 1. 계층

```
styles/
  _variables.scss   # 토큰 → :root { --color-primary: ... }
  _reset.scss       # 리셋 (modern-normalize 수준)
  _mixins.scss      # mq(), visually-hidden, line-clamp 등
  _typography.scss  # 전역 타이포 (h1~h6, body)
  global.scss       # 위 파일들 @use 로 모음. app/layout.tsx에서 한 번만 import
```

컴포넌트 스타일은 **항상 `*.module.scss`** 로 컴포넌트 옆에 둔다. 전역 파일에 컴포넌트 스타일을 넣지 않는다.

## 2. 디자인 토큰

- 토큰은 **CSS 변수**로 선언한다. SCSS 변수(`$primary`)는 컴파일 시 사라져 devtools에서 못 보고 테마 전환이 안 된다.
- 네이밍: `--{카테고리}-{이름}-{단계}`
  - 색: `--color-primary`, `--color-primary-hover`, `--color-text`, `--color-text-muted`, `--color-surface`, `--color-border`
  - 간격: `--space-1`(4px) ~ `--space-12`(48px), 4px 배수
  - 글자: `--font-size-sm/md/lg/xl`, `--font-weight-regular/bold`, `--line-height-tight/normal`
  - 반경·그림자: `--radius-sm/md/lg`, `--shadow-sm/md`
  - z-index: `--z-dropdown: 100`, `--z-modal: 1000`, `--z-toast: 2000`
- 다크 모드는 `[data-theme="dark"]` 셀렉터에서 변수만 재정의한다.
- Figma 변수가 있으면 이름을 최대한 맞춘다.

## 3. 반응형

- 모바일 우선. `min-width` 만 사용.
- 브레이크포인트는 SCSS 맵 + 믹스인:

```scss
$breakpoints: (
  sm: 640px,
  md: 768px,
  lg: 1024px,
  xl: 1280px,
);
@mixin mq($bp) {
  @media (min-width: map-get($breakpoints, $bp)) {
    @content;
  }
}
```

- 미디어쿼리는 셀렉터 **안쪽**에 중첩해서 쓴다 (속성과 가까이).

## 4. CSS Modules 네이밍

- 클래스는 camelCase (`.cardTitle`). `styles.cardTitle`로 접근하므로 하이픈을 쓰면 대괄호 접근이 되어 불편하다.
- 루트는 `.root`, 상태는 `.isActive`, `.isOpen`, 변형은 `.primary`, `.large`
- BEM의 `block__`은 파일이 대신한다. `element`와 `modifier`만 남긴다.
- 전역 셀렉터가 꼭 필요할 때만 `:global(.swiper-slide)`

## 5. 금지·주의

- `!important` 금지 (서드파티 override 시만 `:global` 안에서 허용, 주석 필수)
- 하드코딩 색·간격 금지 → 토큰 사용. 토큰에 없으면 토큰을 추가하고 알린다.
- 중첩은 3단계까지. 더 깊으면 컴포넌트를 쪼갠다.
- id 셀렉터 사용 금지.
- 인라인 `style={{}}`은 동적 값(차트 높이, 진행률)에만.

## 6. 기존 CSS 리팩터링 절차

1. 색·간격 값을 전부 추출해 빈도순으로 보여준다.
2. 토큰 후보를 제안하고 승인 후 `_variables.scss`에 추가한다.
3. 컴포넌트 단위로 `*.module.scss`로 분리한다.
4. 각 단계마다 `npm run build`로 깨지지 않는지 확인한다.

## 7. Tailwind를 선택한 프로젝트라면

- 토큰은 `tailwind.config` `theme.extend`에 정의하고 CSS 변수와 연결한다.
- 반복 클래스 묶음은 `@apply` 대신 컴포넌트로 추출한다.
- 이 경우 위 2, 3, 4항의 네이밍 규칙은 적용하지 않는다.
