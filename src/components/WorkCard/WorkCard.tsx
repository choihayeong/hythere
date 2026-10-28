import Image from 'next/image';
import Badge from '@/components/Badge';
import { thumbnailIds } from '@/data/thumbnails';
import type { Work } from '@/types/work';
import { formatPeriod, hasValidLink, parseCategories } from '@/utils/works';
import styles from './WorkCard.module.scss';

/** WorkCard 컴포넌트 props */
export interface WorkCardProps {
  work: Work;
  /** true 면 상세 설명(description)까지 보여준다. 목록 페이지에서 사용. */
  detailed?: boolean;
  /** 제목 태그. 홈(h2 섹션 안)에서는 h3, All works(h1 페이지)에서는 h2 — 제목 레벨은 한 단계씩만 내려가야 한다. */
  headingLevel?: 'h2' | 'h3';
}

// 프로젝트 한 건을 보여주는 카드.
// 운영 사이트는 제목·요약만 보였는데, 데이터에 있던 기간·카테고리·설명을 함께 노출한다. (docs/ui-analysis.md §8)
export default function WorkCard({ work, detailed = false, headingLevel = 'h3' }: WorkCardProps) {
  const Heading = headingLevel;
  const categories = parseCategories(work.category);
  const period = formatPeriod(work);
  const linked = hasValidLink(work);
  const headingId = `work-${work.id}`;
  const hasThumb = thumbnailIds.has(work.id);

  return (
    <article className={styles.root} aria-labelledby={headingId}>
      {hasThumb && (
        // next/image: 크기를 알려 주면 자리를 미리 잡아 레이아웃이 밀리지 않고, WebP 변환·지연 로딩을 자동으로 한다.
        // alt 는 빈 문자열: 제목이 바로 아래 있어 이미지가 전달할 추가 정보가 없다(장식 취급).
        <Image
          src={`/works/${work.id}.jpg`}
          alt=""
          width={640}
          height={400}
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
          className={styles.thumb}
        />
      )}
      <ul className={styles.tags} aria-label="분류">
        {categories.slice(0, 3).map((c) => (
          <li key={c}>
            <Badge variant="primary" outline>
              {c}
            </Badge>
          </li>
        ))}
      </ul>

      <Heading id={headingId} className={styles.title}>
        {linked ? (
          // 새 창으로 열리는 링크는 스크린리더 사용자에게도 알려 준다. (WCAG G201)
          <a href={work.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {work.title}
            <span className={styles.srOnly}> (새 창에서 열림)</span>
            <span className={styles.external} aria-hidden="true">
              ↗
            </span>
          </a>
        ) : (
          work.title
        )}
      </Heading>

      <p className={styles.summary}>{work.summary}</p>

      {detailed && work.description.length > 0 && (
        <ul className={styles.description}>
          {work.description.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      )}

      {period && (
        <p className={styles.period}>
          <span className={styles.srOnly}>작업 기간 </span>
          {period}
        </p>
      )}
    </article>
  );
}
