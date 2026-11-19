/*
  복습: 닫혀 있는 동안 목록 컴포넌트를 만들지 않기
  핵심: isOpen이 false면 NotificationList를 렌더하지 않는다. 마운트되지 않은 컴포넌트는 훅을 실행하지 않는다.
  이유: 배지가 이미 같은 키로 받아 두었으므로, 열 때는 목록이 그 캐시를 바로 쓴다. 닫혀 있을 때 목록 트리를 만들지 않으면 불필요한 구독이 없다.
  실행: 버튼 글자는 알림 보기와 알림 닫기가 isOpen에 따라 바뀐다. 열리면 그 아래에 목록이 붙고, 닫히면 목록 컴포넌트는 사라진다.
  활용: 드롭다운, 접히는 필터처럼 열리기 전에는 내부를 만들지 않을 때 쓴다.
*/

// ~/next-lab/app/p3-12/_components/NotificationPanel.jsx
// 알림 목록은 버튼을 눌렀을 때만 그린다. 배지는 이 창 밖에 있다.
'use client';

import { useState } from 'react';
import NotificationList from './NotificationList.jsx';

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className='mt-4'>
      <button
        type='button'
        className='rounded border px-2'
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '알림 닫기' : '알림 보기'}
      </button>
      {isOpen && <NotificationList />}
    </section>
  );
}
