// ~/next-lab/app/p3-12/_components/NotificationList.jsx
// 알림 글 목록. 배지와 같은 useNotifications라 이미 받은 목록을 다시 쓴다.
'use client';

import { useNotifications } from './useNotifications.js';

export default function NotificationList() {
  const { data, isPending, error } = useNotifications();

  if (isPending) {
    return <p className='mt-4'>불러오는 중…</p>;
  }

  if (error) {
    return <p className='mt-4'>{error.message}</p>;
  }

  return (
    <ul className='mt-4 space-y-2'>
      {data.map((item) => (
        <li
          key={item.id}
          className={item.isRead ? 'text-gray-400' : ''}>
          {item.text}
        </li>
      ))}
    </ul>
  );
}
