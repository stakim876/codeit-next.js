// ~/next-lab/app/p3-12/api/notifications/route.js
// /p3-12/api/notifications. 알림 목록을 주고, 새 알림을 받는다.
import { notifications } from '../../_data/notifications.js';

export async function GET() {
  // 받아 오는 동안 화면의 불러오는 중 문구가 보이게 1초 기다린다.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json(notifications);
}

export async function POST(request) {
  const { text } = await request.json();
  const notification = { id: notifications.length + 1, text, isRead: false };

  notifications.push(notification);

  return Response.json(notification, { status: 201 });
}
