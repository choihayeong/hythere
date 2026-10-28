import styles from './Typography.module.scss';

/** 글자 크기 종류 (디자인 스케일) */
export type TypographyVariant = 'h1' | 'h2' | 'base' | 'large' | 'medium' | 'small' | 'xsmall';

/** 렌더링할 HTML 태그 */
export type TypographyTag =
  'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'label' | 'strong' | 'small';

/** Typography 컴포넌트 props */
export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** 안에 들어갈 텍스트 */
  children: React.ReactNode;
  /** 글자 크기. h1 36px · h2 24px · large 18px · base 16px · medium 14px · small 13px · xsmall 11px */
  variant?: TypographyVariant;
  /**
   * 실제로 그릴 태그. 생략하면 variant에 맞는 기본 태그(h1→h1, h2→h2, 나머지→p)를 쓴다.
   * "모양"과 "의미"를 분리하기 위한 장치: 예) 시각적으로는 h2 크기지만 문서 구조상 h3인 경우
   * <Typography variant="h2" as="h3">
   */
  as?: TypographyTag;
  /** 굵기 */
  weight?: 'regular' | 'medium' | 'bold';
  /** 색상 (토큰 기준) */
  color?: 'default' | 'muted' | 'primary' | 'danger';
  /** 정렬 */
  align?: 'left' | 'center' | 'right';
  /** 한 줄로 자르고 말줄임표(…) 표시 */
  truncate?: boolean;
}

// variant별 기본 태그. 제목은 제목 태그로, 나머지는 문단으로.
const defaultTag: Record<TypographyVariant, TypographyTag> = {
  h1: 'h1',
  h2: 'h2',
  large: 'p',
  base: 'p',
  medium: 'p',
  small: 'p',
  xsmall: 'p',
};

export default function Typography({
  children,
  variant = 'base',
  as,
  weight,
  color = 'default',
  align,
  truncate = false,
  className,
  ...rest
}: TypographyProps) {
  // 변수명이 대문자면 JSX에서 <Tag>처럼 태그 이름으로 쓸 수 있다. (소문자면 HTML 태그 'tag'로 오해함)
  const Tag = as ?? defaultTag[variant];

  const classes = [
    styles.root,
    styles[variant],
    weight && styles[`weight-${weight}`],
    color !== 'default' && styles[`color-${color}`],
    align && styles[`align-${align}`],
    truncate && styles.truncate,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
