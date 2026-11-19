/*
  복습: 배지는 항상, 목록은 열었을 때만
  핵심: 페이지는 서버 컴포넌트로 헤더와 패널을 배치만 한다. 개수를 세는 배지와 목록을 여닫는 패널은 각자 클라이언트 파일이다.
  이유: 목록을 닫아도 읽지 않은 개수는 보여야 한다. 둘을 한 컴포넌트에 두면 패널을 닫을 때 개수 요청까지 사라진다.
  실행: /p3-12 에서 배지는 마운트되자마자 useNotifications를 호출한다. 패널은 버튼을 누르기 전에는 목록을 그리지 않는다. 둘러보기는 /p3-12/explore 로 나간다.
  활용: 종 아이콘은 헤더에 두고, 드롭다운만 나중에 마운트하는 알림 UI에 쓴다.
*/

// ~/next-lab/app/p3-12/page.js
// /p3-12. 읽지 않은 개수는 항상 보이고, 목록은 열었을 때만 보인다.
import Link from 'next/link';
import NotificationBadge from './_components/NotificationBadge.jsx';
import NotificationPanel from './_components/NotificationPanel.jsx';

export default function NotificationPage() {
  return (
    <main className='p-6'>
      <header className='border-b pb-4'>
        <h2 className='text-xl font-semibold'>알림</h2>
        <NotificationBadge />
        <Link
          href='/p3-12/explore'
          className='underline'>
          둘러보기
        </Link>
      </header>
      <NotificationPanel />
    </main>
  );
}
