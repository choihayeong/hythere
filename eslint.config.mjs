import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier/flat';

// ESLint 9의 "flat config" 방식.
// 배열 순서대로 규칙이 합쳐지고, 뒤에 오는 설정이 앞의 것을 덮어씁니다.
const eslintConfig = defineConfig([
  // Next.js 공식 권장 규칙 (성능·접근성 기본 포함, jsx-a11y 플러그인도 여기서 등록됨)
  ...nextVitals,
  // TypeScript 규칙
  ...nextTs,
  // JSX 접근성 규칙을 "recommended" 수준으로 강화 (퍼블리셔의 강점을 코드에서도 지키기 위해)
  // 플러그인은 위에서 이미 등록됐으므로 규칙만 덧붙인다. (중복 등록하면 오류)
  {
    name: 'jsx-a11y/recommended-rules',
    rules: jsxA11y.flatConfigs.recommended.rules,
  },
  // Prettier와 충돌하는 "스타일" 규칙을 끕니다. 포맷은 Prettier가 전담.
  // 반드시 마지막에 두어야 다른 설정의 스타일 규칙을 덮어쓸 수 있습니다.
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
