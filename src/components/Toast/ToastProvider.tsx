'use client';
// 토스트 목록 상태와 타이머를 관리하고, 화면 구석에 토스트들을 그린다.

import { createContext, useCallback, useMemo, useState } from 'react';
import Toast, { type ToastVariant } from './Toast';
import styles from './ToastProvider.module.scss';

/** showToast()에 넘기는 옵션 */
export interface ToastOptions {
  /** 의미에 따른 색상 (기본 info) */
  variant?: ToastVariant;
  /** 자동으로 사라지는 시간(ms). 0이면 닫기 버튼을 누를 때까지 유지. 기본 3000 */
  duration?: number;
}

/** 화면에 떠 있는 토스트 한 개의 데이터 */
interface ToastItem extends ToastOptions {
  id: number;
  message: React.ReactNode;
}

/** 하위 컴포넌트가 사용할 함수들 */
export interface ToastContextValue {
  /** 토스트를 띄운다. 반환값은 토스트 id (수동으로 닫을 때 사용) */
  showToast: (message: React.ReactNode, options?: ToastOptions) => number;
  /** 특정 토스트를 닫는다 */
  dismissToast: (id: number) => void;
}

// Context: props로 일일이 내려주지 않고, 트리 아래 어디서든 값을 꺼내 쓰게 해주는 통로.
// 토스트는 페이지 깊숙한 버튼에서도 호출해야 하므로 Context가 알맞다.
export const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 1; // 토스트마다 고유 id를 붙이기 위한 카운터

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: React.ReactNode, options: ToastOptions = {}) => {
      const id = nextId++;
      const { variant = 'info', duration = 3000 } = options;
      setToasts((prev) => [...prev, { id, message, variant, duration }]);

      // duration이 0보다 크면 시간이 지난 뒤 자동으로 닫는다.
      if (duration > 0) {
        window.setTimeout(() => dismissToast(id), duration);
      }
      return id;
    },
    [dismissToast],
  );

  // useMemo/useCallback: 함수 객체가 렌더마다 새로 만들어지면 Context를 쓰는 모든 컴포넌트가
  // 불필요하게 다시 렌더링된다. 값이 실제로 바뀔 때만 새로 만들도록 묶어 둔다.
  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* aria-live 영역: 이 안에 새 내용이 생기면 스크린리더가 읽어준다. */}
      <div className={styles.viewport} aria-live="polite" aria-atomic="false">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            variant={toast.variant}
            onClose={() => dismissToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
