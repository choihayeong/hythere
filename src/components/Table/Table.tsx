import styles from './Table.module.scss';

/**
 * 컬럼 하나의 정의.
 * <T>는 "행 데이터 타입"을 나중에 채워 넣는 자리(제네릭). 사용하는 쪽 데이터에 맞춰 자동으로 정해진다.
 */
export interface TableColumn<T> {
  /** 컬럼 구분용 고유 키. render가 없으면 row[key]를 그대로 표시한다. */
  key: string;
  /** 머리글에 보이는 텍스트 */
  header: React.ReactNode;
  /** 셀 내용을 직접 그릴 때. (예: 상태 값을 Badge로, 숫자를 천 단위 콤마로) */
  render?: (row: T, rowIndex: number) => React.ReactNode;
  /** 셀 정렬. 숫자는 보통 right */
  align?: 'left' | 'center' | 'right';
  /** 컬럼 너비 (예: '120px', '20%') */
  width?: string;
}

/** Table 컴포넌트 props */
export interface TableProps<T> {
  /** 컬럼 정의 목록 (순서대로 그려진다) */
  columns: TableColumn<T>[];
  /** 행 데이터 목록 */
  rows: T[];
  /** 각 행의 고유 키를 꺼내는 함수. React가 행을 구분하는 데 쓴다. */
  rowKey: (row: T, rowIndex: number) => string | number;
  /** 표 제목. 화면엔 숨겨지지만 스크린리더가 "무슨 표인지" 읽는다. 꼭 넣는다. */
  caption: string;
  /** 줄무늬 배경 */
  striped?: boolean;
  /** 셀 여백을 줄인 조밀한 표 */
  compact?: boolean;
  /** 데이터가 없을 때 보여줄 문구 */
  emptyMessage?: string;
  /** 추가 클래스 (외부 레이아웃용) */
  className?: string;
}

// 함수 이름 뒤 <T>: "이 컴포넌트는 행 타입 T를 받아서 동작한다"는 선언.
// <Table columns={...} rows={users} /> 처럼 쓰면 T가 User로 자동 추론되어
// render={(row) => row.name} 에서 row.name 자동완성과 오타 검사가 된다.
export default function Table<T>({
  columns,
  rows,
  rowKey,
  caption,
  striped = false,
  compact = false,
  emptyMessage = '표시할 데이터가 없습니다.',
  className,
}: TableProps<T>) {
  const classes = [styles.table, striped && styles.striped, compact && styles.compact]
    .filter(Boolean)
    .join(' ');

  // render가 없을 때 row[key]를 꺼낸다. T가 무엇인지 모르므로 "문자열 키를 가진 객체"로 한 번 바꿔 읽는다.
  const getCellValue = (row: T, key: string): React.ReactNode => {
    const value = (row as Record<string, unknown>)[key];
    return value == null ? '' : String(value);
  };

  return (
    // 좁은 화면에서 표가 잘리지 않도록 가로 스크롤 영역으로 감싼다.
    // tabIndex=0: 키보드 사용자도 스크롤 영역에 포커스를 두고 좌우로 움직일 수 있게 (WCAG 권고).
    // 린트는 "비상호작용 요소에 tabIndex 금지"라 하지만 스크롤 영역은 인정되는 예외라 그 줄만 끈다.
    <div
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      role="region"
      aria-label={caption}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      <table className={classes}>
        <caption className={styles.caption}>{caption}</caption>
        <thead>
          <tr>
            {columns.map((col) => (
              // scope="col": 이 셀이 "열 머리글"임을 스크린리더에 알려 셀을 읽을 때 머리글을 함께 읽어준다.
              <th
                key={col.key}
                scope="col"
                className={col.align && styles[`align-${col.align}`]}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className={styles.empty} colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={rowKey(row, rowIndex)}>
                {columns.map((col) => (
                  <td key={col.key} className={col.align && styles[`align-${col.align}`]}>
                    {col.render ? col.render(row, rowIndex) : getCellValue(row, col.key)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
