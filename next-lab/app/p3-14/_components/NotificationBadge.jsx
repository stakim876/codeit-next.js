// ~/next-lab/app/p3-14/_components/NotificationBadge.jsx
// 메모. 캐시에는 알림 배열이 들어 있다.
// countUnread를 select로 넘기면 이 컴포넌트의 data만 안 읽은 개수가 된다.
// isPending: 아직 한 번도 못 받음 → '...'.
// isFetching: 다시 받는 중. 개수는 유지하고 '새로 확인하는 중'만 붙인다.
"use client";

import { useNotifications } from "./useNotifications.js";

function countUnread(notifications) {
  return notifications.filter((item) => !item.isRead).length;
}

export default function NotificationBadge() {
  const { data, isPending, isFetching } = useNotifications(countUnread);

  if (isPending) {
    return <p className="font-semibold">읽지 않은 알림 ...</p>;
  }

  return (
    <p className="font-semibold">
      읽지 않은 알림 {data}개{isFetching && " . 새로 확인하는 중"}
    </p>
  );
}
