// ~/next-lab/app/p3-13/page.js
// /p3-13. 배지는 항상 보이고, 모두 읽음은 캐시를 비운 뒤 개수를 다시 받게 한다.
import Link from 'next/link';
import NotificationBadge from './_components/NotificationBadge.jsx';
import NotificationPanel from './_components/NotificationPanel.jsx';
import ReadAllButton from './_components/ReadAllButton.jsx';

export default function NotificationPage() {
  return (
    <main className='p-6'>
      <header className='border-b pb-4'>
        <h2 className='text-xl font-semibold'>알림</h2>
        <NotificationBadge />
        <ReadAllButton />
        <Link
          href='/p3-13/explore'
          className='underline'>
          둘러보기
        </Link>
      </header>
      <NotificationPanel />
    </main>
  );
}
