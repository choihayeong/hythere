import { createSeededRandom } from '@/utils/seededRandom';
import styles from './Hero.module.scss';

/** Hero 컴포넌트 props */
export interface HeroProps {
  /** 인사말 (큰 글씨) */
  greeting?: string;
  /** 이름. 페이지의 h1 이 된다. */
  name: string;
  /** 한 줄 소개 */
  tagline?: string;
  /** 연락처. 주면 "Get in touch!" 블록에 이메일·링크드인 링크가 생긴다 */
  contact?: { email: string; linkedin?: string };
  /** 별 개수. 운영 사이트는 300개였는데 각 별마다 애니메이션이 돌아 무거워서 기본값을 줄였다. */
  starCount?: number;
}

// 운영 사이트의 첫 화면(밤하늘 + 별 + 파도)을 옮긴 컴포넌트.
// 서버 컴포넌트라서 Math.random() 대신 시드 난수를 써야 서버/클라이언트 결과가 같다.
export default function Hero({
  greeting = 'Hythere!',
  name,
  tagline,
  contact,
  starCount = 80,
}: HeroProps) {
  const random = createSeededRandom(20231221);
  const stars = Array.from({ length: starCount }, (_, i) => ({
    id: i,
    left: Math.round(random() * 100),
    top: Math.round(random() * 100),
    size: 1 + Math.floor(random() * 3),
    // 6가지 깜빡임 리듬 중 하나
    variant: (i % 6) + 1,
  }));

  return (
    <section className={styles.root} aria-labelledby="hero-heading" data-hero>
      {/* 장식 요소: 스크린리더에는 숨긴다 */}
      <div className={styles.sky} aria-hidden="true">
        <div className={styles.light} />
        {stars.map((s) => (
          <span
            key={s.id}
            className={`${styles.star} ${styles[`star${s.variant}`]}`}
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          />
        ))}
        <div className={`${styles.wave} ${styles.wave1}`} />
        <div className={`${styles.wave} ${styles.wave2}`} />
        <div className={`${styles.wave} ${styles.wave3}`} />
        <div className={`${styles.wave} ${styles.wave4}`} />
      </div>

      <div className={styles.inner}>
        <p className={styles.greeting}>{greeting}</p>
        <h1 id="hero-heading" className={styles.name}>
          {name}
        </h1>
        {tagline && <p className={styles.tagline}>{tagline}</p>}
        {contact && (
          // 연락처 묶음. aria-labelledby 로 "Get in touch!" 를 이 그룹의 이름으로 삼는다.
          <div className={styles.contact} aria-labelledby="hero-contact">
            <p id="hero-contact" className={styles.contactLabel}>
              Get in touch!
            </p>
            <ul className={styles.contactList}>
              <li>
                {/* mailto: 링크는 클릭하면 기본 메일 앱이 열린다 */}
                <a href={`mailto:${contact.email}`} className={styles.contactLink}>
                  <span className={styles.contactKind}>Email</span>
                  {contact.email}
                </a>
              </li>
              {contact.linkedin && (
                <li>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                  >
                    <span className={styles.contactKind}>LinkedIn</span>
                    hayeong-choi
                    <span className={styles.srOnly}> (새 창에서 열림)</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
