// ~/next-lab/app/p3-14/_components/NotificationBadge.jsx
"use client";

import { useNotifications } from "./useNotifications.js";

// select에 넘기면 data가 알림 배열이 아니라 안 읽은 개수가 된다.
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
