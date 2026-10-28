import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './not-found.module.scss';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
};

// app/not-found.tsx: 없는 주소로 들어왔을 때 보여 주는 404 화면.
// 루트 레이아웃(헤더·푸터) 안에 그려지므로 사이트 안에서 길을 잃은 느낌이 덜하다.
export default function NotFound() {
  return (
    <section className={styles.root} aria-labelledby="not-found-heading">
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1 id="not-found-heading" className={styles.title}>
        페이지를 찾을 수 없습니다
      </h1>
      <p className={styles.description}>
        주소가 바뀌었거나 삭제된 페이지입니다. 아래 링크로 이동해 주세요.
      </p>
      <ul className={styles.links}>
        <li>
          <Link href="/" className={styles.primary}>
            홈으로
          </Link>
        </li>
        <li>
          <Link href="/projects" className={styles.secondary}>
            All works 보기
          </Link>
        </li>
      </ul>
    </section>
  );
}
