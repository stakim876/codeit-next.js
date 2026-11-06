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
