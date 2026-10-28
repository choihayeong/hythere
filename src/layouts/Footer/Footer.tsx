import styles from './Footer.module.scss';

export default function Footer() {
  // 운영 사이트는 2023 으로 고정돼 있었다. 매년 고치지 않도록 현재 연도를 계산한다.
  const year = new Date().getFullYear();
  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <p>&copy; {year} Choi Hayeong. All rights reserved.</p>
        <ul className={styles.links} aria-label="연락처와 외부 링크">
          <li>
            <a href="mailto:hychoi318@gmail.com">hychoi318@gmail.com</a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/hayeong-choi-85b7b2183/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <span className={styles.srOnly}> (새 창에서 열림)</span>
            </a>
          </li>
          <li>
            <a href="https://github.com/choihayeong" target="_blank" rel="noopener noreferrer">
              GitHub
              <span className={styles.srOnly}> (새 창에서 열림)</span>
            </a>
          </li>
          <li>
            <a href="https://my.surfit.io/w/1146355103" target="_blank" rel="noopener noreferrer">
              Surfit
              <span className={styles.srOnly}> (새 창에서 열림)</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
