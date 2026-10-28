import type { Metadata } from 'next';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import Accordion from '@/components/Accordion';
import Toast from '@/components/Toast';
import Typography from '@/components/Typography';
import Table, { type TableColumn } from '@/components/Table';
import Tabs from '@/components/Tabs';
import ToastDemo from './ToastDemo';
import ModalDemo from './ModalDemo';
import PaginationDemo from './PaginationDemo';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'UI Kit',
  description: '이 포트폴리오 사이트를 구성하는 재사용 UI 컴포넌트와 사용 예시입니다.',
};

// 컴포넌트 목록 데이터. 새 컴포넌트를 만들면 여기에 한 줄 추가하고 아래에 섹션을 붙인다.
const components = [
  { id: 'typography', name: 'Typography', description: '글자 크기·굵기·색을 규칙대로 쓰는 텍스트' },
  { id: 'button', name: 'Button', description: '클릭 동작을 일으키는 기본 버튼' },
  { id: 'badge', name: 'Badge', description: '상태·분류를 표시하는 작은 라벨' },
  { id: 'accordion', name: 'Accordion', description: '제목을 눌러 내용을 펼치고 접는 목록' },
  { id: 'toast', name: 'Toast', description: '화면 구석에 잠시 떠서 결과를 알리는 메시지' },
  { id: 'modal', name: 'Modal', description: '화면 위에 떠서 집중을 요구하는 대화 상자' },
  { id: 'table', name: 'Table', description: '컬럼 정의와 행 데이터로 그리는 표' },
  { id: 'tabs', name: 'Tabs', description: '여러 내용을 한 영역에서 전환해 보여주는 탭' },
  { id: 'pagination', name: 'Pagination', description: '긴 목록을 페이지 단위로 이동하는 탐색' },
];

// Accordion 데모용 데이터: 이 사이트를 어떻게 만들었는지 소개하는 Q&A
const faqItems = [
  {
    id: 'faq-1',
    title: '이 사이트는 어떤 스택으로 만들었나요?',
    content:
      'Next.js(App Router) + React + TypeScript로 만들고, 스타일은 SCSS와 CSS Modules로 작성했습니다. Vercel에 배포합니다.',
  },
  {
    id: 'faq-2',
    title: '컴포넌트는 어떤 기준으로 만들었나요?',
    content:
      '시맨틱 마크업과 키보드 접근성을 먼저 갖추고, 색상·간격은 디자인 토큰(CSS 변수)만 사용합니다. 각 컴포넌트는 tsx + module.scss + index.ts 세 파일로 구성됩니다.',
  },
  {
    id: 'faq-3',
    title: '접근성은 어떻게 확인하나요?',
    content:
      'ESLint의 jsx-a11y 규칙과 axe-core 자동 검사를 거치고, 키보드만으로 모든 기능을 쓸 수 있는지 직접 확인합니다.',
  },
];

// Table 데모용 데이터와 컬럼 정의
interface Member {
  id: number;
  name: string;
  role: string;
  status: 'active' | 'pending' | 'inactive';
  posts: number;
}

const members: Member[] = [
  { id: 1, name: '김민지', role: '퍼블리셔', status: 'active', posts: 1240 },
  { id: 2, name: '이준호', role: '프론트엔드', status: 'pending', posts: 86 },
  { id: 3, name: '박서연', role: '디자이너', status: 'inactive', posts: 0 },
  { id: 4, name: '최현우', role: '백엔드', status: 'active', posts: 3021 },
];

const statusBadge: Record<
  Member['status'],
  { label: string; variant: 'success' | 'warning' | 'neutral' }
> = {
  active: { label: '활성', variant: 'success' },
  pending: { label: '대기', variant: 'warning' },
  inactive: { label: '비활성', variant: 'neutral' },
};

// TableColumn<Member>: 이 컬럼들은 Member 행을 다룬다고 알려주면 render의 row에서 자동완성이 된다.
const memberColumns: TableColumn<Member>[] = [
  { key: 'name', header: '이름', width: '140px' },
  { key: 'role', header: '역할' },
  {
    key: 'status',
    header: '상태',
    align: 'center',
    render: (row) => (
      <Badge variant={statusBadge[row.status].variant}>{statusBadge[row.status].label}</Badge>
    ),
  },
  {
    key: 'posts',
    header: '게시글',
    align: 'right',
    render: (row) => row.posts.toLocaleString('ko-KR'), // 천 단위 콤마
  },
];

