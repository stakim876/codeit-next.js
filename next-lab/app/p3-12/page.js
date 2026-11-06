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
