import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// 링크를 카카오톡·링크드인·슬랙 등에 공유할 때 보이는 미리보기 이미지(1200×630).
// 빌드 때 한 번 그려져 /opengraph-image 로 서빙되고, <meta property="og:image"> 는 Next.js 가 자동으로 넣는다.
// 글자는 영문만 쓴다: 이미지 생성기(Satori)에 한글 폰트를 따로 실어야 해서, 용량 대비 효과가 작다.
export const alt = 'Choi Hayeong — Frontend & UI Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// 이미지에 찍을 사이트 주소. layout.tsx 의 metadataBase 와 같은 환경변수를 쓴다.
const SITE_HOST = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'Frontend Portfolio';

export default async function OpenGraphImage() {
  // 굵은 글꼴. 빌드 때 서버에서만 읽으므로 방문자에게 전송되지 않는다.
  const bold = await readFile(
    join(process.cwd(), 'node_modules/pretendard/dist/public/static/Pretendard-Bold.otf'),
  );

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        color: '#ffffff',
        background: 'linear-gradient(160deg, #1f2c37 0%, #2d3b48 60%, #4a4f72 100%)',
        fontFamily: 'Pretendard',
      }}
    >
      {/* 위: 로고 + 사이트 주소 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <svg viewBox="0 0 64 64" width="72" height="72">
          <rect width="64" height="64" rx="14" fill="#1f2c37" />
          <path d="M18 16h8v13h12V16h8v32h-8V36H26v12h-8z" fill="#5a5aff" />
          <circle cx="53" cy="12" r="5" fill="#fff689" />
        </svg>
        <div style={{ fontSize: 28, opacity: 0.8, letterSpacing: 1 }}>{SITE_HOST}</div>
      </div>

      {/* 가운데: 이름 + 직함 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
          CHOI HAYEONG
        </div>
        <div style={{ fontSize: 44, color: '#fff689', fontWeight: 600 }}>
          Frontend &amp; UI Developer
        </div>
      </div>

      {/* 아래: 키워드 */}
      <div style={{ display: 'flex', gap: 14 }}>
        {['Vue', 'React', 'Next.js', 'SCSS', 'Accessibility'].map((t) => (
          <div
            key={t}
            style={{
              padding: '10px 22px',
              fontSize: 24,
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: 999,
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>,
    { ...size, fonts: [{ name: 'Pretendard', data: bold, weight: 700, style: 'normal' }] },
  );
}
