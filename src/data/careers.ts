// 경력 데이터. 운영 사이트의 Careers 타임라인 내용을 옮겼다.
export interface Career {
  id: string;
  company: string;
  /** 타임라인 원 안에 표시할 짧은 글자 */
  initial: string;
  position: string;
  start: string; // YYYY.MM.DD
  end: string | null; // null = 재직 중
  tasks: string[];
  stack: string[];
  /** 아이콘 원 색상 (브랜드 컬러) */
  color: { bg: string; fg: string };
}

export const careers: Career[] = [
  {
    id: 'cttd',
    company: 'CTTD',
    initial: 'C',
    position: '과장 / Frontend Development',
    start: '2023.08.21',
    end: null,
    tasks: ['이커머스 플랫폼 구축 및 운영', 'vue.js 프레임워크를 이용한 SPA 컴포넌트 개발'],
    stack: ['vue.js', 'scss', 'javascript(ES6)', 'jQuery', 'html5/css3'],
    color: { bg: '#000000', fg: '#ffffff' },
  },
  {
    id: 'bdot',
    company: 'B DOT CREATIVE',
    initial: 'B',
    position: '사원 / 마크업개발팀',
    start: '2021.07.20',
    end: '2023.08.18',
    tasks: [
      '웹 페이지 퍼블리싱 구축 및 유지보수',
      'vue.js 프레임워크를 이용한 SPA 퍼블리싱 및 프론트 개발',
    ],
    stack: ['vue.js', 'scss', 'javascript(ES6)', 'jQuery', 'html5/css3'],
    color: { bg: '#fee101', fg: '#1f1f1f' },
  },
];

/** "2023.08.21" ~ 오늘(또는 end) 사이를 "3년 2개월" 형태로 */
export function formatDuration(start: string, end: string | null, now = new Date()): string {
  const toDate = (s: string) => {
    const [y, m, d] = s.split('.').map(Number);
    return new Date(y, m - 1, d);
  };
  const from = toDate(start);
  const to = end ? toDate(end) : now;
  let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  if (to.getDate() < from.getDate()) months -= 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return (
    [years ? `${years}년` : '', rest ? `${rest}개월` : ''].filter(Boolean).join(' ') || '1개월 미만'
  );
}
