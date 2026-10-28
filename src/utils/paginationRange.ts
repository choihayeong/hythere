/** 페이지 번호 목록의 항목. 숫자는 페이지, 'ellipsis'는 생략 표시(…) */
export type PaginationRangeItem = number | 'ellipsis';

/**
 * 현재 페이지 주변에 보여줄 페이지 번호 목록을 계산한다.
 * 예) page=6, totalPages=20, siblingCount=1 → [1, '…', 5, 6, 7, '…', 20]
 *
 * 순수 함수(입력만으로 출력이 정해지고 바깥 상태를 건드리지 않음)로 분리한 이유:
 * 컴포넌트와 무관하게 콘솔에서 바로 호출해 결과를 확인할 수 있고, 나중에 테스트를 붙이기도 쉽다.
 *
 * @param page 현재 페이지 (1부터 시작)
 * @param totalPages 전체 페이지 수
 * @param siblingCount 현재 페이지 양옆에 보여줄 개수
 */
export function getPaginationRange(
  page: number,
  totalPages: number,
  siblingCount = 1,
): PaginationRangeItem[] {
  // 보여줄 칸 수 = 양옆 + 현재 + 처음·끝 + 생략 2개
  const totalSlots = siblingCount * 2 + 5;

  // 전체가 칸 수보다 적으면 생략 없이 전부 보여준다
  if (totalPages <= totalSlots) {
    return range(1, totalPages);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);

  // 처음(1)과 왼쪽 형제 사이에 숫자가 2개 이상 숨겨지면 생략 표시
  const showLeftEllipsis = leftSibling > 2;
  // 오른욝 형제와 끝 사이에 숫자가 2개 이상 숨겨지면 생략 표시
  const showRightEllipsis = rightSibling < totalPages - 1;

  // 앞쪽에 있을 때: 1 2 3 4 5 … 20
  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = siblingCount * 2 + 3;
    return [...range(1, leftCount), 'ellipsis', totalPages];
  }

  // 뒤쪽에 있을 때: 1 … 16 17 18 19 20
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = siblingCount * 2 + 3;
    return [1, 'ellipsis', ...range(totalPages - rightCount + 1, totalPages)];
  }

  // 가운데 있을 때: 1 … 5 6 7 … 20
  return [1, 'ellipsis', ...range(leftSibling, rightSibling), 'ellipsis', totalPages];
}

/** start부터 end까지(포함) 정수 배열. range(3, 6) → [3, 4, 5, 6] */
function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
