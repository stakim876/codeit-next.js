/*
  복습: 담기와 패널 열기를 한 클릭에 이어서 호출하기
  핵심: addItem과 openCart를 따로 구독하고, addAndOpen에서 순서대로 부른다. 목록이 그리는 배열은 p3-17의 products다. 바로 아래 profucts 배열은 어디에서도 읽지 않는다.
  이유: 담기만 하면 사용자가 서랍을 따로 열어야 방금 넣은 상품을 본다. 액션을 이으면 개수와 패널이 한 번에 반응한다. 파일 안의 세 개 배열을 쓰지 않으므로 화면 이름은 p3-17 데이터 이름이다.
  실행: 보이는 버튼 글자는 닫기지만 클릭은 addAndOpen이다. 토트백, 머그컵, 스트랩이 wishCount가 있는 객체 그대로 담긴다. 패널은 name만 표시한다. 개수 변화는 length를 구독하는 CartButton만 다시 그리고, 이 목록은 함수 참조가 그대로라 다시 그리지 않는다.
  활용: 담기 성공 즉시 서랍을 여는 상품 목록에 쓴다.
*/

// ~/next-lab/app/p3-18/practice2/ProductList.jsx
// 상품 목록을 보여 준다. 버튼을 누르면 그 상품을 담고 장바구니 패널을 연다.
// 담기 함수와 열기 함수를 쓰므로 클라이언트 컴포넌트여야 한다.
'use client';

// p3-17에 적어 둔 상품 목록.
import { products } from '@/app/p3-17/practice1/_data/products';
import { useCartStore } from './useCartStore';

// 이 파일에 적어 둔 상품 세 개.
const profucts = [
  { id: 1, name: '캔버스 토트백' },
  { id: 2, name: '도자기 머그컵' },
  { id: 3, name: '필름 카메라 스트랩' },
];

export default function ProductList() {
  // 담기 함수와 패널을 여는 함수. 개수가 바뀌어도 이 목록은 다시 그리지 않는다.
  const addItem = useCartStore((state) => state.addItem);

  const openCart = useCartStore((state) => state.openCart);

  // 담으면 장바구니를 열어 방금 담은 것을 보여 준다.
  const addAndOpen = (product) => {
    addItem(product);
    openCart();
  };

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
            onClick={() => addAndOpen(product)}>
            닫기  
            </button>  
          </li>
      ))}
    </ul>
  );
}