// ~/next-lab/app/p3-14/api/notifications/read/route.js
import { notifications } from "../../../_data/notifications.js";

export async function PATCH() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 모두 읽음 실패 화면을 보려고 여기서 끝낸다. 아래 읽음 처리는 실행되지 않는다.
  return Response.json({ message: "서버에 문제가 생겼어요" }, { status: 500 });

  const unread = notifications.filter((item) => !item.isRead);

  for (const item of unread) {
    item.isRead = true;
  }

  return Response.json({ count: unread.length });
}
