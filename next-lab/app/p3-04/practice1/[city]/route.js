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
