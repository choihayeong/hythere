import { ImageResponse } from 'next/og';

// iOS 홈 화면용 아이콘(180px PNG). iOS는 SVG 파비콘을 쓰지 않아 코드로 PNG 를 만들어 둔다.
// 빌드 때 한 번 그려져 /apple-icon 으로 서빙되고, <head> 링크는 Next.js 가 자동으로 넣는다.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1f2c37',
        position: 'relative',
      }}
    >
      {/* icon.svg 와 같은 모양. ImageResponse 는 svg 요소를 지원한다 */}
      <svg viewBox="0 0 64 64" width="180" height="180">
        <path d="M18 16h8v13h12V16h8v32h-8V36H26v12h-8z" fill="#5a5aff" />
        <circle cx="53" cy="12" r="5" fill="#fff689" />
      </svg>
    </div>,
    { ...size },
  );
}
