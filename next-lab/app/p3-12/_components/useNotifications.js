/*
  복습: 같은 키로 요청을 한 번만 보내기
  핵심: useQuery는 queryKey가 같으면 캐시 하나를 공유한다. queryFn이 실패하면 throw한 Error가 error로 전달된다.
  이유: 배지와 목록이 각자 fetch하면 1초짜리 요청이 두 번 나간다. 키를 notifications 하나로 두면 먼저 받은 결과를 나머지가 그대로 쓴다.
  실행: fetch가 /p3-12/api/notifications 를 친다. ok가 아니면 상태 코드를 넣은 Error를 던지고, 성공하면 JSON 배열이 data가 된다.
  활용: 헤더 숫자와 본문 목록이 같은 서버 결과를 그릴 때 훅 하나로 묶는다.
*/

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
