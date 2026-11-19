/*
  복습: 호출될 때만 올라가는 서버 횟수
  핵심: count는 모듈 변수다. GET이 실행될 때마다 1을 더한 뒤 1초 기다리고 그 숫자를 돌려준다. 브라우저 캐시가 재요청을 건너뛰면 이 함수는 호출되지 않는다.
  이유: 클라이언트가 다시 받았는지 화면 숫자만으로는 서버 호출과 구분하기 어렵다. 호출 횟수를 응답에 넣으면 요청이 실제로 도착했는지 보인다.
  실행: 첫 GET은 1, 다음 실제 호출은 2다. 1초 뒤에야 JSON이 나간다. 서버를 재시작하면 0부터 다시 센다.
  활용: 캐시가 요청을 막는지 확인할 때, 호출 카운터 API로 쓴다.
*/

// ~/next-lab/app/p3-12/practice3/api/route.js
// /p3-12/practice3/api. 이 주소가 불릴 때마다 응답 횟수를 1 올린다.
let count = 0;

export async function GET() {
  count += 1;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json({ count });
}
