/*
  복습: 담으면 열리는 패널까지 같은 스토어로 연결하기
  핵심: 페이지는 CartButton, ProductList, CartPenel을 배치만 한다. 개수, 열림, 담긴 목록은 useCartStore에 있다. import 이름 CartPenel은 기본 export를 받는 지역 이름이라 파일 안 함수 이름과 달라도 연결된다.
  이유: 패널 열림을 버튼 state로 두면 목록의 담기 버튼이 그 state를 열 수 없다. 스토어에 isCartOpen을 두면 버튼과 목록 둘 다 openCart를 부른다.
  실행: /p3-18/practice2 에서 제목 옆 버튼을 누르면 오른쪽 패널이 열린다. 상품 버튼도 담은 뒤 패널을 연다. 이 페이지는 practice2/QueryProvider를 쓰지 않는다. 앱 루트 QueryProvider와 별개로, 장바구니는 zustand라 쿼리 클라이언트가 필요 없다.
  활용: 헤더 버튼과 본문 액션이 같은 서랍을 열게 할 때 쓴다.
*/

// ~/next-lab/app/p3-18/practice2/page.js
// 상품 제목, 장바구니 버튼, 상품 목록, 장바구니 패널을 한 화면에 그린다.
// 개수, 담기, 패널은 CartButton, ProductList, CartPenel이 맡으므로 이 파일은 서버 컴포넌트다.
import CartButton from './CartButton.jsx';
import CartPenel from './CartPanel.jsx';
import ProductList from './ProductList.jsx';

export default function CartPage() {
  return (
    <main className='p-6'>
      {/* 제목 옆에 장바구니 버튼을 둔다. 누르면 패널이 열린다 */}
      <div className='flex items-center gap-4'>
        <h2 className='text-xl font-semibold'>상품</h2>
        <CartButton />
      </div>
      {/* 버튼을 누르면 상품을 담고 패널을 연다 */}
      <ProductList />
      {/* 열린 동안 오른쪽에 담긴 상품을 보여 준다 */}
      <CartPenel />  
    </main>
  );
}