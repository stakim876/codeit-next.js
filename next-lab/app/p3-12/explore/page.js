/*
  복습: 화면을 떠나도 쿼리 캐시가 남는지 확인하기
  핵심: 이 페이지는 알림을 요청하지 않는다. 루트 QueryProvider가 브라우저에 클라이언트를 하나만 두므로, 알림 화면으로 돌아가도 같은 저장소를 만난다.
  이유: 캐시가 페이지 state라면 이동하는 순간 사라진다. 바깥 provider에 두면 컴포넌트가 언마운트되어도 데이터가 남는다.
  실행: 알림으로 링크는 /p3-12 다. 이미 받아 둔 목록이 있으면 배지는 1초를 다시 기다리지 않고 개수부터 그린다.
  활용: 설정 화면을 갔다가 피드로 돌아와도 이미 받은 글을 유지할 때 쓴다.
*/

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
