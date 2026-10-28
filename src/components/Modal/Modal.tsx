'use client';
// 열림/닫힘을 DOM API(showModal/close)와 동기화해야 하므로 클라이언트 컴포넌트.

import { useEffect, useId, useRef } from 'react';
import styles from './Modal.module.scss';

/** Modal 컴포넌트 props */
export interface ModalProps {
  /** 열림 여부. 부모가 상태로 들고 있다 (제어 컴포넌트). */
  open: boolean;
  /** 닫혀야 할 때 호출된다 (닫기 버튼, Esc, 배경 클릭). 부모는 여기서 open을 false로 바꾼다. */
  onClose: () => void;
  /** 모달 제목. aria-labelledby로 연결되어 스크린리더가 "무슨 창인지" 읽는다. */
  title: React.ReactNode;
  /** 본문 */
  children: React.ReactNode;
  /** 하단 버튼 영역 (취소/확인 등). 없으면 그리지 않는다. */
  footer?: React.ReactNode;
  /** 너비 */
  size?: 'sm' | 'md' | 'lg';
  /** false면 배경을 눌러도 닫히지 않는다 (중요한 확인 창 등) */
  closeOnBackdrop?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
}: ModalProps) {
  // useRef: 실제 <dialog> DOM 요소를 붙잡아 두는 상자. showModal() 같은 DOM 메서드를 부르기 위해 필요하다.
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // useEffect: "open 값이 바뀐 뒤" DOM에 반영한다. React 상태 → 브라우저 dialog 상태를 맞추는 다리.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      // showModal(): 최상위 레이어에 띄우고, 바깥 요소는 비활성화(포커스 가두기), Esc로 닫힘까지 브라우저가 처리
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Esc 키 등 브라우저가 스스로 닫았을 때 부모 상태도 따라가게 한다.
  const handleClose = () => {
    if (open) onClose();
  };

  // 배경(dialog 요소 자체) 클릭 감지. 내용 영역 클릭은 e.target이 안쪽 요소라 걸러진다.
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (closeOnBackdrop && e.target === e.currentTarget) onClose();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      className={[styles.root, styles[size]].join(' ')}
      aria-labelledby={titleId}
      onClose={handleClose}
      onClick={handleBackdropClick}
    >
      {/* 배경 클릭과 내용 클릭을 구분하기 위해 내용을 한 번 더 감싼다 */}
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="닫기">
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div className={styles.body}>{children}</div>
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </dialog>
  );
}
