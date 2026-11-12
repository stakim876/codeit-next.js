// ~/next-lab/app/p3-18/practice2/CartPanel.jsx
// 오른쪽에 뜨는 장바구니 패널. 담긴 상품 이름을 보여 준다.
// 열림 상태와 목록을 읽으므로 클라이언트 컴포넌트여야 한다.
'use client';

import { useCartStore } from './useCartStore.js';

export default function CartPenel() {
  // 열림 여부, 닫기 함수, 담긴 상품. 버튼의 openCart가 이 패널을 연다.
  const isOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);

  // 닫혀 있으면 아무것도 그리지 않는다.
  if (!isOpen) {
    return null;
  }

  return (
    <>
     {/* 뒤의 어두운 칸. 누르면 패널을 닫는다 */}
     <div 
       className='fixed inset-0 bg-black/30'
       onClick={closeCart}
    />
    <aside className='fixed inset-y-0 right-0 w-72 bg-white p-6 shadow-lg'>
      <h3 className='text-lg font-semibold'>장바구니</h3>
      <ul className='mt-4 space-y-1'>
        {/* 같은 상품을 두 번 담을 수 있어서 차례 번호로 구분한다. */}
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <button 
        type='button'
        className='mt-4 rounded border px-2'
        onClick={closeCart}>
        닫기
      </button>
    </aside>   
    </>
  );
}