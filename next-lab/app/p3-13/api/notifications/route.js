/*
  복습: 읽음 처리의 대상이 되는 목록 API
  핵심: GET은 p3-13 메모리 배열을 1초 뒤에 주고, POST는 안 읽은 알림을 그 배열 끝에 붙인다. PATCH는 다른 route 파일이 같은 배열의 isRead를 고친다.
  이유: 목록 주소와 모두 읽음 주소를 나눠도 저장소가 같아야, 읽음 처리 다음 GET이 바뀐 isRead를 돌려준다.
  실행: 처음 GET은 세 건이다. POST body의 text가 새 항목이 되고 id는 당시 길이+1, 상태는 201이다.
  활용: 생성과 조회가 한 주소이고 상태 변경은 하위 주소인 REST 자원에 쓴다.
*/

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
