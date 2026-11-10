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
