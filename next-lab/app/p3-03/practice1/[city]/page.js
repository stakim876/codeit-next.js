// ~/next-lab/app/p3-03/practice1/[city]/page.js
// /p3-03/practice1/seoul 처럼 주소의 도시 이름을 화면에 넣는다.
// params를 기다리므로 즉시 이동 검사에서는 이 페이지를 뺀다.
export const instant = false;

export default async function CityPage({ params }) {
  // params는 Promise. [city] 칸의 글자를 꺼낸다.
  const { city } = await params;
  
  return <h2 className='p-6 text-xl font-semibold'>{city} 날씨예요</h2>;
}