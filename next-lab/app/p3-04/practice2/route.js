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
