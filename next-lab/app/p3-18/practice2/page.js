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