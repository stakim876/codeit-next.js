// ~/next-lab/app/p3-18/practice1/useCartStore.js
// 장바구니에 담긴 상품 목록. CartBadge와 ProductList가 이 값을 같이 쓴다.
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  // 상품을 기존 목록 뒤에 붙여 새 배열로 바꾼다.
  addItem: (product) => set((state) => ({ items: [...state.items, product] })),
  
  // 요구사항 8
  // addItem: (product) => set((state) => {
  //   state.items.push(product);
  //   return { items: state.items };
  // });  
}));

