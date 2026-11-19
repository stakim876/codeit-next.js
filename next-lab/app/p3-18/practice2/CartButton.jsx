/*
  복습: 개수와 열기 함수를 한 버튼에서 구독하기
  핵심: length와 openCart를 각 selector로 읽는다. 개수가 바뀌면 버튼 문장이 다시 그려지고, openCart는 isCartOpen을 true로 둔다.
  이유: 패널 컴포넌트를 버튼 안에 넣으면 닫혀 있을 때도 목록 구독이 버튼에 묶인다. 열기만 호출하면 패널 파일이 자기 구독으로 나타난다.
  실행: 글자는 장바구니 N개다. 클릭하면 오른쪽 패널이 열린다. 상품을 담아 N이 늘면 이 버튼도 길이를 구독하므로 숫자가 바뀐다.
  활용: 아이콘 버튼이 수량을 보여 주면서 서랍을 열 때 쓴다.
*/

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