import type { Metadata, Viewport } from 'next';
import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import { ToastProvider } from '@/components/Toast';
// Pretendard 가변 폰트를 "다이내믹 서브셋"으로 불러온다.
// 2MB 짜리 파일 하나 대신 유니코드 범위별로 쪼갠 조각 92개를 선언만 해 두고,
// 브라우저가 화면에 실제 쓰인 글자 범위의 조각만 내려받는다. (한국어 페이지 기준 보통 200~300KB)
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import '@/styles/global.scss';
import styles from './layout.module.scss';

// 배포 주소. VERCEL_PROJECT_PRODUCTION_URL 은 Vercel 의 시스템 환경변수로, 프로덕션 도메인(https:// 제외)이 들어 있다.
// 로컬에서는 이 값이 없으므로 localhost 로 대체한다.
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

const SITE_NAME = '최하영 포트폴리오';
const TITLE = '최하영 | Frontend & UI Developer';
const DESCRIPTION = '프론트엔드 및 UI 개발자 최하영의 경력과 프로젝트를 소개하는 포트폴리오입니다.';

// 페이지 <head>의 title, description, OG 태그를 여기서 선언한다. (Next.js가 <head>를 대신 만들어 줌)
export const metadata: Metadata = {
  // OG 이미지 등 상대 경로를 절대 URL 로 바꿀 때 쓰는 기준 주소. (공유 미리보기는 절대 URL 이어야 한다)
  // 주소를 직접 적지 않고 Vercel 이 빌드 때 넣어 주는 환경변수에서 읽는다.
  // 도메인이 바뀌거나 커스텀 도메인을 연결해도 코드를 고칠 필요가 없다.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | 최하영`,
  },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
};

// theme-color 같은 뷰포트 관련 메타는 metadata 가 아니라 viewport 로 따로 내보낸다. (Next.js 14+ 규칙)
export const viewport: Viewport = {
  themeColor: '#1f2c37',
};

// 루트 레이아웃: 모든 페이지를 감싸는 공통 틀. <html>, <body>는 여기서만 쓴다.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={styles.body}>
        {/* 키보드 사용자가 반복되는 헤더를 건너뛸 수 있게 하는 링크 */}
        <a href="#main" className={styles.skipLink}>
          본문으로 건너뛰기
        </a>
        {/* ToastProvider로 전체를 감싸면 어느 페이지에서든 useToast()로 토스트를 띄울 수 있다. */}
        <ToastProvider>
          <Header />
          <main id="main" className={styles.main}>
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
