'use client';

import { useState } from 'react';
import WorkCard from '@/components/WorkCard';
import type { Work } from '@/types/work';
import { getAllCategories, parseCategories } from '@/utils/works';
import styles from './WorkList.module.scss';

/** WorkList 컴포넌트 props */
export interface WorkListProps {
  works: Work[];
}

const ALL = '전체';

// 카테고리 필터가 있는 프로젝트 목록.
// 'use client' 인 이유: 어떤 필터가 눌렸는지(useState)는 브라우저에서만 바뀌는 상태라서.
// 데이터(works)는 서버 컴포넌트(page.tsx)에서 props 로 받는다.
export default function WorkList({ works }: WorkListProps) {
  const [selected, setSelected] = useState(ALL);
  const categories = [ALL, ...getAllCategories(works)];
  const filtered =
    selected === ALL ? works : works.filter((w) => parseCategories(w.category).includes(selected));

  return (
    <div className={styles.root}>
      {/* 필터 버튼 그룹. aria-pressed 로 "눌린 상태"를 알려 주면 토글 버튼으로 읽힌다. */}
      <div className={styles.filters} role="group" aria-label="카테고리로 거르기">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={styles.filter}
            aria-pressed={selected === c}
            onClick={() => setSelected(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 필터 결과 개수. aria-live 로 바뀔 때마다 스크린리더에 알린다. */}
      <p className={styles.count} aria-live="polite">
        {filtered.length}개 프로젝트
      </p>

      <ul className={styles.grid}>
        {filtered.map((w) => (
          <li key={w.id}>
            <WorkCard work={w} detailed headingLevel="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
