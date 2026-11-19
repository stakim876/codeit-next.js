/*
  복습: 없는 데이터를 404 화면으로 바꾸기
  핵심: 같은 구간에서 notFound()가 호출되면 Next는 가장 가까운 not-found.js를 그린다. 이 파일은 그 대체 화면이다.
  이유: 없는 도시에도 날씨 문장을 보여 주면 빈 값이 정상 데이터처럼 보인다. 찾지 못했다는 화면을 데이터 페이지와 분리한다.
  실행: [city]/page.js가 표에 없는 city에서 notFound()를 호출하면 날씨 제목 대신 이 빨간 문장이 나온다. 이 파일 자체는 도시 이름을 받지 않는다.
  활용: 삭제된 글, 없는 상품 번호처럼 주소는 맞지만 데이터가 없을 때 쓴다.
*/

// ~/next-lab/app/p3-07/practice1/not-found.js
// [city] 페이지가 notFound()를 호출하면 도시 날씨 대신 이 문구가 나온다.
export default function NotFound() {
  return <p className='p-6 text-red-500'>그런 도시의 날씨는 아직 몰라요.</p>;
}
