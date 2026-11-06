// ~/next-lab/app/p3-12/practice3/api/route.js
// /p3-12/practice3/api. 이 주소가 불릴 때마다 응답 횟수를 1 올린다.
let count = 0;

export async function GET() {
  count += 1;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json({ count });
}
