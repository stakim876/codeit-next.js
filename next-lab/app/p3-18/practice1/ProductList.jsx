// ~/next-lab/app/p3-18/practice1/ProductList.jsx
// 상품 세 개를 보여 준다. 버튼을 누르면 그 상품을 장바구니에 넣는다.
// 스토어의 담기 함수를 쓰므로 클라이언트 컴포넌트여야 한다.
'use client';

import { useCartStore } from './useCartStore.js';

// 화면에 그릴 상품. 서버에서 받지 않고 이 목록을 그대로 쓴다.
const products = [
  { id: 1, name: '캠버스 토트백' },
  { id: 2, name: '도자기 머그컵' },
  { id: 3, name: '필름 카메라 스트랩' },  
];

export default function ProductList() {
  // 담기 함수만 구독한다. 장바구니 개수가 바뀌어도 이 목록은 다시 그리지 않는다.
  const addItem = useCartStore((state) => state.addItem);
  console.log('[render] ProductList');
  
  return (
    <ul className='mt-4 space-y-2'>
      {products.map((product) => (
        <li 
          key={product.id}
          className='flex items-center gap-2'>
          {product.name}
          <button 
            type='button'
            className='rounded border px-2'
            onClick={() => addItem(product)}>
            닫기    
            </button>
          </li>
      ))}   
    </ul>
  );
}