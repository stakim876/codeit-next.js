/*
  복습: 스토어가 열림이라고 할 때만 오른쪽 패널을 그리기
  핵심: isCartOpen이 false면 null이다. 참이면 어두운 배경과 목록, 닫기 버튼을 그린다. 배경과 닫기는 둘 다 closeCart다.
  이유: 닫힌 패널을 화면 밖에 숨기기만 하면 목록 구독과 포커스가 남는다. null이면 열리기 전에는 그리지 않는다.
  실행: 버튼이나 상품의 openCart 뒤에 패널이 보인다. 같은 상품을 두 번 담으면 id가 같아 key를 index로 구분한다. 항목 순서가 바뀌거나 가운데가 삭제되면 index key는 다른 행과 엇갈릴 수 있다. 함수 이름은 CartPenel이다.
  활용: 오버레이를 눌러 닫는 장바구니 서랍에 쓴다.
*/

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