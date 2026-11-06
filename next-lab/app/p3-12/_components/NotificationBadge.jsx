// ~/next-lab/app/p3-12/_components/NotificationBadge.jsx
// 읽지 않은 알림 개수. 목록을 닫아도 이 숫자는 헤더에 남는다.
'use client';

import { useNotifications } from './useNotifications.js';

export default function NotificationBadge() {
  // isPending은 아직 한 번도 못 받은 상태. isFetching은 다시 받는 중이다.
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
