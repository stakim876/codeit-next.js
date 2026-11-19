/*
  복습: 동적 주소 중 일부만 미리 만들어 두기
  핵심: generateStaticParams가 돌려주는 city 목록은 빌드 때 미리 HTML로 만들 주소다. 화면은 여전히 params를 읽어 도시 이름을 넣는다.
  이유: 도시가 많아도 자주 여는 세 곳만 미리 만들면 그 주소의 첫 응답이 빠르다. 나머지 주소까지 파일로 만들 필요는 없다.
  실행: seoul, busan, gwangju가 정적 인자다. 페이지는 await params로 그 글자를 제목에 넣는다. instant는 false다. params를 기다리므로 즉시 이동 검사에서 빠진다. dynamicParams를 false로 두지 않았으므로 목록 밖 도시는 요청 때 만들어질 수 있다.
  활용: 인기 상품만 미리 생성하고 나머지 상세는 첫 방문 때 만드는 페이지에 쓴다.
*/

// ~/next-lab/app/p3-06/practice2/[city]/page.js
// /p3-06/practice2/seoul 처럼 주소의 도시 이름을 화면에 넣는다.
// params를 기다리므로 즉시 이동 검사에서는 이 페이지를 뺀다.
export const instant = false;

// 빌드 때 만들 도시 주소. city가 [city] 칸이 된다.
export function generateStaticParams() {
  return [{ city: 'seoul' }, { city: 'busan' }, { city: 'gwangju' }];
}

export default async function CityPage({ params }) {
  // params는 Promise. [city] 칸의 글자를 꺼낸다.
  const { city } = await params;

  return <h2 className='p-6 text-xl font-semibold'>{city} 날씨예요</h2>;
}
