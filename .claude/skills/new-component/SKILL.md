---
name: new-component
description: 프로젝트 규칙에 맞는 새 React 컴포넌트(tsx + module.scss + index.ts)를 생성한다. "컴포넌트 만들어줘", "Button 컴포넌트 추가", "새 컴포넌트" 요청 시 사용.
---

# 새 컴포넌트 생성

## 1. 확인할 것

- 이름은 **PascalCase** (`PrimaryButton`). 사용자가 소문자로 말해도 변환한다.
- 위치: 재사용 UI → `components/`, 레이아웃 → `layouts/`, 라우트(페이지) → `app/<경로>/page.tsx`
- 상태(`useState`)·이벤트(`onClick`)·브라우저 API를 쓰면 파일 맨 위에 `'use client';` 를 넣는다.
  (Next.js App Router에서는 기본이 서버 컴포넌트라 브라우저 기능을 쓸 수 없기 때문)
- 내부 링크는 `<a>` 대신 `next/link`의 `<Link>` 를 쓴다.
- 같은 이름이 이미 있으면 만들지 말고 알려준다.
- 비슷한 컴포넌트가 있으면 (예: `Button` 있는데 `IconButton` 요청) 확장할지 새로 만들지 묻기 전에 **추천안을 제시**하고 진행한다.

## 2. 파일 구조

```
src/components/<Name>/
  <Name>.tsx
  <Name>.module.scss
  index.ts
```

## 3. 컴포넌트 템플릿

```tsx
import styles from './<Name>.module.scss';

/** <Name> 컴포넌트 props */
export interface <Name>Props {
  /** 안에 들어갈 내용 */
  children: React.ReactNode;
  /** 시각적 종류 */
  variant?: 'primary' | 'secondary';
  /** 추가 클래스 (외부 레이아웃용) */
  className?: string;
}

export default function <Name>({ children, variant = 'primary', className }: <Name>Props) {
  const classes = [styles.root, styles[variant], className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
}
```

규칙:

- `export default function` + named `Props` interface
- 모든 prop에 JSDoc 한 줄 주석 (퍼블리셔가 나중에 읽을 때 이해되도록)
- 네이티브 요소를 감싸는 컴포넌트는 `React.ButtonHTMLAttributes<HTMLButtonElement>` 등을 `extends` 해서 `onClick`, `disabled`, `aria-*`를 그대로 받게 한다.
- 루트 클래스명은 `root`, 변형은 `variant` 값과 같은 이름으로 둔다.
- 접근성: 클릭 가능한 것은 `<button>`, 링크는 `<a>`, 아이콘만 있으면 `aria-label` 필수.

## 4. 스타일 템플릿

```scss
@use 'mixins' as *; // next.config.ts의 sassOptions 덕분에 짧은 경로로 불러온다

.root {
  // 토큰만 사용. 하드코딩 색상 금지.
  color: var(--color-text);
  padding: var(--space-2) var(--space-4);

  @include mq(md) {
    padding: var(--space-3) var(--space-6);
  }
}

.primary {
  background: var(--color-primary);
}
.secondary {
  background: var(--color-surface);
}
```

## 5. index.ts

```ts
export { default } from './<Name>';
export type { <Name>Props } from './<Name>';
```

## 6. 마무리

- 사용 예시를 한 번 보여준다 (`<Name variant="secondary">텍스트</Name>`).
- 새로 쓴 React/TS 문법이 있으면 (제네릭, 유니온 타입, spread 등) 한 줄씩 설명한다.
- `npm run lint` 통과 확인.
