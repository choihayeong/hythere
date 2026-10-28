import type { NextConfig } from 'next';
import path from 'node:path';

// SCSS 공용 파일(mixins, variables)을 어디서든 `@use 'mixins' as *;` 로 불러올 수 있게 경로를 등록한다.
// includePaths(구 API)와 loadPaths(신 API) 둘 다 넣어 번들러(webpack/Turbopack) 어느 쪽에서도 동작하게 한다.
const stylesDir = path.join(process.cwd(), 'src/styles');

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [stylesDir],
    loadPaths: [stylesDir],
  },
};

export default nextConfig;
