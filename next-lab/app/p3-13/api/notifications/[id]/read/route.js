/*
  복습: 주소의 id 하나만 수정하기
  핵심: [id] 칸은 한 알림을 가리킨다. params는 Promise라 await로 꺼내고, 배열의 id는 숫자라 Number로 맞춰 find한다.
  이유: 모두 읽음과 달리 사용자가 고른 한 건만 바꿔야 한다. 주소에 id가 있으면 body 없이 대상을 지정할 수 있다.
  실행: 1번 PATCH는 그 항목의 isRead를 true로 하고 항목 JSON을 준다. 없는 id는 404와 메시지다. 1초 기다린 뒤에 찾는다.
  활용: 글 하나 읽음, 주문 하나 취소처럼 개별 자원의 일부 수정에 쓴다.
*/

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
