/*
  복습: fresh 시간이 있는 횟수를 갔다 와 보기
  핵심: ResponseCount는 staleTime 10초인 response-count 쿼리다. 다른 화면 링크는 그 구독을 끊는다.
  이유: staleTime이 없으면 돌아오자마자 다시 받아 서버 횟수가 바로 오른다. 10초를 두면 그 안의 왕복은 서버를 호출하지 않는다.
  실행: /p3-13/practice2 에서 숫자를 본 뒤 10초 안에 다른 화면을 갔다 오면 같은 숫자가 바로 있고 새로 확인하는 중도 없다. 10초가 지난 뒤면 stale이라 다시 GET한다.
  활용: 방금 본 대시보드를 짧은 시간 안에는 다시 요청하지 않을 때 쓴다.
*/

// ~/next-lab/app/p3-13/practice2/page.js
// 다른 화면으로 나갔다 와 캐시가 얼마나 남는지 본다.
import Link from 'next/link';
import ResponseCount from './ResponseCount.jsx';

export default function CountPage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>다시 받는 순간 세기</h2>
      <ResponseCount />
      <Link
        href='/p3-13/practice2/other'
        className='mt-4 inline-block underline'>
        다른 화면
      </Link>
    </main>
  );
}
