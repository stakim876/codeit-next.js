// ~/next-lab/app/p3-12/practice3/page.js
// /p3-12/practice3. 나갔다 돌아오면 받아 둔 횟수를 먼저 보여 준다.
import Link from 'next/link';
import ResponseCount from './ResponseCount.jsx';

export default function CountPage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>다시 받는 순간 세기</h2>
      <ResponseCount />
      <Link
        href='/p3-12/practice3/other'
        className='mt-4 inline-block underline'>
        다른 화면
      </Link>
    </main>
  );
}
