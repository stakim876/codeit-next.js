// ~/next-lab/app/p3-12/practice3/api/route.js
// 호출할 때마다 메모리의 횟수를 1 올린다. 캐시가 신선하면 이 라우트는 다시 호출되지 않는다.
let count = 0;

export async function GET() {
  count += 1;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json({ count });
}
