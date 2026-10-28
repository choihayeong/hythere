import styles from './StrengthCard.module.scss';

/** StrengthCard 컴포넌트 props */
export interface StrengthCardProps {
  /** 제목 요소 id (aria-labelledby 연결용) */
  id: string;
  /** 카드 제목. 기울어진 라벨로 표시된다. */
  title: string;
  /** 항목 목록 */
  points: string[];
}

// 운영 사이트의 "비스듬한 제목 라벨 + 보더 박스" 카드.
// 본문은 <br> 로 끊은 텍스트 대신 <ul> 로 바꿨다. 목록이면 목록 태그를 쓰는 게 시맨틱하다.
export default function StrengthCard({ id, title, points }: StrengthCardProps) {
  return (
    <article className={styles.root} aria-labelledby={id}>
      <h3 id={id} className={styles.title}>
        {title}
      </h3>
      <ul className={styles.list}>
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </article>
  );
}
