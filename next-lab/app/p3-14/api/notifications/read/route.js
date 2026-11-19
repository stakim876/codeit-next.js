/*
  복습: 모두 읽음이 서버에서 실패하게 막아 두기
  핵심: PATCH는 1초 뒤 500과 메시지를 return한다. return 아래의 isRead 변경은 실행되지 않는 코드다.
  이유: 버튼의 onError와 화면 문구를 보려면 서버가 실패해야 한다. 배열을 실제로 고치면 실패 연습이 되지 않는다.
  실행: 이 주소의 모든 PATCH는 500이다. 메모리의 isRead는 바뀌지 않는다. 클라이언트의 mutation은 throw하고 캐시를 무효화하지 않는다.
  활용: 실패 분기를 고정해 두고 버튼 에러 문구를 확인할 때 쓴다. 성공 경로를 다시 쓰려면 500 return을 치워야 아래 코드가 실행된다.
*/

// ~/next-lab/app/p3-14/api/notifications/read/route.js
// 메모. 1초 기다린 뒤 500을 return. 함수는 여기서 끝난다.
// 아래 isRead = true는 실행되지 않는다. 버튼 실패 문구를 보려고 막아 둔 것.
import { notifications } from "../../../_data/notifications.js";

export async function PATCH() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json({ message: "서버에 문제가 생겼어요" }, { status: 500 });

  const unread = notifications.filter((item) => !item.isRead);

  for (const item of unread) {
    item.isRead = true;
  }

  return Response.json({ count: unread.length });
}
