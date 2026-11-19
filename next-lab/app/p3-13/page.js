/*
  복습: 읽음 처리 버튼을 배지 옆에 두기
  핵심: 배지, 모두 읽음 버튼, 패널이 같은 notifications 키를 본다. 버튼은 캐시를 직접 고치지 않고, 성공 뒤에 그 키를 무효화한다.
  이유: 배지만 숫자를 0으로 바꾸면 목록의 isRead는 옛 값이다. 서버가 바뀐 뒤 같은 키를 다시 받아야 둘이 맞는다.
  실행: /p3-13 헤더에 개수와 모두 읽음이 항상 있다. 목록은 알림 보기를 눌러야 마운트된다. 둘러보기는 캐시를 남긴 채 /explore 로 나간다.
  활용: 모두 읽음이 헤더에 있고 목록은 접혀 있는 알림 화면에 쓴다.
*/

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
