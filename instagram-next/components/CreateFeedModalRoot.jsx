// ~/instagram-next/components/CreateFeedModalRoot.jsx
// 스토어를 읽는 클라이언트 컴포넌트. 글 작성 창을 붙였다 떼는 일만 한다.
'use client';

import { useUiStore } from '@/stores/useUiStore.js';
import CreateFeedModal from './CreateFeedModal.jsx';

export default function CreateFeedModalRoot() {
  // 이 함수가 다시 실행될 때마다 찍힌다. 열림 값이 바뀌면 한 번 더 나온다.
  console.log('[render] CreateFeedModalRoot');
  // 스토어 전체를 받지 않고 필요한 값만 고른다. 고른 값이 바뀔 때만 여기가 다시 그려진다.
  const isOpen = useUiStore((state) => state.isCreateFeedOpen);
  const close = useUiStore((state) => state.closeCreateFeed);

  // 닫혀 있으면 모달을 마운트하지 않는다. 다음에 열면 미리보기 state는 처음부터다.
  if (!isOpen) {
    return null;
  }

  // 배경이나 닫기 버튼이 onClose를 부르면 closeCreateFeed가 isCreateFeedOpen을 false로 바꾼다.
  return <CreateFeedModal onClose={close} />
}