/*
  복습: 서버가 찜 여부를 계산해 버튼에 넘기기
  핵심: BookList는 서버에서 wishlist.includes로 각 책의 wished를 정한 뒤, 클라이언트 버튼에는 그 결과만 넘긴다.
  이유: 버튼이 목록 전체를 알 필요는 없다. 서버가 요청 시점의 참/거짓을 넘기면 클라이언트 묶음에 서버 메모리가 들어가지 않는다.
  실행: connection() 때문에 목록은 요청 뒤에 그려지고, 그 전엔 불러오는 중 문구다. 어린 왕자, 데미안, 모모 순서로 버튼이 붙는다. 처음 목록은 비어 있으므로 셋 다 찜하기다.
  활용: 목록 행마다 현재 사용자의 좋아요 여부만 내려 주는 피드에 쓴다.
*/

// ~/next-lab/app/p3-09/practice2/page.js
// /p3-09/practice2. 책 목록과 그 책이 찜되어 있는지를 보여 준다.
import { Suspense } from 'react';
import { connection } from 'next/server';
import { wishlist } from './_data/wishlist.js';
import WishButton from './_components/WishButton.jsx';

const books = [
  { id: 1, title: '어린 왕자' },
  { id: 2, title: '데미안' },
  { id: 3, title: '모모' },
];

async function BookList() {
  // 찜 목록은 요청마다 달라서, 빌드할 때 굳히지 않고 요청 뒤에 그린다.
  await connection();

  return (
    <ul className='space-y-2'>
      {books.map((book) => (
        <li
          key={book.id}
          className='flex gap-3'>
          <span>{book.title}</span>
          {/* wished는 이 책이 찜 목록에 있는지만 넘긴다. */}
          <WishButton
            id={book.id}
            wished={wishlist.includes(book.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default function WishlistPage() {
  // BookList가 끝나기 전에는 불러오는 중 문구를 보여 준다.
  return (
    <Suspense
      fallback={<p className='text-gray-500'>목록을 불러오는 중이에요…</p>}>
      <BookList />
    </Suspense>
  );
}
