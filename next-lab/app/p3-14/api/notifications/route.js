// ~/next-lab/app/p3-14/api/notifications/route.js
// 메모. GET은 1초 후 알림 배열을 준다.
// 500 return 주석을 살리면, 캐시가 없는 첫 방문은 error.js로 간다.
// 캐시가 이미 있으면 throwOnError가 false라 목록은 남는다.
import { notifications } from "../../_data/notifications.js";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 이 줄을 살리면 목록 조회가 실패한다. 받아 둔 알림이 없을 때 error.js가 나온다.
  // return Response.json({ message: '서버에 문제가 생겼어요' }, { status: 500 });

  return Response.json(notifications);
}

export async function POST(request) {
  const { text } = await request.json();
  const notification = { id: notifications.length + 1, text, isRead: false };

  notifications.push(notification);

  return Response.json(notification, { status: 201 });
}
