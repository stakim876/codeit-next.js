/*
  복습: 화면 대신 JSON을 돌려주는 주소
  핵심: route.js는 page.js와 달리 HTML을 그리지 않는다. 내보낸 GET 함수가 그 주소의 GET 요청을 처리한다. 같은 폴더에 page.js와 route.js를 같이 둘 수는 없다.
  이유: 도시 날씨를 다른 화면이나 HTTP 파일이 받으려면 HTML이 아니라 데이터 응답이 필요하다. 주소의 도시 이름은 페이지와 같이 params로 온다.
  실행: /p3-04/practice1/seoul 은 { city, temperature: 23, sky: 맑음 }이다. 표에 없는 도시는 status 404와 메시지를 보낸다. params는 Promise라 await로 city를 꺼낸다.
  활용: 모바일 앱이나 다른 페이지가 부르는 상세 API에 쓴다.
*/

// ~/next-lab/app/p3-04/practice1/[city]/route.js
// 주소의 city로 오늘 날씨를 찾는다. 없으면 404.
const weather = {
  seoul: { temperature: 23, sky: '맑음' },
  busan: { temperature: 25, sky: '흐림' },
  gwangju: { temperature: 24, sky: '비' },
};

export async function GET(request, { params }) {
  // params는 Promise. [city] 칸의 도시 이름을 꺼낸다.
  const { city } = await params;
  const today = weather[city];

  if (today === undefined) {
    // 표에 없는 도시는 404와 메시지를 보낸다.
    return Response.json(
      { message: `${city} 날씨는 아직 몰라요` },
      { status: 404 },
    );
  }

  // city 이름과 기온·하늘을 한 JSON으로 합친다.
  return Response.json({ city, ...today });
}
