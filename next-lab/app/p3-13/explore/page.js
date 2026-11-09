// ~/next-lab/app/p3-13/explore/page.js
// 알림 화면을 나갔다 와도 캐시는 QueryProvider에 남는다. gcTime이 지나면 버리고 처음부터 받는다.
import Link from 'next/link';

export default function ExplorePage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>둘러보기</h2>
      <Link
        href='/p3-13'
        className='mt-4 inline-block underline'>
        알림으로
      </Link>
    </main>
  );
}
