import styles from './Section.module.scss';

/** Section 컴포넌트 props */
export interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** 앵커 이동용 id. 헤더 메뉴의 href="#id" 와 짝을 이룬다. */
  id: string;
  /** 섹션 제목 (h2). 스크린리더는 이 제목으로 섹션 이름을 읽는다. */
  title: string;
  /** 제목 아래 짧은 설명 */
  description?: string;
  /** 어두운 배경 */
  tone?: 'light' | 'dark';
  /** 제목 태그. 홈처럼 h1(히어로)이 따로 있으면 h2, 페이지 자체가 이 섹션뿐이면 h1 */
  headingLevel?: 'h1' | 'h2';
  children: React.ReactNode;
}

// 홈 화면의 "Careers / Strength / Projects" 처럼 제목이 있는 큰 덩어리를 감싸는 틀.
// aria-labelledby 로 <section>에 이름을 붙이면 스크린리더에서 랜드마크(region)로 잡힌다.
// (운영 사이트는 section에 이름이 없어 "이름 없는 region"이었다 — docs/ui-analysis.md §7)
export default function Section({
  id,
  title,
  description,
  tone = 'light',
  headingLevel = 'h2',
  className,
  children,
  ...rest
}: SectionProps) {
  const headingId = `${id}-heading`;
  const Heading = headingLevel; // 대문자 변수는 JSX 에서 태그 이름으로 쓸 수 있다
  const classes = [styles.root, tone === 'dark' && styles.dark, className]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={classes} aria-labelledby={headingId} {...rest}>
      <div className={styles.inner}>
        <Heading id={headingId} className={styles.title}>
          {title}
        </Heading>
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
    </section>
  );
}
