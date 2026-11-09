// ~/next-lab/app/p3-13/api/notifications/[id]/read/route.js
// 주소의 id 하나만 읽음으로 바꾼다. 없으면 404.
import { notifications } from '../../../../_data/notifications.js';

export async function PATCH(request, { params }) {
  const { id } = await params;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const notification = notifications.find((item) => item.id === Number(id));

  if (!notification) {
    return Response.json({ message: `${id}번 알림은 없어요` }, { status: 404 });
  }

  notification.isRead = true;

  return Response.json(notification);
}
