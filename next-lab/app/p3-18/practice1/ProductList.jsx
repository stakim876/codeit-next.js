/*
  복습: 담기 함수만 구독해 개수가 바뀌어도 목록은 다시 그리지 않기
  핵심: selector가 addItem 함수만 반환한다. zustand의 addItem 참조는 그대로라, items.length가 바뀌어도 이 컴포넌트는 구독 값이 같아 다시 그리지 않는다.
  이유: 목록이 items 전체를 구독하면 담을 때마다 상품 세 개가 다시 그려진다. 담기 동작만 필요하면 함수만 고른다.
  실행: 마운트 때 [render] ProductList가 한 번 찍힌다. 버튼 글자는 닫기지만 onClick은 addItem(product)라 클릭하면 장바구니에는 들어간다. 콘솔에 이 로그가 다시 찍히지 않고 배지만 늘어나면 구독이 갈라진 것이다. 상품 이름은 이 파일 배열이며 1번이 캠버스 토트백으로 적혀 있다.
  활용: 버튼을 누르는 쪽은 액션만, 숫자를 보여주는 쪽은 결과만 구독할 때 쓴다.
*/

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