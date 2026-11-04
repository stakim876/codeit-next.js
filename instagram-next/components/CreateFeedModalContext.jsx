// ~/instagram-next/components/CreateFeedModalContext.jsx
// 글 작성 창을 열고 닫는 상태. 만들기 버튼과 창이 이 값을 같이 쓴다.
'use client';

import { createContext, useContext, useState } from 'react';
import CreateFeedModal from './CreateFeedModal.jsx';

// 열기 함수를 담는 통. 처음 값은 null이라 Provider 밖에서는 못 읽는다.
const CreateFeedModalContext = createContext(null);

// 레이아웃이 페이지를 이 컴포넌트로 감싼다.
export function CreateFeedModalProvider({ children }) {
  // 창이 열려 있는지. 처음에는 닫혀 있다.
  const [isOpen, setIsOpen] = useState(false);
  // 만들기 버튼이 이 함수를 부른다.
  const open = () => setIsOpen(true);

  return (
    // value는 열기 함수. 안쪽 컴포넌트가 useContext로 꺼낸다.
    <CreateFeedModalContext value={open}>
      {children}
      {/* 열려 있을 때만 창을 그린다. 닫기는 상태를 false로 되돌린다. */}
      {isOpen && <CreateFeedModal onClose={() => setIsOpen(false)} />}
    </CreateFeedModalContext>
  );
}

// 만들기 버튼이 열기 함수를 가져갈 때 쓴다.
export function useOpenCreateFeedModal() {
  const open = useContext(CreateFeedModalContext);

  // Provider 밖이면 열기 함수가 없다.
  if (open === null) {
    throw new Error(
      'useOpenCreateFeedModal은 CreateFeedModalProvider 안에서만 쓸 수 있어요.',
    );
  }

  return open;
}