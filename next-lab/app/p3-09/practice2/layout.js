/*
  복습: 본문과 따로 움직이는 헤더 숫자
  핵심: 레이아웃은 자식 페이지가 바뀌어도 유지된다. WishCount만 connection()으로 요청 시점에 wishlist.length를 읽는다.
  이유: 권수를 빌드할 때 굳히면 찜을 해도 0이 남는다. 헤더 전체를 기다리면 책 목록 자리가 비므로, 숫자만 Suspense로 갈라 둔다.
  실행: 헤더는 세는 중 문구로 시작했다가 끝나면 찜한 책 N권으로 바뀐다. children은 그 아래 페이지다. 액션의 refresh() 뒤에 이 숫자가 다시 계산된다.
  활용: 장바구니 개수, 읽지 않은 메일 수처럼 본문과 생명주기가 다른 헤더에 쓴다.
*/

// ~/next-lab/app/p3-09/practice2/layout.js
import { Suspense } from 'react';
import { connection } from 'next/server';
import { wishlist } from './_data/wishlist.js';

async function WishCount() {
  await connection();

  return <p className='font-semibold'>찜한 책 {wishlist.length}권</p>;
}

export default function WishlistLayout({ children }) {
  return (
    <>
      <header className='border-b p-6'>
        <Suspense
          fallback={
            <p className='font-semibold text-gray-500'>
              찜한 책을 세는 중이에요…
            </p>
          }>
          <WishCount />
        </Suspense>
      </header>
      <section className='p-6'>{children}</section>
    </>
  );
}
