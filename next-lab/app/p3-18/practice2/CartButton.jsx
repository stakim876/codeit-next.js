// ~/next-lab/app/p3-18/practice2/CartButton.jsx
// 장바구니 개수를 보여 주고, 누르면 장바구니 패널을 연다.
// 개수와 열기 함수를 읽으므로 클라이언트 컴포넌트여야 한다.
'use client';

import { useCartStore } from './useCartStore';

export default function CartButton() {
  // 개수만 구독한다. 개수가 바뀔 때만 다시 그린다.
  const count = useCartStore((state) => state.items.length);
  // 패널을 여는 함수. isCartOpen을 true로 바꾼다.
  const openCart = useCartStore((state) => state.openCart);
  
  return (
    <button 
      type='button'
      className='rounded bg-black px-3 py-1 text-white'
      onClick={openCart}>
      장바구니 {count}개  
    </button>
  );
}