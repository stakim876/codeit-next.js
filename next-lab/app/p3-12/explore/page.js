// ~/next-lab/app/p3-12/explore/page.js
// /p3-12/explore. 알림 화면을 나갔다 와도 받아 둔 알림은 QueryProvider에 남는다.
import Link from 'next/link';

export default function ExplorePage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>둘러보기</h2>
      <Link
        href='/p3-12'
        className='mt-4 inline-block underline'>
        알림으로
      </Link>
    </main>
  );
}
