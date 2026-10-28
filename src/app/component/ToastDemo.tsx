'use client';
// 데모 전용 클라이언트 컴포넌트.
// page.tsx(서버 컴포넌트)에서는 onClick이나 훅을 쓸 수 없으므로, 클릭이 필요한 부분만 따로 떼어낸다.

import Button from '@/components/Button';
import useToast from '@/hooks/useToast';
import styles from './page.module.scss';

export default function ToastDemo() {
  const { showToast } = useToast();

  return (
    <>
      <h3 className={styles.subheading}>variant</h3>
      <div className={styles.demo}>
        <Button variant="secondary" onClick={() => showToast('일반 안내 메시지입니다.')}>
          Info
        </Button>
        <Button
          variant="secondary"
          onClick={() => showToast('저장했습니다.', { variant: 'success' })}
        >
          Success
        </Button>
        <Button
          variant="secondary"
          onClick={() => showToast('저장하지 않은 변경 사항이 있습니다.', { variant: 'warning' })}
        >
          Warning
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            showToast('요청에 실패했습니다. 다시 시도해 주세요.', { variant: 'danger' })
          }
        >
          Danger
        </Button>
      </div>

      <h3 className={styles.subheading}>duration</h3>
      <div className={styles.demo}>
        <Button variant="ghost" onClick={() => showToast('1초 뒤 사라집니다.', { duration: 1000 })}>
          1초
        </Button>
        <Button
          variant="ghost"
          onClick={() => showToast('닫기 버튼을 눌러야 사라집니다.', { duration: 0 })}
        >
          수동 닫기
        </Button>
      </div>
    </>
  );
}
