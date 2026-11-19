/*
  복습: 메모리 배열에 글을 추가하는 방명록 API
  핵심: entries는 모듈 배열이라 POST의 push가 다음 GET에 보인다. GET과 POST가 한 route 파일에 있다.
  이유: 화면의 invalidate는 GET을 다시 부른다. 저장이 이 배열에 남아 있어야 다시 받은 목록에 새 글이 있다.
  실행: GET은 0.5초 뒤 처음 두 문장을 준다. POST는 body.text로 id를 길이+1로 만들어 1초 뒤에 201로 돌려주고 배열에 남긴다. 글 길이 제한은 없다.
  활용: 검증 없이 추가만 확인하는 수업용 목록 API에 쓴다. 글자 수 제한은 practice3에서 더한다.
*/

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
