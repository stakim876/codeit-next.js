// ~/next-lab/app/p3-14/_components/useNotifications.js
// 메모. 배지와 목록이 같이 쓰는 알림 조회.
// 1. queryKey가 둘 다 ['notifications']라서 요청은 한 번, 캐시는 하나다.
// 2. 실패하면 retry: 1 때문에 한 번만 더 친다. 또 실패하면 멈춘다.
// 3. throwOnError는 캐시에 data가 없을 때만 true → 그때만 error.js로 간다.
//    예전에 받아 둔 목록이 있으면 에러를 컴포넌트로 넘기고 화면은 유지한다.
// 4. select를 넘기면 캐시 원본은 그대로 두고, 그 컴포넌트의 data만 바꿔 준다.
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
    retry: 1,
    throwOnError: (error, query) => query.state.data === undefined,
    select,
  });
}
