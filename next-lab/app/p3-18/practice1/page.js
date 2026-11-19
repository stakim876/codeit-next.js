/*
  복습: 개수 배지와 상품 목록이 서버 페이지 안에서 스토어를 나눠 쓰기
  핵심: 페이지는 클라이언트가 아니다. CartBadge와 ProductList만 useCartStore를 구독한다. 둘 사이에 props를 넘기지 않는다.
  이유: 담기 함수와 개수를 부모 state로 내리면 페이지가 클라이언트가 되고, 개수가 바뀔 때 부모 전체가 다시 그려진다. 스토어 구독은 필요한 조각만 다시 그린다.
  실행: /p3-18/practice1 에서 배지는 0개로 시작하고, 목록의 버튼이 addItem을 부르면 배지만 개수를 다시 그린다.
  활용: 헤더 수량과 본문 담기 버튼이 부모를 거치지 않고 상태를 공유할 때 쓴다.
*/

// ~/next-lab/app/p3-18/practice1/page.js
import CartBadge from './CartBadge.jsx';
import ProductList from './ProductList.jsx';

export default function CartPage() {
  return (
    <main className='p-6'>
      <div className='flex items-center gap-4'>
        <h2 className='text-xl font-semibold'>상품</h2>
        <CartBadge />
      </div>
      <ProductList />
    </main>
  );
}
