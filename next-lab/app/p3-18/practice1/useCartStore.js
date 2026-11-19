/*
  복습: 컴포넌트 밖에서 장바구니 배열을 보관하기
  핵심: create가 만든 훅은 컴포넌트 트리 밖에 상태를 둔다. addItem은 이전 items를 펼쳐 새 배열을 만들고 그 뒤에 상품을 붙인다. set에 새 객체를 넘겨야 구독자가 변화를 본다.
  이유: 주석으로 꺼 둔 push 버전은 같은 배열을 고친 뒤 그 배열을 그대로 돌려준다. 참조가 같으면 길이만 구독하는 배지가 바뀐 것을 놓칠 수 있다. 새 배열은 참조가 달라 개수 변경이 전달된다.
  실행: 처음 items는 빈 배열이다. 같은 상품을 두 번 담으면 두 칸이 된다. 새로고침하면 메모리 스토어가 사라져 0개다.
  활용: 페이지를 옮겨도 유지할 장바구니, 전역 토글처럼 서버 캐시와 별개인 화면 상태에 쓴다.
*/

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

