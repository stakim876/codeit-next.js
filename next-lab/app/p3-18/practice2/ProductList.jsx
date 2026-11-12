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