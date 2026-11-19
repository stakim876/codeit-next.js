/*
  복습: practice1의 개수 배지를 이 폴더에 남겨 둔 것
  핵심: items.length만 구독해 장바구니 N개를 그린다. 함수 이름은 CartBade다.
  이유: practice2 페이지는 이 파일을 import하지 않고 CartButton을 쓴다. 그래서 이 배지는 화면에 나타나지 않는다. 스토어를 구독하는 코드가 있어도 마운트되지 않으면 렌더되지 않는다.
  실행: /p3-18/practice2 를 열어도 이 컴포넌트의 문장은 없다. 페이지가 import해야 개수가 이 마크업으로 보인다.
  활용: 구독 코드와 실제 화면 포함 여부는 별개라는 점을 비교할 때 쓴다.
*/

// ~/next-lab/app/p3-18/practice2/CartBadge.jsx
// 장바구니에 담긴 개수를 보여 준다.
// 스토어의 개수를 읽으므로 클라이언트 컴포넌트여야 한다.
'use client';

import { useCartStore } from './useCartStore.js';

export default function CartBade() {
  // items 전체가 아니라 개수만 구독한다. 개수가 바뀔 때만 다시 그린다.
  const count = useCartStore((state) => state.items.length);

  return (
    <p className='rounded bg-black px-3 py-1 text-white'>장바구니 {count}개</p>
  );
}