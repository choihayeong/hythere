import type { Metadata } from 'next';
import WorkList from '@/components/WorkList';
import Section from '@/layouts/Section';
import { getVisibleWorks } from '@/utils/works';

// 페이지별 <title>. 루트 layout의 template('%s | 최하영')과 합쳐진다.
export const metadata: Metadata = {
  title: 'All works',
  description: '참여한 프로젝트 전체 목록. 카테고리별로 걸러 볼 수 있습니다.',
};

// 운영 사이트는 vue-router 에 /projects 가 있었지만 서버 설정이 없어 직접 접속하면 404 였다.
// App Router 는 폴더가 곧 URL 이라 별도 설정 없이 동작한다.
export default function ProjectsPage() {
  const works = getVisibleWorks();

  return (
    <Section
      id="all-works"
      title="All works"
      headingLevel="h1"
      description={`${works.length}개의 프로젝트에 참여했습니다. 카테고리를 눌러 걸러 보세요.`}
    >
      <WorkList works={works} />
    </Section>
  );
}
