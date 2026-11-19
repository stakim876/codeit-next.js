/*
  복습: 상품과 찜 관계를 표로 나누기
  핵심: products의 wishCount는 찜한 사람 수의 요약이다. wishes의 한 줄은 상품 id와 사용자 id의 쌍이라 누가 찜했는지를 남긴다.
  이유: 상품 객체에 userId 배열을 넣어도 되지만, 쌍을 따로 두면 같은 상품을 여러 사람이 찜한 경우를 행으로 추가한다. 지금 데이터는 상품마다 한 명이다.
  실행: 토트백은 사용자 2, 필름 카메라 스트랩은 사용자 1이 찜했다. 머그컵은 wishes에 없어 누구의 조회에서도 wished가 false다. wishCount와 wishes 행 수가 상품마다 같지는 않다. 토트백은 개수 12, 기록된 쌍은 1줄이다.
  활용: 게시물과 좋아요를 다른 표로 두고 조회 때 조인할 때 쓴다.
*/

// ~/next-lab/app/p3-17/practice1/_data/products.js
export const products = [
  { id: 1, name: '캔버스 토트백', wishCount: 12 },
  { id: 2, name: '도자기 머그컵', wishCount: 5 },
  { id: 3, name: '필름 카메라 스트랩', wishCount: 30 },
];

// 「누가 어느 상품을 찜했는가」 한 쌍이 한 줄이다.
export const wishes = [
  { productId: 1, userId: 2 },
  { productId: 3, userId: 1 },
];
