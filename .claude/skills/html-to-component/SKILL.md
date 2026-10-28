---
name: html-to-component
description: 퍼블리싱된 정적 HTML/CSS(또는 디자인 시안)를 React + TypeScript 컴포넌트로 변환한다. "HTML을 컴포넌트로", "퍼블리싱 결과물 리액트로 옮기기", "이 마크업 컴포넌트화" 요청 시 사용.
---

# HTML → React 컴포넌트 변환

퍼블리셔가 가장 자주 하게 될 작업이다. 마크업과 스타일은 최대한 **그대로 살리고**,
React 문법으로 바꿀 때 달라지는 부분을 **명시적으로 설명**한다.

## 1. 입력 확인

- 변환 대상: HTML 파일 경로, 붙여넣은 마크업, 또는 Figma 링크
- 기존 `src/components/`, `src/styles/_variables.scss`를 먼저 읽어 **이미 있는 컴포넌트·토큰을 재사용**한다.
- 반복되는 블록(카드, 리스트 아이템 등)이 보이면 분리할 컴포넌트 후보를 먼저 제안하고 진행한다.

## 2. 변환 규칙 (HTML → JSX)

| HTML                     | JSX                            | 이유                    |
| ------------------------ | ------------------------------ | ----------------------- |
| `class`                  | `className`                    | `class`는 JS 예약어     |
| `for`                    | `htmlFor`                      | `for`는 JS 예약어       |
| `onclick="..."`          | `onClick={fn}`                 | 문자열이 아닌 함수 전달 |
| `style="color:red"`      | `style={{ color: 'red' }}`     | 객체로 전달, camelCase  |
| `tabindex`, `readonly`   | `tabIndex`, `readOnly`         | camelCase               |
| `<!-- 주석 -->`          | `{/* 주석 */}`                 | JSX 주석 문법           |
| `<img>` `<br>` `<input>` | `<img />` `<br />` `<input />` | 반드시 닫기             |
| 형제 요소 여러 개        | `<>...</>` 로 감싸기           | 컴포넌트는 루트 하나    |
| `<a href="#">` 버튼 용도 | `<button type="button">`       | 시맨틱·접근성           |
| SVG `stroke-width`       | `strokeWidth`                  | 속성 camelCase          |

## 3. 스타일 변환

- 기본: **CSS Modules** (`Button.module.scss`) → `className={styles.button}`
- 전역 클래스가 꼭 필요하면 `:global(.className)` 사용
- 하드코딩된 색·간격은 `var(--color-primary)` 같은 **토큰으로 치환**하고, 치환한 값은 목록으로 알려준다.
- BEM(`block__element--modifier`)으로 짜여 있으면 CSS Modules에서는 `block`이 파일 단위이므로 `element`, `modifier`만 남긴다.

## 4. 데이터·상태 추출

- 반복 마크업 → `data.map(item => <Card key={item.id} {...item} />)`
- 텍스트·이미지 경로 → props로 뺀다 (`title`, `imageSrc`, `href`)
- 상태(열림/닫힘, 활성 탭 등) → `useState`
- 처음에는 **props 타입(interface)** 을 꼭 정의하고 각 prop에 한 줄 주석을 단다.

## 5. 산출물

```
src/components/Card/
  Card.tsx
  Card.module.scss
  index.ts           # export { default } from './Card'
```

변환이 끝나면 다음을 보고한다:

1. 바뀐 속성명 목록 (`class→className` 등)
2. 분리한 컴포넌트와 그 이유
3. 토큰으로 치환한 값
4. 접근성 보완 사항 (`/a11y-check` 기준)
5. 그대로 옮기지 못한 부분 (jQuery 의존 코드, inline script 등)과 대안

## 6. 검증

`npm run lint && npm run build` 통과 확인. 가능하면 `npm run dev`로 렌더 결과를 확인한다.
