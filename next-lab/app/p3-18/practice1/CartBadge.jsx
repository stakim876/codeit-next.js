/*
  복습: 배열 전체가 아니라 길이만 구독하기
  핵심: useCartStore에 고르는 함수를 넘기면 그 반환값이 바뀔 때만 이 컴포넌트가 다시 그려진다. items.length는 개수다.
  이유: 스토어 전체를 읽으면 무관한 필드가 바뀌어도 배지가 다시 그려진다. 개수만 고르면 담아서 길이가 변할 때만 렌더된다.
  실행: 처음엔 장바구니 0개다. 목록에서 담으면 개수가 늘어나며 이 파일의 console.log가 실행된다. 로그 문자열은 CartBade다. 컴포넌트 이름 CartBadge와 철자가 다르다.
  활용: 헤더 배지처럼 큰 배열의 요약값만 구독할 때 쓴다.
*/

// ~/next-lab/app/p3-18/practice1/CartBadge.jsx
// 장바구니에 담긴 개수를 보여 준다.
// 스토어의 개수를 읽으므로 클라이언트 컴포넌트여야 한다.
'use client';

import { useCartStore } from './useCartStore.js';

export default function CartBadge() {
  // items 전체가 아니라 개수만 구독한다. 개수가 바뀔 때만 다시 그린다.
  const count = useCartStore((state) => state.items.length);
  console.log('[render] CartBade');
  
  return (
    <p className='rounded bg-black px-3 py-1 text-white'>장바구니 {count}개</p>
  );
}