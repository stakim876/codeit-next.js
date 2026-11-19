/*
  복습: 도시 날씨 위젯을 화면에 올리기
  핵심: 페이지는 제목과 CityWeather만 둔다. 도시 상태와 재시도 규칙은 클라이언트 위젯 안에 있다.
  이유: 버튼을 누를 때마다 쿼리 키가 바뀌므로 그 state는 브라우저에 있어야 한다. 페이지 파일은 배치만 맡긴다.
  실행: /p3-14/practice1 에서 CityWeather가 seoul로 시작해 날씨를 요청한다.
  활용: 선택 상태가 있는 위젯을 서버 페이지 안에 끼워 넣을 때 쓴다.
*/

// ~/next-lab/app/p3-14/practice1/page.js
import CityWeather from "./CityWeather.jsx";

export default function WeatherPage() {
  return (
    <main className="p-6">
      <h2 className="mb-4 text-xl font-semibold">도시별 날씨</h2>
      <CityWeather />
    </main>
  );
}
