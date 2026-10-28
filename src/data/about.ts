// About 섹션 문구. 초안이므로 본인 말투와 사실에 맞게 다듬어 쓴다.
export const about = {
  /** 한 줄 헤드라인 */
  headline: '퍼블리싱의 디테일 위에 프론트엔드를 쌓아 갑니다.',
  /** 본문 문단 (각 문단이 <p> 하나) */
  paragraphs: [
    '웹 퍼블리셔로 시작해 프론트엔드 개발자로 성장하고 있는 최하영입니다. 기업 사이트와 쇼핑몰, 관리자 페이지를 구축·운영하며 시맨틱 마크업과 반응형, 접근성을 기본으로 지켜 왔습니다.',
    'Vue.js 기반 SPA 개발 경험을 바탕으로 React와 Next.js로 영역을 넓히고 있습니다. 디자인 시안을 "보이는 그대로"가 아니라 "쓰기 좋은 화면"으로 옮기는 일을 좋아합니다.',
  ],
  /** 핵심 사실 카드 (숫자 + 설명). 숫자는 page.tsx 에서 데이터로 계산해 채운다. */
  facts: [
    { key: 'years', label: '년차', description: '퍼블리싱 → 프론트엔드' },
    { key: 'projects', label: '프로젝트', description: '구축·운영·리뉴얼' },
    { key: 'stack', label: '주력 스택', description: 'Vue · React · SCSS' },
  ],
} as const;
