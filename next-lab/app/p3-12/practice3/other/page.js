/*
  복습: 쿼리를 아무도 구독하지 않는 화면
  핵심: 이 페이지는 response-count를 읽지 않는다. 횟수 컴포넌트는 언마운트되지만 QueryClient 안의 캐시는 기본 gcTime 동안 남는다.
  이유: 비교용 화면이 같은 키를 구독하면 캐시가 지워지는 조건을 만들 수 없다. 구독자가 0인 상태를 만들려고 빈 화면을 둔다.
  실행: 돌아가기 링크가 /p3-12/practice3 다. 곧 돌아가면 이전 count가 바로 보이고 isFetching만 다시 켜진다.
  활용: 캐시 수명을 시험하는 경유 페이지, 설정처럼 데이터를 안 쓰는 옆 화면에 쓴다.
*/

// ~/next-lab/app/p3-12/practice3/other/page.js
// /p3-12/practice3/other. 횟수 화면을 떠났다가 돌아올 때 캐시가 남는지 본다.
import Link from 'next/link';

export default function OtherPage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>다른 화면</h2>
      <Link
        href='/p3-12/practice3'
        className='mt-4 inline-block underline'>
        돌아가기
      </Link>
    </main>
  );
}
