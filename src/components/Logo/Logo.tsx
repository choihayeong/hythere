/** Logo 컴포넌트 props */
export interface LogoProps extends React.SVGAttributes<SVGSVGElement> {
  /** 한 변 길이(px). 정사각형이다. */
  size?: number;
}

// 파비콘(app/icon.svg)과 같은 모양의 로고. 인라인 SVG 로 두면 <img> 와 달리 색을 CSS 로 바꿀 수 있고
// 요청 한 번이 줄어든다. 장식이므로 기본은 aria-hidden, 의미 있는 이름은 감싸는 링크가 갖는다.
export default function Logo({ size = 32, ...rest }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <rect width="64" height="64" rx="14" fill="#1f2c37" />
      <path d="M18 16h8v13h12V16h8v32h-8V36H26v12h-8z" fill="#5a5aff" />
      <circle cx="53" cy="12" r="5" fill="#fff689" />
    </svg>
  );
}
