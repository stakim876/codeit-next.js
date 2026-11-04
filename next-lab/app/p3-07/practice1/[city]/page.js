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
