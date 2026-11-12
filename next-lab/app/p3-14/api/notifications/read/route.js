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
