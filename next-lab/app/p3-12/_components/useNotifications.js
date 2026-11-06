// ~/next-lab/app/p3-12/_components/useNotifications.js
// 알림 목록을 queryKey 하나로 받아 둔다. 배지와 목록이 같은 결과를 같이 쓴다.
import { useQuery } from '@tanstack/react-query';

async function getNotifications() {
  const response = await fetch('/p3-12/api/notifications');

  if (!response.ok) {
    throw new Error(`알림을 불러오지 못했어요 (${response.status})`);
  }

  return response.json();
}

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });
}
