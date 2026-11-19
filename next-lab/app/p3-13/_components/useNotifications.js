/*
  복습: 신선한 동안은 다시 받지 않고, 안 쓰면 곧 버리기
  핵심: staleTime 30초 동안은 fresh라 마운트되어도 다시 fetch하지 않는다. gcTime 10초는 구독자가 없어진 뒤 캐시를 지우기까지 기다리는 시간이다.
  이유: 기본값은 받은 즉시 stale이라 화면을 갔다 오면 항상 다시 받는다. 30초 안에는 방금 받은 목록을 믿게 하고, 10초만 떠나면 메모리에서는 버린다.
  실행: /p3-13/api/notifications 를 받아 notifications 키에 넣는다. 30초 안에 패널을 다시 열면 네트워크가 없다. 알림 화면을 떠나 10초가 지나면 캐시가 삭제된다.
  활용: 자주 안 바뀌는 설정은 staleTime을 늘리고, 무거운 목록은 gcTime으로 빨리 비울 때 쓴다.
*/

// ~/next-lab/app/p3-13/_components/useNotifications.js
// staleTime 동안은 신선한 캐시라 다시 받지 않는다.
// gcTime은 이 쿼리를 쓰는 화면이 없어진 뒤 캐시를 지우기까지 기다릴 시간이다.
import { useQuery } from "@tanstack/react-query";

async function getNotifications() {
  const response = await fetch("/p3-13/api/notifications");

  if (!response.ok) {
    throw new Error(`알림을 불러오지 못했어요 (${response.status})`);
  }

  return response.json();
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    staleTime: 30 * 1000,
    gcTime: 10 * 1000,
  });
}
