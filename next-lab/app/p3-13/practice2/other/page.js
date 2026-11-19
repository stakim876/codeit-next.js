/*
  복습: 구독자가 0이 되는 경유 화면
  핵심: 이 페이지는 횟수 쿼리를 쓰지 않아 ResponseCount가 언마운트된다. 캐시가 남는지는 staleTime과 gcTime, 떠난 시간에 달렸다.
  이유: 같은 키를 이 화면도 구독하면 컴포넌트를 치워도 쿼리가 살아 있다. 아무도 안 쓰는 상태를 만들어야 수명 실험이 된다.
  실행: 돌아가기는 /p3-13/practice2 다. practice2의 횟수 쿼리는 gcTime을 따로 주지 않아 기본 5분 동안 캐시 데이터는 남는다. 다만 staleTime 10초가 지나면 복귀 때 다시 GET한다.
  활용: 캐시 신선도와 보관 시간을 나눠 시험하는 빈 화면에 쓴다.
*/

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
