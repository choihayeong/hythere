'use client';
// Modal 데모. 열림 상태(useState)와 버튼 클릭이 필요해 클라이언트 컴포넌트로 분리.

import { useState } from 'react';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';
import useToast from '@/hooks/useToast';
import styles from './page.module.scss';

export default function ModalDemo() {
  // 어떤 모달이 열려 있는지 하나의 상태로 관리. null이면 모두 닫힘.
  const [openModal, setOpenModal] = useState<'basic' | 'confirm' | 'long' | null>(null);
  const { showToast } = useToast();
  const close = () => setOpenModal(null);

  return (
    <>
      <h3 className={styles.subheading}>종류</h3>
      <div className={styles.demo}>
        <Button variant="secondary" onClick={() => setOpenModal('basic')}>
          기본 모달
        </Button>
        <Button variant="secondary" onClick={() => setOpenModal('confirm')}>
          확인 모달 (배경 클릭 잠금)
        </Button>
        <Button variant="secondary" onClick={() => setOpenModal('long')}>
          긴 내용 (lg)
        </Button>
      </div>

      {/* 기본 */}
      <Modal open={openModal === 'basic'} onClose={close} title="기본 모달">
        <Typography>
          Esc 키, 닫기 버튼, 배경 클릭으로 닫힙니다. 열려 있는 동안 Tab 포커스는 모달 안에서만
          움직입니다.
        </Typography>
      </Modal>

      {/* 확인 */}
      <Modal
        open={openModal === 'confirm'}
        onClose={close}
        title="정말 삭제할까요?"
        size="sm"
        closeOnBackdrop={false}
        footer={
          <>
            <Button variant="secondary" onClick={close}>
              취소
            </Button>
            <Button
              onClick={() => {
                close();
                showToast('삭제했습니다.', { variant: 'success' });
              }}
            >
              삭제
            </Button>
          </>
        }
      >
        <Typography variant="medium" color="muted">
          이 작업은 되돌릴 수 없습니다. 배경을 눌러도 닫히지 않으니 버튼으로 선택해 주세요.
        </Typography>
      </Modal>

      {/* 긴 내용 */}
      <Modal
        open={openModal === 'long'}
        onClose={close}
        title="이용 약관"
        size="lg"
        footer={<Button onClick={close}>확인</Button>}
      >
        <div className={styles.stack}>
          {Array.from({ length: 12 }, (_, i) => (
            <Typography key={i} variant="medium">
              {i + 1}. 본문이 길어지면 머리글과 바닥글은 고정되고 이 영역만 스크롤됩니다.
              모바일에서는 화면 높이에 맞춰 자동으로 줄어듭니다.
            </Typography>
          ))}
        </div>
      </Modal>
    </>
  );
}
