---
name: a11y-check
description: 컴포넌트·페이지의 접근성과 시맨틱 마크업을 점검하고 수정안을 제시한다. "접근성 확인", "a11y", "시맨틱 검토", "웹 접근성", "키보드 동작", "스크린리더" 요청 시 사용. 변환·생성 작업 마무리 단계에서도 호출.
---

# 접근성 점검

퍼블리셔의 강점을 React 환경에서도 유지한다. 점검 → 심각도 분류 → 수정 순으로 진행한다.

## 1. 대상 파악

- 사용자가 지정한 파일, 없으면 최근 변경된 `*.tsx` 파일
- 린트가 있으면 먼저 실행하고 `jsx-a11y` 규칙 결과를 포함한다: `npx eslint src --ext .tsx`

## 2. 체크리스트

### 구조·시맨틱

- [ ] 페이지에 `<main>` 하나, `<header>`/`<nav>`/`<footer>` 랜드마크
- [ ] 제목 레벨이 순서대로 (h1 → h2 → h3, 건너뛰기 없음)
- [ ] 목록은 `<ul>/<ol>`, 표는 `<table>` + `<th scope>`
- [ ] `<div onClick>` → `<button>`, `<a>` 는 반드시 `href` 있음
- [ ] 아이콘만 있는 버튼에 `aria-label`

### 이미지·미디어

- [ ] 모든 `<img>`에 `alt` (장식용은 `alt=""`)
- [ ] 의미 있는 SVG에 `role="img"` + `<title>`, 장식 SVG는 `aria-hidden="true"`

### 폼

- [ ] 모든 input에 `<label htmlFor>` 또는 `aria-label`
- [ ] 필수 필드 `required` + `aria-required`, 오류 메시지 `aria-describedby` 연결
- [ ] placeholder만으로 레이블 대체 금지

### 키보드·포커스

- [ ] 모든 인터랙션 요소가 Tab으로 도달, Enter/Space로 동작
- [ ] `:focus-visible` 스타일 보임 (`outline: none` 단독 금지)
- [ ] 모달·드롭다운: 열릴 때 포커스 이동, Esc로 닫기, 닫힐 때 포커스 복귀, 포커스 트랩
- [ ] `tabIndex` 양수 금지

### 동적 콘텐츠

- [ ] 토스트·알림에 `role="status"` 또는 `aria-live="polite"`
- [ ] 탭/아코디언: `aria-expanded`, `aria-controls`, `aria-selected`
- [ ] 로딩 상태에 `aria-busy`

### 시각

- [ ] 텍스트 대비 4.5:1 이상 (토큰 색상 조합 확인)
- [ ] 색만으로 정보 전달 금지 (아이콘·텍스트 병행)
- [ ] `prefers-reduced-motion` 고려

## 3. 보고 형식

| 심각도 | 위치          | 문제            | 수정안                            |
| ------ | ------------- | --------------- | --------------------------------- |
| 높음   | `Card.tsx:12` | 클릭 가능한 div | `<button type="button">`으로 변경 |

- 높음: 키보드·스크린리더로 기능 사용 불가
- 중간: 사용은 되지만 혼란
- 낮음: 개선 권장

## 4. 수정

사용자가 "고쳐줘" 하면 높음부터 수정한다. React로 넘어오며 흔히 놓치는 것은 따로 설명한다:

- `htmlFor` (`for` 아님)
- `useId()`로 label-input id 연결
- `useRef` + `useEffect`로 포커스 이동
- `onKeyDown`에서 `e.key === "Escape"`

## 5. 검증

가능하면 브라우저에서 Tab 순서와 스크린리더(NVDA) 읽기 순서를 확인하도록 안내한다.
