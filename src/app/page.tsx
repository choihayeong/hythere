import Link from 'next/link';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import StrengthCard from '@/components/StrengthCard';
import WorkCard from '@/components/WorkCard';
import Badge from '@/components/Badge';
import Section from '@/layouts/Section';
import { about } from '@/data/about';
import { careers, formatDuration } from '@/data/careers';
import { skillTags, strengths } from '@/data/strengths';
import { getVisibleWorks } from '@/utils/works';
import styles from './page.module.scss';

// 홈에 보여 줄 최근 프로젝트 개수. 나머지는 /projects 에서 전부 본다.
const RECENT_COUNT = 8;
// 연락처. 푸터(layouts/Footer)에도 같은 값을 쓴다.
const CONTACT = {
  email: 'hychoi318@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hayeong-choi-85b7b2183/',
};

// app/page.tsx 는 "/" 경로의 페이지. 서버 컴포넌트라 데이터(JSON)를 직접 읽어도 브라우저로 전부 내려가지 않는다.
export default function HomePage() {
  const works = getVisibleWorks();
  const recent = works.slice(0, RECENT_COUNT);
  // 총 경력: 가장 오래된 입사일부터 지금까지. "3년 2개월" 에서 년 숫자만 꺼낸다.
  const oldestStart = careers.reduce((min, c) => (c.start < min ? c.start : min), careers[0].start);
  const years = formatDuration(oldestStart, null).split('년')[0];
  const factValues: Record<string, string> = {
    years: `${years}+`,
    projects: `${works.length}`,
    stack: '3',
  };

  return (
    <>
      <Hero name="Choi Hayeong" tagline="Frontend & UI Developer" contact={CONTACT} />

      <Section id="about" title="About">
        <div className={styles.about}>
          <div className={styles.aboutText}>
            <p className={styles.aboutHeadline}>{about.headline}</p>
            {about.paragraphs.map((p) => (
              <p key={p} className={styles.aboutParagraph}>
                {p}
              </p>
            ))}
          </div>
          {/* 숫자 카드: <dl> 로 "항목 이름 - 값" 쌍을 표현한다 */}
          <dl className={styles.facts}>
            {about.facts.map((f) => (
              <div key={f.key} className={styles.fact}>
                <dt className={styles.factLabel}>{f.label}</dt>
                <dd className={styles.factValue}>{factValues[f.key]}</dd>
                <dd className={styles.factDesc}>{f.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="careers" title="Careers">
        <Timeline items={careers} />
      </Section>

      <Section id="strength" title="Strength" tone="dark">
        <ul className={styles.tags} aria-label="기술 태그">
          {skillTags.map((tag) => (
            <li key={tag}>
              <Badge variant="neutral" outline className={styles.tag}>
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
        <ul className={styles.strengths}>
          {strengths.map((s) => (
            <li key={s.id}>
              <StrengthCard id={`strength-${s.id}`} title={s.title} points={s.points} />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="projects"
        title="Projects"
        description={`최근 작업 ${recent.length}건입니다. 전체 ${works.length}건은 All works 에서 카테고리별로 볼 수 있습니다.`}
      >
        <ul className={styles.works}>
          {recent.map((w) => (
            <li key={w.id}>
              <WorkCard work={w} />
            </li>
          ))}
        </ul>
        <p className={styles.more}>
          <Link href="/projects" className={styles.moreLink}>
            All works 보기
          </Link>
        </p>
      </Section>
    </>
  );
}
