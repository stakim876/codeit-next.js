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
