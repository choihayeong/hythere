// 프로젝트(작업 이력) 데이터 타입.
// src/data/works.json 의 한 항목이 이 모양이다. 기존 운영 사이트의 work.js 데이터 구조를 그대로 가져왔다.
export interface Work {
  id: number;
  /** 1이면 화면에 노출, 0이면 숨김 */
  exposure: 0 | 1;
  /** "구축 | 쇼핑몰 | 이커머스" 처럼 '|' 로 구분된 카테고리 문자열 */
  category: string;
  title: string;
  /** "2023.08.22" 형식. 빈 문자열일 수 있다. */
  start_date: string;
  end_date: string;
  open_date: string;
  summary: string;
  /** 외부 링크. 빈 문자열이면 링크 없음 */
  link: string;
  description: string[];
}
