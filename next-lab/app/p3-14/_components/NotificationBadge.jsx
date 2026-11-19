/*
  복습: 캐시 원본은 배열로 두고, 이 컴포넌트만 개수를 받기
  핵심: select 함수의 반환값이 이 훅의 data가 된다. 캐시에 저장된 값은 여전히 알림 배열이라 목록 컴포넌트의 data와 모양이 다르다.
  이유: 배지가 배열 전체를 구독하면 글자만 바뀌어도 개수 컴포넌트가 같은 배열 갱신에 묶인다. select로 숫자만 넘기면 이 컴포넌트가 보는 값이 개수다.
  실행: countUnread가 isRead false의 길이를 센다. isPending이면 자리표시, 그 외에는 그 숫자다. isFetching이면 새로 확인하는 중만 뒤에 붙고 숫자는 유지된다.
  활용: 같은 응답을 한쪽은 개수, 한쪽은 목록으로 보게 할 때 쓴다.
*/

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
