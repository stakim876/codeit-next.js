/*
  복습: 조건에 맞는 항목을 한 번에 갱신하기
  핵심: PATCH는 일부 수정이다. 안 읽은 항목만 골라 isRead를 true로 바꾸고, 바꾼 개수를 count로 돌려준다.
  이유: 클라이언트가 목록을 받아 하나씩 PATCH하면 요청이 개수만큼 나간다. 모두 읽음은 서버가 한 번에 고르는 편이 맞다.
  실행: 1초 대기 후 isRead가 false인 것들을 true로 만든다. 이미 읽은 3번은 빠진다. 처음 호출이면 count는 2다. 이어서 또 호출하면 0이다.
  활용: 메일함 모두 읽음, 알림 전부 확인처럼 일괄 상태 변경에 쓴다.
*/

// ~/next-lab/app/p3-13/api/notifications/read/route.js
// 안 읽은 알림을 전부 읽음으로 바꾸고, 바꾼 개수를 돌려준다.
import { notifications } from '../../../_data/notifications.js';

export async function PATCH() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const unread = notifications.filter((item) => !item.isRead);

  for (const item of unread) {
    item.isRead = true;
  }

  return Response.json({ count: unread.length });
}
