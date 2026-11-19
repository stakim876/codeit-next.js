/*
  복습: 담긴 목록과 패널 열림을 한 스토어에 두기
  핵심: items, addItem과 함께 isCartOpen, openCart, closeCart가 있다. 열기 함수는 목록을 바꾸지 않고 isCartOpen만 true로 바꾼다.
  이유: 패널 열림을 컴포넌트 state로 두면 상품 목록이 그 state를 호출할 수 없다. 스토어 액션이면 버튼과 목록이 같은 함수를 부른다.
  실행: 처음 패널은 닫혀 있고 목록은 비어 있다. addItem은 새 배열을 만들어 붙인다. openCart와 closeCart는 불리언만 set한다. 새로고침하면 둘 다 초기값이다.
  활용: 서랍 열림과 그 안의 데이터를 한곳에서 관리할 때 쓴다.
*/

// ~/next-lab/app/p3-18/practice2/useCartStore.js
// 장바구니 목록과 패널 열림 상태. 버튼, 목록, 패널이 이 값을 같이 쓴다.
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  // 상품을 기존 목록 뒤에 붙여 새 배열로 바꾼다.
  addItem: (product) => set((state) => ({ items: [...state.items, product] })),

  isCartOpen: false, // 패널은 처음에 닫혀 있다.
  openCart: () => set({ isCartOpen: true }), // 패널을 연다.
  closeCart: () => set({ isCartOpen: false }), // 패널을 닫는다.
}));