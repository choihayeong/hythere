'use client';
// 버튼 onClick을 붙이므로 클라이언트 컴포넌트. (상태는 부모가 들고 있어 훅은 쓰지 않는다)

import { getPaginationRange } from '@/utils/paginationRange';
import styles from './Pagination.module.scss';

/** Pagination 컴포넌트 props */
export interface PaginationProps {
  /** 현재 페이지 (1부터 시작). 부모가 상태로 들고 있다. */
  page: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지가 바뀌어야 할 때 호출. 부모는 여기서 page를 갱신한다. */
  onChange: (page: number) => void;
  /** 현재 페이지 양옆에 보여줄 번호 개수 (기본 1 → 5 6 7) */
  siblingCount?: number;
  /** 처음/끝 이동 버튼(«, ») 표시 */
  showFirstLast?: boolean;
  /** 크기 */
  size?: 'sm' | 'md';
  /** 접근성 이름. 페이지에 페이지네이션이 여러 개면 구분되게 넣는다. */
  ariaLabel?: string;
  /** 추가 클래스 (외부 레이아웃용) */
  className?: string;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
  siblingCount = 1,
  showFirstLast = false,
  size = 'md',
  ariaLabel = '페이지 탐색',
  className,
}: PaginationProps) {
  if (totalPages < 1) return null;

  const items = getPaginationRange(page, totalPages, siblingCount);
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  // 범위를 벗어나는 요청은 무시한다 (예: 1페이지에서 '이전')
  const go = (next: number) => {
    if (next < 1 || next > totalPages || next === page) return;
    onChange(next);
  };

  const classes = [styles.root, styles[size], className].filter(Boolean).join(' ');

  return (
    // <nav>: 페이지 이동 링크 묶음이므로 탐색 랜드마크로 둔다. aria-label로 다른 nav(헤더 메뉴)와 구분.
    <nav aria-label={ariaLabel} className={classes}>
      <ul className={styles.list}>
        {showFirstLast && (
          <li>
            <button
              type="button"
              className={styles.control}
              onClick={() => go(1)}
              disabled={isFirst}
              aria-label="첫 페이지"
            >
              <span aria-hidden="true">«</span>
            </button>
          </li>
        )}
        <li>
          <button
            type="button"
            className={styles.control}
            onClick={() => go(page - 1)}
            disabled={isFirst}
            aria-label="이전 페이지"
          >
            <span aria-hidden="true">‹</span>
          </button>
        </li>

        {items.map((item, index) =>
          item === 'ellipsis' ? (
            // 생략 기호는 눌 수 없는 장식이므로 button이 아닌 span. 스크린리더에선 읽지 않는다.
            // key에 index를 섞는 이유: 생략 기호가 양쪽에 2개 있을 수 있어 'ellipsis'만으론 중복된다.
            <li key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={styles.pageButton}
                onClick={() => go(item)}
                // aria-current="page": "지금 보고 있는 페이지"라고 스크린리더에 알린다. 스타일 조건으로도 쓴다.
                aria-current={item === page ? 'page' : undefined}
                aria-label={`${item}페이지`}
              >
                {item}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            className={styles.control}
            onClick={() => go(page + 1)}
            disabled={isLast}
            aria-label="다음 페이지"
          >
            <span aria-hidden="true">›</span>
          </button>
        </li>
        {showFirstLast && (
          <li>
            <button
              type="button"
              className={styles.control}
              onClick={() => go(totalPages)}
              disabled={isLast}
              aria-label="마지막 페이지"
            >
              <span aria-hidden="true">»</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
