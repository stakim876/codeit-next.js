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