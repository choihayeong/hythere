import { formatDuration, type Career } from '@/data/careers';
import styles from './Timeline.module.scss';

/** Timeline 컴포넌트 props */
export interface TimelineProps {
  items: Career[];
}

// 경력을 세로 타임라인으로 보여준다. 데스크톱은 좌우 번갈아, 모바일은 한 줄.
// <ol> 을 쓰는 이유: 경력은 "순서가 있는" 목록이라서. 스크린리더가 "2개 항목 중 1번째"처럼 읽어 준다.
export default function Timeline({ items }: TimelineProps) {
  return (
    <ol className={styles.root}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <span
            className={styles.badge}
            style={{ background: item.color.bg, color: item.color.fg }}
            aria-hidden="true"
          >
            {item.initial}
          </span>
          <article className={styles.panel} aria-labelledby={`career-${item.id}`}>
            <p className={styles.date}>
              <time dateTime={item.start.replaceAll('.', '-')}>{item.start}</time>
              {' ~ '}
              {item.end ? <time dateTime={item.end.replaceAll('.', '-')}>{item.end}</time> : '현재'}
              <span className={styles.duration}>({formatDuration(item.start, item.end)})</span>
            </p>
            <h3 id={`career-${item.id}`} className={styles.title}>
              {item.company}
              <small className={styles.position}>{item.position}</small>
            </h3>
            <ul className={styles.tasks}>
              {item.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
            <p className={styles.stack}>
              <span className={styles.stackLabel}>기술 스택</span> {item.stack.join(', ')}
            </p>
          </article>
        </li>
      ))}
    </ol>
  );
}
