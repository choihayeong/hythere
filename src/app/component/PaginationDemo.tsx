'use client';
// Pagination 데모. 현재 페이지 상태(useState)를 부모가 들고 있어야 하므로 클라이언트 컴포넌트.

import { useState } from 'react';
import Pagination from '@/components/Pagination';
import Typography from '@/components/Typography';
import styles from './page.module.scss';

export default function PaginationDemo() {
  const [page, setPage] = useState(1);
  const [pageSm, setPageSm] = useState(6);

  return (
    <>
      <h3 className={styles.subheading}>기본 (20페이지, 처음/끝 버튼)</h3>
      <div className={styles.demoBlock}>
        <div className={styles.stack}>
          <Pagination page={page} totalPages={20} onChange={setPage} showFirstLast />
          <Typography variant="small" color="muted" align="center">
            현재 {page} / 20 페이지
          </Typography>
        </div>
      </div>

      <h3 className={styles.subheading}>sm · siblingCount=2 (10페이지)</h3>
      <div className={styles.demoBlock}>
        <Pagination
          page={pageSm}
          totalPages={10}
          onChange={setPageSm}
          size="sm"
          siblingCount={2}
          ariaLabel="두 번째 예시 페이지 탐색"
        />
      </div>

      <h3 className={styles.subheading}>페이지가 적을 때 (5페이지, 생략 없음)</h3>
      <div className={styles.demoBlock}>
        <Pagination
          page={3}
          totalPages={5}
          onChange={() => {}}
          ariaLabel="세 번째 예시 페이지 탐색"
        />
      </div>
    </>
  );
}
