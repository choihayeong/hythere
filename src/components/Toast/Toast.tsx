import styles from './Toast.module.scss';

/** 토스트 종류 */
export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

/** Toast 컴포넌트 props (화면에 보이는 토스트 한 개) */
export interface ToastProps {
  /** 표시할 메시지 */
  message: React.ReactNode;
  /** 의미에 따른 색상 */
  variant?: ToastVariant;
  /** 닫기 버튼을 눌렀을 때 호출. 없으면 닫기 버튼을 그리지 않는다. */
  onClose?: () => void;
}

// 모양만 담당하는 "표현 컴포넌트". 상태(목록, 타이머)는 ToastProvider가 관리한다.
// 이렇게 나누면 Toast는 어디서든 단독으로도 쓸 수 있고 테스트·스타일 확인도 쉽다.
export default function Toast({ message, variant = 'info', onClose }: ToastProps) {
  const classes = [styles.root, styles[variant]].join(' ');

  return (
    // role="status": 스크린리더가 지금 읽는 내용을 끊지 않고 "조용히" 알려준다.
    // 오류(danger)는 role="alert"로 즉시 알린다.
    <div className={classes} role={variant === 'danger' ? 'alert' : 'status'}>
      <span className={styles.icon} aria-hidden="true" />
      <p className={styles.message}>{message}</p>
      {onClose && (
        <button type="button" className={styles.close} onClick={onClose} aria-label="알림 닫기">
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
}
