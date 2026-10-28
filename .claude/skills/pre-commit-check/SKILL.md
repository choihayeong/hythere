---
name: pre-commit-check
description: 커밋 전 점검. 린트·타입체크·빌드를 돌리고, 실패하면 고치고, 통과하면 변경 요약과 Conventional Commits 형식의 한국어 커밋 메시지를 만든다. "커밋 준비", "빌드 확인", "커밋 메시지", "작업 마무리" 요청 시 사용.
---

# 커밋 전 점검

CLAUDE.md 규칙: **작업을 마치면 빌드가 통과하는지 확인한다.**

## 1. 실행

순서대로 실행하고 결과를 요약한다:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

- 스크립트가 없으면 `package.json`을 확인하고 있는 것만 실행한다.
- 실패 시: 에러 메시지를 **퍼블리셔가 이해할 수 있게** 번역해서 설명하고 수정한 뒤 다시 실행한다.
  - 예: `Property 'title' does not exist on type` → "props 타입에 `title`을 안 적었다"
- 3회 수정해도 실패하면 멈추고 상황을 보고한다.

## 2. 변경 점검

`git status` / `git diff --stat` 으로 변경 파일을 보고 다음을 확인한다:

- [ ] `console.log`, `debugger` 남은 것
- [ ] 주석 처리된 코드 덩어리
- [ ] `.env`, 개인 설정 파일, `CLAUDE.local.md` 포함 여부
- [ ] 의도치 않은 파일 (`dist/`, 에디터 설정)
- [ ] 하드코딩된 색상·URL

문제가 있으면 목록으로 알리고, 명백한 것(`console.log`)은 제거한다.

## 3. 커밋 메시지

Conventional Commits + 한국어 본문:

```
<type>(<scope>): <한 줄 요약, 50자 이내>

- 변경 내용 1
- 변경 내용 2

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
```

type:

| type     | 용도                                |
| -------- | ----------------------------------- |
| feat     | 새 기능·컴포넌트                    |
| fix      | 버그 수정                           |
| style    | 스타일(SCSS)만 변경, 동작 변화 없음 |
| refactor | 동작 같고 구조만 변경               |
| a11y     | 접근성 개선                         |
| chore    | 설정·의존성                         |
| docs     | 문서                                |

scope는 컴포넌트명 또는 폴더 (`Button`, `styles`, `setup`).
변경이 두 가지 성격이면 **커밋을 나누자고 제안**한다.

## 4. 커밋 실행

- 사용자가 명시적으로 "커밋해줘"라고 한 경우에만 `git commit` 실행.
- git 저장소가 아니면 `git init`을 제안한다.
- push는 요청 없이는 하지 않는다.