// Tabs 데모용 데이터
const tabItems = [
  {
    id: 'info',
    label: '상품 정보',
    content: <Typography variant="medium">상품의 상세 설명이 들어가는 영역입니다.</Typography>,
  },
  {
    id: 'review',
    label: '리뷰 (12)',
    content: <Typography variant="medium">사용자 리뷰 목록이 들어가는 영역입니다.</Typography>,
  },
  {
    id: 'qna',
    label: 'Q&A',
    content: <Typography variant="medium">질문과 답변이 들어가는 영역입니다.</Typography>,
  },
  {
    id: 'shipping',
    label: '배송 안내',
    content: <Typography variant="medium">준비 중입니다.</Typography>,
    disabled: true,
  },
];

// 컴포넌트 인덱스 페이지 (/component)
// 만든 컴포넌트를 한눈에 보고, variant별 모양을 확인하는 쇼케이스 역할.
export default function ComponentIndexPage() {
  return (
    <div className={styles.root}>
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>UI Kit</h1>
        <p className={styles.lead}>
          이 포트폴리오 사이트를 구성하는 재사용 UI 컴포넌트입니다. 직접 설계하고 구현했으며, 각
          컴포넌트의 변형(variant)과 동작을 아래에서 확인할 수 있습니다.
        </p>
      </header>

      {/* 목차: 같은 페이지 안의 섹션으로 이동 */}
      <nav aria-label="컴포넌트 목차" className={styles.toc}>
        <ul>
          {components.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`}>{c.name}</a>
              <span className={styles.tocDesc}>{c.description}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* ---------- Typography ---------- */}
      <section id="typography" className={styles.section} aria-labelledby="typography-heading">
        <h2 id="typography-heading" className={styles.heading}>
          Typography
        </h2>
        <p className={styles.desc}>
          <code>variant</code>로 크기를, <code>as</code>로 실제 태그를 정합니다. 모양과 문서 구조를
          분리해 시각적 크기와 heading 레벨을 따로 고를 수 있습니다. <code>weight</code>,{' '}
          <code>color</code>, <code>align</code>, <code>truncate</code>를 지원합니다.
        </p>

        <h3 className={styles.subheading}>variant (크기 스케일)</h3>
        <div className={styles.demoBlock}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>Typography variant별 크기</caption>
            <thead>
              <tr>
                <th scope="col">variant</th>
                <th scope="col">크기</th>
                <th scope="col">기본 태그</th>
                <th scope="col">미리보기</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>h1</code>
                </td>
                <td>36px / 2.25rem</td>
                <td>h1</td>
                <td>
                  {/* 데모 페이지의 제목 구조를 깨지 않도록 as="p"로 그린다 */}
                  <Typography variant="h1" as="p">
                    제목 1
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <code>h2</code>
                </td>
                <td>24px / 1.5rem</td>
                <td>h2</td>
                <td>
                  <Typography variant="h2" as="p">
                    제목 2
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <code>large</code>
                </td>
                <td>18px / 1.125rem</td>
                <td>p</td>
                <td>
                  <Typography variant="large">강조 본문, 리드 문장</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <code>base</code>
                </td>
                <td>16px / 1rem</td>
                <td>p</td>
                <td>
                  <Typography>기본 본문 텍스트</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <code>medium</code>
                </td>
                <td>14px / 0.875rem</td>
                <td>p</td>
                <td>
                  <Typography variant="medium">버튼, 라벨, 보조 본문</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <code>small</code>
                </td>
                <td>13px / 0.8125rem</td>
                <td>p</td>
                <td>
                  <Typography variant="small">부가 설명</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <code>xsmall</code>
                </td>
                <td>11px / 0.6875rem</td>
                <td>p</td>
                <td>
                  <Typography variant="xsmall">캡션, 보조 표기</Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className={styles.subheading}>weight · color · align · truncate</h3>
        <div className={styles.demoBlock}>
          <div className={styles.stack}>
            <Typography weight="regular">weight=regular (400)</Typography>
            <Typography weight="medium">weight=medium (500)</Typography>
            <Typography weight="bold">weight=bold (700)</Typography>
            <Typography color="muted">color=muted</Typography>
            <Typography color="primary">color=primary</Typography>
            <Typography color="danger">color=danger</Typography>
            <Typography align="center">align=center</Typography>
            <Typography truncate style={{ maxWidth: 240 }}>
              truncate: 긴 문장은 한 줄에서 잘리고 말줄임표가 붙습니다. 이 문장은 충분히 길어서
              잘립니다.
            </Typography>
          </div>
        </div>

        <pre className={styles.code}>
          <code>{`<Typography variant="h1">페이지 제목</Typography>
<Typography variant="h2" as="h3">시각적으론 h2, 구조상 h3</Typography>
<Typography variant="small" color="muted">부가 설명</Typography>`}</code>
        </pre>
      </section>

      {/* ---------- Button ---------- */}
      <section id="button" className={styles.section} aria-labelledby="button-heading">
        <h2 id="button-heading" className={styles.heading}>
          Button
        </h2>
        <p className={styles.desc}>
          <code>variant</code>(primary · secondary · ghost), <code>size</code>(sm · md · lg),
          <code>fullWidth</code>, <code>disabled</code>를 지원합니다.
        </p>

        <h3 className={styles.subheading}>variant</h3>
        <div className={styles.demo}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>

        <h3 className={styles.subheading}>size</h3>
        <div className={styles.demo}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>

        <h3 className={styles.subheading}>상태</h3>
        <div className={styles.demo}>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>

        <h3 className={styles.subheading}>fullWidth</h3>
        <div className={styles.demoBlock}>
          <Button fullWidth>가로 꽉 채우기</Button>
        </div>

        <pre className={styles.code}>
          <code>{`<Button variant="secondary" size="sm">텍스트</Button>`}</code>
        </pre>
      </section>

      {/* ---------- Badge ---------- */}
      <section id="badge" className={styles.section} aria-labelledby="badge-heading">
        <h2 id="badge-heading" className={styles.heading}>
          Badge
        </h2>
        <p className={styles.desc}>
          <code>variant</code>(neutral · primary · success · warning · danger)와{' '}
          <code>outline</code>을 지원합니다.
        </p>

        <h3 className={styles.subheading}>variant</h3>
        <div className={styles.demo}>
          <Badge>Neutral</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>

        <h3 className={styles.subheading}>outline</h3>
        <div className={styles.demo}>
          <Badge outline>Neutral</Badge>
          <Badge variant="primary" outline>
            Primary
          </Badge>
          <Badge variant="success" outline>
            Success
          </Badge>
          <Badge variant="warning" outline>
            Warning
          </Badge>
          <Badge variant="danger" outline>
            Danger
          </Badge>
        </div>

        <pre className={styles.code}>
          <code>{`<Badge variant="success" outline>완료</Badge>`}</code>
        </pre>
      </section>

      {/* ---------- Accordion ---------- */}
      <section id="accordion" className={styles.section} aria-labelledby="accordion-heading">
        <h2 id="accordion-heading" className={styles.heading}>
          Accordion
        </h2>
        <p className={styles.desc}>
          <code>items</code> 배열로 항목을 넘깁니다. <code>allowMultiple</code>,{' '}
          <code>defaultOpenIds</code>, <code>headingLevel</code>을 지원합니다. 키보드(Tab, Enter,
          Space)로 조작할 수 있습니다.
        </p>

        <h3 className={styles.subheading}>기본 (하나만 열림)</h3>
        <div className={styles.demoBlock}>
          <Accordion items={faqItems} defaultOpenIds={['faq-1']} headingLevel="h4" />
        </div>

        <h3 className={styles.subheading}>allowMultiple (여러 개 동시에 열림)</h3>
        <div className={styles.demoBlock}>
          <Accordion items={faqItems} allowMultiple headingLevel="h4" />
        </div>

        <pre className={styles.code}>
          <code>{`<Accordion
  items={[{ id: 'a', title: '제목', content: '내용' }]}
  defaultOpenIds={['a']}
  allowMultiple
/>`}</code>
        </pre>
      </section>

      {/* ---------- Toast ---------- */}
      <section id="toast" className={styles.section} aria-labelledby="toast-heading">
        <h2 id="toast-heading" className={styles.heading}>
          Toast
        </h2>
        <p className={styles.desc}>
          <code>useToast()</code> 훅의 <code>showToast(message, options)</code>로 띄웁니다.{' '}
          <code>variant</code>(info · success · warning · danger), <code>duration</code>(ms, 0이면
          수동 닫기)을 지원합니다. 루트 레이아웃의 <code>ToastProvider</code>가 목록과 타이머를
          관리합니다.
        </p>

        <h3 className={styles.subheading}>모양 (정적)</h3>
        <div className={styles.demo}>
          <Toast message="일반 안내" />
          <Toast message="저장했습니다" variant="success" />
          <Toast message="확인이 필요합니다" variant="warning" />
          <Toast message="실패했습니다" variant="danger" />
        </div>

        {/* 클릭이 필요한 데모는 클라이언트 컴포넌트로 분리 */}
        <ToastDemo />

        <pre className={styles.code}>
          <code>{`'use client';
import useToast from '@/hooks/useToast';

const { showToast } = useToast();
showToast('저장했습니다.', { variant: 'success', duration: 3000 });`}</code>
        </pre>
      </section>
      {/* ---------- Modal ---------- */}
      <section id="modal" className={styles.section} aria-labelledby="modal-heading">
        <h2 id="modal-heading" className={styles.heading}>
          Modal
        </h2>
        <p className={styles.desc}>
          네이티브 <code>&lt;dialog&gt;</code> 기반. <code>open</code>/<code>onClose</code>로 부모가
          열림 상태를 제어하고, <code>title</code>, <code>footer</code>, <code>size</code>(sm · md ·
          lg), <code>closeOnBackdrop</code>을 지원합니다. 포커스 가두기와 Esc 닫기는 브라우저가
          처리합니다.
        </p>

        <ModalDemo />

        <pre className={styles.code}>
          <code>{`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>열기</Button>
<Modal open={open} onClose={() => setOpen(false)} title="제목"
  footer={<Button onClick={() => setOpen(false)}>확인</Button>}>
  내용
</Modal>`}</code>
        </pre>
      </section>
      {/* ---------- Table ---------- */}
      <section id="table" className={styles.section} aria-labelledby="table-heading">
        <h2 id="table-heading" className={styles.heading}>
          Table
        </h2>
        <p className={styles.desc}>
          <code>columns</code>(컬럼 정의)와 <code>rows</code>(행 데이터)를 넘기면 그려집니다. 셀을
          직접 그리려면 컬럼에 <code>render</code>를 넣습니다. <code>striped</code>,{' '}
          <code>compact</code>, <code>emptyMessage</code>를 지원하고, 좁은 화면에서는 가로로
          스크롤됩니다. <code>caption</code>은 필수입니다.
        </p>

        <h3 className={styles.subheading}>기본 (render로 Badge · 숫자 포맷)</h3>
        <Table
          columns={memberColumns}
          rows={members}
          rowKey={(row) => row.id}
          caption="멤버 목록"
        />

        <h3 className={styles.subheading}>striped + compact</h3>
        <Table
          columns={memberColumns}
          rows={members}
          rowKey={(row) => row.id}
          caption="멤버 목록 (줄무늬, 조밀)"
          striped
          compact
        />

        <h3 className={styles.subheading}>데이터 없음</h3>
        <Table columns={memberColumns} rows={[]} rowKey={(row) => row.id} caption="빈 멤버 목록" />

        <pre className={styles.code}>
          <code>{`const columns: TableColumn<User>[] = [
  { key: 'name', header: '이름' },
  { key: 'status', header: '상태', render: (row) => <Badge>{row.status}</Badge> },
];

<Table columns={columns} rows={users} rowKey={(row) => row.id} caption="사용자 목록" />`}</code>
        </pre>
      </section>
      {/* ---------- Tabs ---------- */}
      <section id="tabs" className={styles.section} aria-labelledby="tabs-heading">
        <h2 id="tabs-heading" className={styles.heading}>
          Tabs
        </h2>
        <p className={styles.desc}>
          <code>items</code> 배열로 탭을 넘깁니다. <code>variant</code>(underline · pill),{' '}
          <code>fullWidth</code>, <code>defaultActiveId</code>, <code>onChange</code>를 지원합니다.
          키보드 ← → Home End 로 이동하고, 비활성 탭은 건너뜁니다.
        </p>

        <h3 className={styles.subheading}>underline (기본)</h3>
        <div className={styles.demoBlock}>
          <Tabs items={tabItems} ariaLabel="상품 상세 탭" />
        </div>

        <h3 className={styles.subheading}>pill + fullWidth</h3>
        <div className={styles.demoBlock}>
          <Tabs
            items={tabItems}
            variant="pill"
            fullWidth
            defaultActiveId="review"
            ariaLabel="상품 상세 탭 (pill)"
          />
        </div>

        <pre className={styles.code}>
          <code>{`<Tabs
  items={[
    { id: 'a', label: '첫 번째', content: <p>내용 A</p> },
    { id: 'b', label: '두 번째', content: <p>내용 B</p>, disabled: true },
  ]}
  variant="pill"
  ariaLabel="예시 탭"
/>`}</code>
        </pre>
      </section>
      {/* ---------- Pagination ---------- */}
      <section id="pagination" className={styles.section} aria-labelledby="pagination-heading">
        <h2 id="pagination-heading" className={styles.heading}>
          Pagination
        </h2>
        <p className={styles.desc}>
          <code>page</code>/<code>totalPages</code>/<code>onChange</code>로 부모가 현재 페이지를
          제어합니다. <code>siblingCount</code>, <code>showFirstLast</code>, <code>size</code>(sm ·
          md)를 지원합니다. 번호 목록 계산은 <code>utils/paginationRange.ts</code>의 순수 함수가
          담당합니다.
        </p>

        <PaginationDemo />

        <pre className={styles.code}>
          <code>{`const [page, setPage] = useState(1);

<Pagination page={page} totalPages={20} onChange={setPage} showFirstLast />`}</code>
        </pre>
      </section>
    </div>
  );
}
