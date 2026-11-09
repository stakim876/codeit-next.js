// ~/next-lab/app/p3-12/_components/NotificationBadge.jsx
// 목록과 같은 notifications 캐시를 쓴다. 읽음 처리 뒤 다시 받는 동안 isFetching이 켜진다.
'use client';

import { useNotifications } from './useNotifications.js';

export default function NotificationBadge() {
  const { data, isPending, isFetching } = useNotifications();

  if (isPending) {
    return <p className='font-semibold'>읽지 않은 알림 …</p>;
  }

  const unread = data.filter((item) => !item.isRead).length;

  return (
    <p className='font-semibold'>
      읽지 않은 알림 {unread}개{isFetching && ' · 새로 확인하는 중'}
    </p>
  );
}
