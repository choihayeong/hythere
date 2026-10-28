'use client';
// 'use client': useState(열림/닫힘 상태)와 onClick을 쓰므로 브라우저에서 동작하는 컴포넌트로 표시한다.
// Next.js App Router는 기본이 서버 컴포넌트라 이 한 줄이 없으면 훅을 쓸 수 없다.

import { useId, useState } from 'react';
import styles from './Accordion.module.scss';

/** 아코디언 항목 하나 */
export interface AccordionItem {
  /** 항목 구분용 고유 값. aria-controls 연결과 열림 상태 추적에 쓴다. */
  id: string;
  /** 헤더에 보이는 제목 */
  title: React.ReactNode;
  /** 펼쳤을 때 보이는 내용 */
  content: React.ReactNode;
}

/** Accordion 컴포넌트 props */
export interface AccordionProps {
  /** 항목 목록 */
  items: AccordionItem[];
  /** 처음에 열려 있을 항목의 id 목록 */
  defaultOpenIds?: string[];
  /** true면 여러 항목을 동시에 열 수 있다. false면 하나를 열면 나머지는 닫힌다. */
  allowMultiple?: boolean;
  /** 제목에 쓸 heading 태그. 페이지의 제목 구조(h1 → h2 → h3)에 맞춰 지정한다. */
  headingLevel?: 'h2' | 'h3' | 'h4';
  /** 추가 클래스 (외부 레이아웃용) */
  className?: string;
}

export default function Accordion({
  items,
  defaultOpenIds = [],
  allowMultiple = false,
  headingLevel: Heading = 'h3', // 변수명을 대문자로 받아야 <Heading>처럼 태그로 쓸 수 있다.
  className,
}: AccordionProps) {
  // 열려 있는 항목 id 목록을 상태로 관리한다. 상태가 바뀌면 React가 화면을 다시 그린다.
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);
  // 한 페이지에 아코디언이 여러 개 있어도 DOM id가 겹치지 않도록 인스턴스별 고유 접두어를 만든다.
  // (서버 렌더링과 브라우저에서 같은 값이 나오도록 React가 보장한다.)
  const uid = useId();

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (isOpen) return prev.filter((openId) => openId !== id); // 닫기
      return allowMultiple ? [...prev, id] : [id]; // 열기 (단일 모드면 나머지는 닫힘)
    });
  };

  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `${uid}-${item.id}-button`;
        const panelId = `${uid}-${item.id}-panel`;

        return (
          <div key={item.id} className={styles.item}>
            {/* 제목은 heading 태그로 감싸고, 그 안에 button을 둔다 (WAI-ARIA 아코디언 패턴).
                스크린리더가 제목 구조로 탐색할 수 있고, button이라 키보드(Enter/Space)로 바로 동작한다. */}
            <Heading className={styles.heading}>
              <button
                type="button"
                id={buttonId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span className={styles.title}>{item.title}</span>
                <span className={styles.icon} aria-hidden="true" />
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.panel}
              hidden={!isOpen}
            >
              <div className={styles.content}>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
