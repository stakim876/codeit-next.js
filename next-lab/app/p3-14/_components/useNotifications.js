/*
  복습: 재시도 횟수, 에러를 던질 조건, select를 한 쿼리에 모으기
  핵심: retry: 1 은 실패 뒤 한 번만 더 부른다. throwOnError는 캐시에 data가 없을 때만 true라, 첫 실패는 error.js로 가고 갱신 실패는 컴포넌트의 error로 남는다. select는 구독자마다 data 모양만 바꾼다.
  이유: 무조건 throw하면 새로고침 실패에도 페이지가 통째로 바뀐다. 한 번도 못 받은 경우만 대체 화면이 필요하고, 배지만 개수가 필요하면 캐시 원본을 쪼개면 안 된다.
  실행: queryKey는 notifications 하나다. 배지가 countUnread를 select로 넘기면 그 호출의 data만 숫자다. 목록은 select 없이 배열을 받는다. staleTime 30초 동안은 fresh다.
  활용: 여러 컴포넌트가 한 요청을 쓰고, 실패 처리와 값의 모양만 다르게 할 때 쓴다.
*/

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
