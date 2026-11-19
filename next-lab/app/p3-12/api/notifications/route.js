/*
  복습: 같은 주소에서 목록 조회와 추가를 나누기
  핵심: route.js는 HTTP 메서드 이름과 같은 함수를 내보낸다. GET과 POST는 주소가 같아도 다른 함수다.
  이유: 목록과 생성을 다른 경로로 나누지 않아도, 메서드만으로 읽기와 쓰기를 구분할 수 있다.
  실행: GET은 1초 뒤에 메모리 배열을 JSON으로 준다. POST는 body의 text로 id를 길이+1로 만들고 isRead false인 항목을 push한 뒤 201을 돌려준다. 서버를 재시작하면 추가분은 사라진다.
  활용: 알림, 댓글처럼 목록 조회와 생성이 한 자원인 API에 쓴다.
*/

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
