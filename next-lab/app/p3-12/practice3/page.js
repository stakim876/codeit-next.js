/*
  복습: 다른 화면을 갔다 오면 캐시가 먼저 보이는지 확인하기
  핵심: ResponseCount가 response-count 키로 횟수를 받는다. 옆 링크는 그 컴포넌트가 언마운트되는 /other 로 보낸다.
  이유: 화면에 머무를 때만 값이 남는지, provider 캐시 때문에 떠났다가 돌아와도 이전 숫자가 바로 보이는지 구분해야 한다.
  실행: /p3-12/practice3 에서 횟수를 받은 뒤 다른 화면으로 갔다가 돌아오면, 쿼리 기본값상 캐시가 남아 숫자가 먼저 보이고 뒤에서 다시 받는다.
  활용: 상세로 들어갔다 목록으로 돌아와도 이전 페이지를 바로 보여줄 때 쓴다.
*/

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
