// ~/next-lab/app/p3-13/practice2/other/page.js
// 횟수 화면을 벗어나 쿼리를 아무도 안 쓰게 한다. gcTime 안에 돌아가면 캐시가 남아 있다.
import Link from 'next/link';

export default function OtherPage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>다른 화면</h2>
      <Link
        href='/p3-13/practice2'
        className='mt-4 inline-block underline'>
        돌아가기
      </Link>
    </main>
  );
}
