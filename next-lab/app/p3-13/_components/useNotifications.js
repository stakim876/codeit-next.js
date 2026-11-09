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
