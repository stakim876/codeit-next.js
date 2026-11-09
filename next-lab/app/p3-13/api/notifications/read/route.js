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
