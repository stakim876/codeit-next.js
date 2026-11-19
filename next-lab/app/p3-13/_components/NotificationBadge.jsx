/*
  복습: 무효화 뒤 다시 받는 동안 개수를 유지하기
  핵심: 모두 읽음이나 한 건 읽음이 notifications 키를 invalidate하면 이 쿼리도 다시 fetch한다. isFetching만 true가 되고, 새 응답 전에는 이전 data로 개수를 센다.
  이유: 읽음 요청이 1초이므로 그 사이 숫자를 숨기면 배지가 로딩으로 깜빡인다. 이전 개수를 보여 주고 확인 중만 붙인다.
  실행: 처음 isPending이면 읽지 않은 알림 … 다. 데이터가 오면 false인 개수다. 다시 받는 중에는 새로 확인하는 중이 붙고, 응답이 오면 줄어든 개수로 바뀐다.
  활용: 갱신 중에도 마지막 배지를 유지하는 헤더에 쓴다.
*/

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
