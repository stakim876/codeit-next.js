// ~/next-lab/app/p3-12/api/notifications/route.js
// GET은 메모리의 알림 목록이다. POST는 그 배열에 안 읽은 알림을 붙이고, PATCH가 같은 배열을 고친다.
import { notifications } from '../../_data/notifications.js';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json(notifications);
}

export async function POST(request) {
  const { text } = await request.json();
  const notification = { id: notifications.length + 1, text, isRead: false };

  notifications.push(notification);

  return Response.json(notification, { status: 201 });
}
