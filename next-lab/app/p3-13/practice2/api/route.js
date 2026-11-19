/*
  복습: 요청이 도착할 때만 1을 더하는 카운터
  핵심: 이 모듈의 count는 p3-12 practice3과 다른 변수다. 주소가 달라 클라이언트의 response-count 캐시가 재요청을 건너뛰면 이 GET은 실행되지 않는다.
  이유: 화면 숫자가 그대로인 이유가 서버가 같은 값을 줘서인지, 요청 자체가 없어서인지 응답 횟수로 구분한다.
  실행: 실제 GET마다 count를 1 올리고 1초 뒤 { count }를 준다. staleTime 안의 화면 복귀는 이 함수를 타지 않아 숫자가 오르지 않는다.
  활용: 캐시 적중이면 호출되지 않는 측정용 API에 쓴다.
*/

// ~/next-lab/app/p3-12/practice3/api/route.js
// 호출할 때마다 메모리의 횟수를 1 올린다. 캐시가 신선하면 이 라우트는 다시 호출되지 않는다.
let count = 0;

export async function GET() {
  count += 1;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json({ count });
}
