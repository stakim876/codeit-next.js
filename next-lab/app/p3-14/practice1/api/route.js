/*
  복습: 표에 없는 도시는 404로 끝내기
  핵심: temperatures에 그 키가 있는지로 성공과 없음을 가른다. in 연산자는 값이 0이어도 키가 있으면 true다. 여기서는 기온이 0인 도시는 없다.
  이유: 없는 도시를 200과 null로 주면 클라이언트가 실패인지 빈 값인지 다시 해석해야 한다. 404면 retry 함수가 status를 보고 멈출 수 있다.
  실행: seoul 18, busan 21, jeju 23은 1초 뒤 200이다. daegu는 표에 없어 404와 메시지다. 화면의 대구 버튼이 이 404를 탄다. 제주는 표에만 있고 버튼은 없다.
  활용: 존재 여부가 상태 코드로 드러나야 하는 조회 API에 쓴다.
*/

// ~/next-lab/app/p3-14/practice1/api/route.js
// 메모. 서울 18, 부산 21, 제주 23만 있다.
// 대구는 표에 없으니 404. 화면의 retryWeather가 재시도를 끊는다.
const temperatures = { seoul: 18, busan: 21, jeju: 23 };

export async function GET(request) {
  const city = request.nextUrl.searchParams.get("city");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!(city in temperatures)) {
    return Response.json(
      { message: `${city}의 날씨는 없어요` },
      { status: 404 },
    );
  }

  return Response.json({ city, temperature: temperatures[city] });
}
