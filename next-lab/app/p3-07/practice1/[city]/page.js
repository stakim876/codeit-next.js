/*
  복습: 주소 값으로 찾고, 없으면 찾지 못함으로 끝내기
  핵심: 동적 칸 city로 weather 표를 조회한다. undefined는 키가 없다는 뜻이고, 그때 notFound()는 아래 return까지 가지 않는다.
  이유: 빈 화면이나 기온 undefined를 그리면 오류인지 도시가 없는지 구분되지 않는다. 없는 데이터는 404 흐름으로 넘긴다.
  실행: seoul은 맑음 23도, busan은 흐림 25도, gwangju는 비 24도다. jeju처럼 표에 없으면 not-found.js 문장으로 바뀐다. instant는 false다.
  활용: 슬러그로 상품을 찾고, 품절이 아니라 존재하지 않으면 404를 낼 때 쓴다.
*/

// ~/next-lab/app/p3-07/practice1/[city]/page.js
// /p3-07/practice1/seoul 처럼 주소의 도시로 날씨를 찾는다.
import { notFound } from 'next/navigation';

// params를 기다리므로 즉시 이동 검사에서는 이 페이지를 뺀다.
export const instant = false;

const weather = {
  seoul: { temperature: 23, sky: '맑음' },
  busan: { temperature: 25, sky: '흐림' },
  gwangju: { temperature: 24, sky: '비' },
};

export default async function CityPage({ params }) {
  // params는 Promise. [city] 칸의 글자를 꺼낸다.
  const { city } = await params;
  const today = weather[city];

  // 목록에 없는 도시면 같은 폴더의 not-found.js를 그린다.
  if (today === undefined) {
    notFound();
  }

  return (
    <h2 className='p-6 text-xl font-semibold'>
      {city} 날씨는 {today.sky}, {today.temperature}도예요
    </h2>
  );
}
