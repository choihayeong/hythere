'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import styles from './Header.module.scss';

/** Header 컴포넌트 props */
export interface HeaderProps {
  /** 사이트 이름. 화면에는 로고 아이콘만 보이고, 이 이름은 스크린리더용 링크 이름으로 쓴다. */
  siteName?: string;
}

// 홈 화면 섹션으로 바로 가는 앵커 링크 + 별도 페이지 링크.
// 운영 사이트에는 내비게이션이 없어 긴 페이지를 스크롤로만 이동해야 했다. (docs/ui-analysis.md §8)
const sectionLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#careers', label: 'Careers' },
  { href: '/#strength', label: 'Strength' },
  { href: '/#projects', label: 'Projects' },
];

const MENU_ID = 'header-menu';

export default function Header({ siteName = '최하영 포트폴리오 홈' }: HeaderProps) {
  // 'use client' 인 이유: 스크롤 위치·메뉴 열림 같은 상태는 브라우저에서만 알 수 있어서.
  // 히어로(data-hero)가 헤더 아래로 보이는 동안은 투명, 벗어나면 색을 채운다.
  const [overHero, setOverHero] = useState(false);
  // 모바일 햄버거 메뉴 열림 여부. 데스크톱(md 이상)에서는 CSS 가 항상 메뉴를 보여 주므로 이 값은 영향이 없다.
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // 페이지가 바뀌면 히어로 유무가 달라지므로 다시 관찰한다

  useEffect(() => {
    const hero = document.querySelector('[data-hero]');
    if (!hero) return; // 히어로가 없는 페이지: 아래 정리(cleanup)에서 이미 false 로 돌려놓았으므로 할 일 없음
    // rootMargin 으로 뷰포트 위쪽을 헤더 높이만큼 잘라내면,
    // 히어로 아래 끝이 헤더 아래 끝을 지나는 순간 isIntersecting 이 false 가 된다.
    const headerHeight =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        10,
      ) || 64;
    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      rootMargin: `-${headerHeight}px 0px 0px 0px`,
    });
    observer.observe(hero);
    return () => {
      // 페이지가 바뀌거나 컴포넌트가 사라질 때: 관찰 해제 + 투명 상태 초기화
      observer.disconnect();
      setOverHero(false);
    };
  }, [pathname]);

  // 메뉴가 열려 있을 때 Esc 로 닫기 (키보드 사용자 관례)
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // 링크를 눌러 이동하면 메뉴를 닫는다. (같은 페이지 앵커 이동도 포함)
  const closeMenu = () => setMenuOpen(false);

  const rootClass = [
    styles.root,
    overHero && !menuOpen && styles.transparent, // 메뉴가 열리면 투명 상태라도 배경을 채워 글자가 읽히게
    menuOpen && styles.open,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={rootClass}>
      <div className={styles.inner}>
        {/* Next.js의 Link: <a>처럼 쓰지만 페이지 전체 새로고침 없이 이동한다. */}
        <Link href="/" className={styles.logo} aria-label={siteName} onClick={closeMenu}>
          <Logo size={32} />
        </Link>

        {/* 햄버거 버튼: 모바일에서만 보인다(CSS). aria-expanded 로 열림 상태, aria-controls 로 제어 대상을 알린다. */}
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls={MENU_ID}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {/* 세 줄 → X 로 바뀌는 아이콘. span 세 개를 CSS 로 회전시킨다. */}
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
        </button>

        <nav aria-label="주 메뉴" id={MENU_ID} className={styles.nav}>
          <ul className={styles.menu}>
            {sectionLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/projects" onClick={closeMenu}>
                All works
              </Link>
            </li>
            <li>
              <Link href="/component" onClick={closeMenu}>
                UI Kit
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/choihayeong"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                GitHub
                <span className={styles.srOnly}> (새 창에서 열림)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
