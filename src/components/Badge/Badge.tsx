import styles from './Badge.module.scss';

/** Badge 컴포넌트 props */
// 상태·분류를 짧게 표시하는 라벨. <span>을 감싸므로 span의 속성(title, aria-* 등)을 그대로 받는다.
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 표시할 짧은 텍스트 */
  children: React.ReactNode;
  /** 의미에 따른 색상 */
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
  /** 테두리만 있는 스타일 */
  outline?: boolean;
}

export default function Badge({
  children,
  variant = 'neutral',
  outline = false,
  className,
  ...rest
}: BadgeProps) {
  const classes = [styles.root, styles[variant], outline && styles.outline, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
