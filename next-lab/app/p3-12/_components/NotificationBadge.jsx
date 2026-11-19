/*
  복습: 아직 한 번도 못 받은 상태와 다시 받는 중을 나누기
  핵심: isPending은 data가 한 번도 없는 처음 로딩이다. isFetching은 캐시가 있든 없든 요청이 진행 중이라는 뜻이다.
  이유: 다시 받을 때마다 숫자를 숨기면 화면이 깜빡인다. 처음만 자리표시를 보여주고, 그 뒤엔 숫자를 유지한 채 확인 중 문구만 붙인다.
  실행: 처음엔 읽지 않은 알림 … 이다. 배열이 오면 isRead가 false인 개수를 센다. 초기 데이터는 2개다. 요청이 겹치면 개수 뒤에 새로 확인하는 중 이 붙는다.
  활용: 장바구니 수량, 안 읽은 메일 수처럼 갱신 중에도 마지막 숫자를 보여줄 때 쓴다.
*/

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
