/*
  복습: 구독자가 없어진 뒤 캐시를 언제 버릴지
  핵심: 이 화면은 알림 쿼리를 쓰지 않는다. useNotifications의 gcTime이 10초라, 알림 화면을 떠난 뒤 10초가 지나면 그 캐시를 지운다.
  이유: 메모리에 모든 화면의 결과를 남겨 두면 오래 쓰는 탭이 커진다. 아무도 안 쓰는 쿼리는 유예 시간 뒤에 버린다.
  실행: 10초 안에 알림으로 돌아오면 이전 목록이 바로 보인다. staleTime 30초가 남았으면 다시 받지도 않는다. 10초가 지난 뒤 돌아오면 캐시가 없어 처음부터 1초 로딩이다.
  활용: 잠깐 떠났을 때만 유지하고, 오래 떠나면 메모리를 비우는 캐시에 쓴다.
*/

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
