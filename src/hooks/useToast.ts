'use client';

import { useContext } from 'react';
import { ToastContext, type ToastContextValue } from '@/components/Toast';

/**
 * 토스트를 띄우는 훅.
 * 사용: const { showToast } = useToast(); showToast('저장했습니다', { variant: 'success' });
 *
 * 커스텀 훅은 "use로 시작하는 함수"일 뿐이다. 자주 쓰는 로직(여기선 Context 꺼내기 + 오류 검사)을
 * 한 곳에 모아 두면 쓰는 쪽 코드가 짧아진다.
 */
export default function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    // Provider 밖에서 호출하면 바로 알려준다. 조용히 동작하지 않는 것보다 원인을 찾기 쉽다.
    throw new Error(
      'useToast는 <ToastProvider> 안에서만 사용할 수 있습니다. app/layout.tsx를 확인하세요.',
    );
  }
  return context;
}
