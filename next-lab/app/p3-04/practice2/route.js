/*
  복습: 주소 뒤의 물음표 값으로 목록을 거르기
  핵심: request.nextUrl.searchParams는 ?maxPrice=4500 의 maxPrice를 읽는다. GET 함수 이름이 HTTP 메서드다.
  이유: 가격 조건을 경로에 넣으면 주소 종류가 늘어난다. 같은 메뉴 주소에 검색 조건만 붙이면 필터가 없어도 전체가 된다.
  실행: 값이 없으면 get이 null이고 Number(null)은 0이다. !0 이 참이라 메뉴 전체를 돌려준다. 글자나 0도 같은 분기로 전체다. 4500이면 4500 이하인 americano와 latte만 남고, 3999면 빈 배열이다.
  활용: 최저 가격, 검색어, 정렬처럼 있어도 되고 없어도 되는 조건에 쓴다.
*/

// ~/next-lab/app/p3-04/practice2/route.js
// maxPrice가 없으면 전체 메뉴, 있으면 그 가격 이하만 돌려준다.
const menu = [
  { name: 'americano', price: 4000 },
  { name: 'latte', price: 4500 },
  { name: 'grapefruit', price: 5000 },
];

export function GET(request) {
  // 주소 뒤 ?maxPrice= 를 숫자로 바꾼다. 없으면 0이 된다.
  const maxPrice = Number(request.nextUrl.searchParams.get('maxPrice'));

  if (!maxPrice) {
    return Response.json(menu); // 가격 조건이 없으면 메뉴 전체
  }

  // 그 가격 이하인 음료만 남긴다.
  const cheap = menu.filter((drink) => drink.price <= maxPrice);

  return Response.json(cheap);
}
