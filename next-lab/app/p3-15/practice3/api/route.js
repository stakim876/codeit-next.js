/*
  복습: 20자를 넘는 글은 저장하지 않고 400을 주기
  핵심: POST는 JSON의 text.length가 20보다 크면 메시지와 400을 반환하고 push하지 않는다. GET은 pending 없는 저장 배열만 돌려준다.
  이유: 화면은 20자 초과도 일단 회색으로 넣는다. 서버가 거절해야 onError가 그 줄을 지우고, 사용자가 보는 제한이 클라이언트 기분에 좌우되지 않는다.
  실행: GET은 0.5초 뒤 처음 두 문장이다. 21자 POST는 1초 뒤 400이라 배열 길이가 그대로다. 20자 이하는 id를 길이+1로 붙여 201이다. 저장 항목에는 pending 필드가 없다.
  활용: 서버가 최종 검증을 하고, 화면의 낙관적 줄은 그 결과에 맞추는 API에 쓴다.
*/

// ~/next-lab/app/p3-14/practice2/api/route.js
const entries = [
  { id: 1, text: "사진 잘 보고 가요!" },
  { id: 2, text: "한강 노을 사진 최고예요" },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 뒤에 목록

  return Response.json(entries); // GuestbookList가 ['guestbook'] 캐시에 넣음
}

export async function POST(request) {
  const { text } = await request.json();
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 뒤에 저장

  if (text.length > 20) {
    return Response.json({ message: "방명록은 20자까지 남길 수 있어요." }, { status: 400 }); // 폼이 이 문구를 보여 줌
  }

  const entry = { id: entries.length + 1, text };
  entries.push(entry); // 메모리 목록에 추가. pending은 없음

  return Response.json(entry, { status: 201 });
}
