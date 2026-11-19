/*
  복습: 한 건 읽음은 이 실습에서 실제로 배열을 고친다
  핵심: 모두 읽음과 달리 이 PATCH는 500으로 막혀 있지 않다. id에 해당하는 항목의 isRead를 true로 바꾼다.
  이유: 한 건 성공과 일괄 실패를 같은 화면에서 비교하려고 경로마다 결과를 다르게 둔다.
  실행: 1초 뒤 그 id를 찾으면 항목 JSON을 주고, 없으면 404다. 목록 mutation의 onSuccess가 notifications 키를 무효화하면 배지 개수도 다시 계산된다.
  활용: 일괄 작업은 막고 개별 수정만 열어 두는 API 구성에 쓴다.
*/

// ~/next-lab/app/p3-13/api/notifications/[id]/read/route.js
import { notifications } from "../../../../_data/notifications.js";

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
