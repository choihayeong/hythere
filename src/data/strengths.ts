// 강점(Strength) 섹션 데이터. 운영 사이트의 태그 목록과 카드 3종을 옮겼다.
export const skillTags = [
  'vue.js',
  'javascript',
  'typescript',
  'react',
  'next.js',
  'scss',
  'html5',
  'css3',
  'vite',
  'gulp',
  'Python3',
];

export interface Strength {
  id: string;
  title: string;
  points: string[];
}

export const strengths: Strength[] = [
  {
    id: 'javascript',
    title: 'Javascript',
    points: [
      'ES6+(ES2015) 문법에 익숙합니다.',
      'gulp 및 webpack을 사용한 빌드 도구와 프로젝트 협업에 익숙합니다.',
      'babel 등의 트랜스파일러를 사용할 수 있습니다.',
      'typescript를 사용할 수 있습니다.',
    ],
  },
  {
    id: 'vue',
    title: 'vue.js',
    points: [
      'Options API를 이용한 vue2 문법과 Composition API를 이용한 vue3 문법 모두 활용할 수 있습니다.',
      'vuex 및 axios를 활용하여 상태 관리와 API 데이터를 불러오는 작업 경험이 있습니다.',
      'vue-router를 사용한 SPA(single page application) 구성이 가능합니다.',
    ],
  },
  {
    id: 'markup',
    title: 'html5 / css3',
    points: [
      '웹표준과 접근성을 지키려 노력합니다.',
      '반응형/적응형 구현이 가능하며 크로스 브라우징에 대응할 수 있습니다.',
      'SCSS 문법과 BEM 방법론에 익숙합니다.',
      'flexbox와 grid, keyframe 애니메이션을 활용할 수 있습니다.',
      'bootstrap(v5) 사용 경험이 있습니다.',
    ],
  },
];
