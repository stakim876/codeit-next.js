/*
  복습: 주소 한 칸을 화면 문장에 넣기
  핵심: 폴더 이름 [city]는 그 자리의 글자를 city라는 이름으로 넘긴다. params는 Promise라 await 후에 값이 있다.
  이유: 도시마다 page.js를 만들면 도시가 늘 때마다 파일이 늘고, 없는 도시 주소는 404가 된다. 한 파일이 칸의 값을 읽으면 같은 화면 틀로 여러 도시를 그린다.
  실행: /p3-03/practice1/seoul 이면 city는 seoul이고 제목은 seoul 날씨예요다. 데이터 조회는 없어서 표에 없는 도시도 그 단어를 그대로 보여 준다. instant는 false다. params를 기다리므로 즉시 이동 검사에서는 이 페이지를 뺀다.
  활용: 상품 번호, 사용자 이름처럼 주소 일부가 내용이 되는 상세 화면에 쓴다.
*/

// ~/next-lab/app/p3-03/practice1/[city]/page.js
// /p3-03/practice1/seoul 처럼 주소의 도시 이름을 화면에 넣는다.
// params를 기다리므로 즉시 이동 검사에서는 이 페이지를 뺀다.
export const instant = false;

export default async function CityPage({ params }) {
  // params는 Promise. [city] 칸의 글자를 꺼낸다.
  const { city } = await params;
  
  return <h2 className='p-6 text-xl font-semibold'>{city} 날씨예요</h2>;
}