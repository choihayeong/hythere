'use client';
// 선택된 탭 상태(useState)와 키보드 이동(포커스 제어)이 필요해 클라이언트 컴포넌트.

import { useId, useRef, useState } from 'react';
import styles from './Tabs.module.scss';

/** 탭 항목 하나 */
export interface TabItem {
  /** 항목 구분용 고유 값 */
  id: string;
  /** 탭 버튼에 보이는 이름 */
  label: React.ReactNode;
  /** 선택했을 때 보이는 내용 */
  content: React.ReactNode;
  /** 비활성 (선택 불가, 키보드 이동에서도 건너뜀) */
  disabled?: boolean;
}

/** Tabs 컴포넌트 props */
export interface TabsProps {
  /** 탭 목록 */
  items: TabItem[];
  /** 처음 선택될 탭 id. 생략하면 첫 번째(비활성 아닌) 탭 */
  defaultActiveId?: string;
  /** 탭이 바뀔 때 알려준다 (부모가 알아야 할 때만 사용) */
  onChange?: (id: string) => void;
  /** 모양. underline = 밑줄, pill = 알약 버튼 */
  variant?: 'underline' | 'pill';
  /** 탭 버튼들이 가로 너비를 균등하게 채움 */
  fullWidth?: boolean;
  /** 탭 목록의 접근성 이름 (예: "상품 정보 탭"). 페이지에 탭이 여러 개면 꼭 넣는다. */
  ariaLabel?: string;
  /** 추가 클래스 (외부 레이아웃용) */
  className?: string;
}

export default function Tabs({
  items,
  defaultActiveId,
  onChange,
  variant = 'underline',
  fullWidth = false,
  ariaLabel,
  className,
}: TabsProps) {
  const firstEnabled = items.find((item) => !item.disabled)?.id ?? items[0]?.id;
  const [activeId, setActiveId] = useState(defaultActiveId ?? firstEnabled);
  const uid = useId();
  // 탭 버튼 DOM들을 id별로 보관해 두고 키보드 이동 시 .focus()를 호출한다.
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    onChange?.(id); // onChange가 있을 때만 호출 (옵셔널 체이닝)
  };

  // 키보드 탐색: ← → 로 이웃 탭, Home/End 로 첫/마지막 탭. 비활성 탭은 건너뛴다.
  // 방향키로 이동하면 포커스와 선택이 함께 움직인다 ("자동 활성화" 방식).
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const enabled = items.filter((item) => !item.disabled);
    const enabledIndex = enabled.findIndex((item) => item.id === items[currentIndex].id);
    let nextIndex = enabledIndex;

    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (enabledIndex + 1) % enabled.length; // 끝에서 다시 처음으로
        break;
      case 'ArrowLeft':
        nextIndex = (enabledIndex - 1 + enabled.length) % enabled.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = enabled.length - 1;
        break;
      default:
        return; // 그 외 키는 브라우저 기본 동작 유지
    }

    e.preventDefault(); // 방향키로 페이지가 스크롤되는 것을 막는다
    const next = enabled[nextIndex];
    select(next.id);
    tabRefs.current[next.id]?.focus();
  };

  const rootClasses = [styles.root, styles[variant], fullWidth && styles.fullWidth, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      {/* role="tablist": 이 묶음이 탭 모음이라고 스크린리더에 알린다 */}
      <div role="tablist" aria-label={ariaLabel} className={styles.list}>
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`${uid}-panel-${item.id}`}
              // 로빙 탭인덱스: 선택된 탭만 Tab 키 순서에 들어가고, 나머지는 방향키로만 이동한다.
              // 탭이 10개여도 Tab 키 한 번으로 내용 영역까지 지나갈 수 있다.
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              className={styles.tab}
              onClick={() => select(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <div
            key={item.id}
            role="tabpanel"
            id={`${uid}-panel-${item.id}`}
            aria-labelledby={`${uid}-tab-${item.id}`}
            // 패널 안에 포커스 가능한 요소가 없을 수도 있어 패널 자체가 포커스를 받게 한다.
            tabIndex={0}
            hidden={!isActive}
            className={styles.panel}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}
