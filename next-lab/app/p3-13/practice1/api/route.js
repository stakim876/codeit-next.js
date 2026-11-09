// ~/next-lab/app/p3-13/practice1/api/route.js
// GET은 메모리의 방명록이다. POST가 그 배열에 글을 붙인다.
const entries = [
  { id: 1, text: '사진 잘 보고 가요!' },
  { id: 2, text: '한강 노을 사진 최고예요' },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return Response.json(entries);
}

export async function POST(request) {
  const { text } = await request.json();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const entry = { id: entries.length + 1, text };
  entries.push(entry);

  return Response.json(entry, { status: 201 });
}
