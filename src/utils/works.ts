// works.json 을 화면에서 쓰기 좋은 형태로 가공하는 순수 함수 모음.
// (컴포넌트 안에 로직을 넣지 않고 분리해 두면 테스트하기 쉽고 재사용도 된다.)
import worksJson from '@/data/works.json';
import type { Work } from '@/types/work';

const works = worksJson as Work[];

/** 노출(exposure === 1) 항목만, 최신(id 큰 순) 순서로 */
export function getVisibleWorks(): Work[] {
  return works.filter((w) => w.exposure === 1).sort((a, b) => b.id - a.id);
}

/** "구축 | 쇼핑몰 | 이커머스" → ['구축', '쇼핑몰', '이커머스'] */
export function parseCategories(category: string): string[] {
  return category
    .split('|')
    .map((c) => c.trim())
    .filter(Boolean);
}

/** 모든 노출 항목에 등장하는 카테고리를 중복 없이, 등장 횟수 많은 순으로 */
export function getAllCategories(list: Work[] = getVisibleWorks()): string[] {
  const count = new Map<string, number>();
  list.forEach((w) =>
    parseCategories(w.category).forEach((c) => count.set(c, (count.get(c) ?? 0) + 1)),
  );
  return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name);
}

/** "2023.08.22" ~ "2023.10.24" → "2023.08 ~ 2023.10". 날짜가 비어 있으면 있는 쪽만 */
export function formatPeriod(work: Work): string {
  const ym = (d: string) => d.replace(/\.$/, '').split('.').slice(0, 2).join('.');
  const start = work.start_date ? ym(work.start_date) : '';
  const end = work.end_date ? ym(work.end_date) : '';
  if (start && end) return start === end ? start : `${start} ~ ${end}`;
  return start || end;
}

/** http:// 로 시작하거나 빈 링크는 그대로 두되, 화면에서 구분할 수 있게 유효 여부만 알려준다 */
export function hasValidLink(work: Work): boolean {
  return /^https?:\/\//.test(work.link);
}
