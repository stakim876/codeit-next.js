/*
  복습: 실패 응답을 주석으로 꺼 둔 목록 API
  핵심: 지금 GET은 1초 뒤 알림 배열을 200으로 준다. 바로 위의 500 return은 주석이라 실행되지 않는다.
  이유: 그 한 줄을 살리면 캐시가 없는 첫 방문은 throwOnError가 true가 되어 error.js로 간다. 이미 data가 있으면 목록은 남고 에러만 컴포넌트로 전달된다. 평소에는 성공 응답으로 화면을 본다.
  실행: POST는 text로 안 읽은 알림을 배열에 붙이고 201을 준다. GET의 500 줄은 주석이므로 목록 조회는 성공한다.
  활용: 같은 파일에서 성공 경로와 일부러 실패시키는 경로를 바꿔 가며 에러 경계를 시험할 때 쓴다.
*/

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
