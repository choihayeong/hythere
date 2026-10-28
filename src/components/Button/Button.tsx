import styles from './Button.module.scss';

/** Button 컴포넌트 props */
// React.ButtonHTMLAttributes<HTMLButtonElement> 를 extends 하는 이유:
// onClick, disabled, type, aria-* 등 <button>이 원래 받는 속성을 하나하나 다시 정의하지 않고 그대로 받기 위해서.
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 안에 들어갈 내용 (텍스트, 아이콘) */
  children: React.ReactNode;
  /** 시각적 종류. primary = 주요 동작, secondary = 보조 동작, ghost = 배경 없는 텍스트 버튼 */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 부모 너비에 꽉 채우기 (모바일 하단 버튼 등) */
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  type = 'button', // 기본값을 'button'으로 두어 <form> 안에서 의도치 않게 submit 되는 것을 막는다.
  ...rest // 위에서 꺼내지 않은 나머지 속성(onClick, disabled, aria-label 등)을 한 번에 받는다.
}: ButtonProps) {
  const classes = [
    styles.root,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
