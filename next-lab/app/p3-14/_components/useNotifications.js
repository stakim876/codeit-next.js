// ~/next-lab/app/p3-14/_components/useNotifications.js
import { useQuery } from "@tanstack/react-query";

async function getNotifications() {
  const response = await fetch("/p3-14/api/notifications");

  if (!response.ok) {
    throw new Error(`알림을 불러오지 못했어요 (${response.status})`);
  }

  return response.json();
}

export function useNotifications(select) {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    staleTime: 30 * 1000,
    // 실패하면 한 번만 다시 요청한다.
    retry: 1,
    // 받아 둔 알림이 없을 때만 error.js로 넘긴다. 있으면 그 화면을 유지한다.
    throwOnError: (error, query) => query.state.data === undefined,
    // 배지는 목록 대신 안 읽은 개수만 받는다.
    select,
  });
}
