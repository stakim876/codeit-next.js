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