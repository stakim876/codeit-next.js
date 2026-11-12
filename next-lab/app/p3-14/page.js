// ~/next-lab/app/p3-14/page.js
// 메모. 배지와 목록이 useNotifications를 각자 호출하지만 키는 하나다.
// 모두 읽음은 그 캐시를 직접 안 읽고, 성공하면 그 키를 무효화해서 둘을 다시 받게 한다.
import Link from "next/link";
import NotificationBadge from "./_components/NotificationBadge.jsx";
import NotificationPanel from "./_components/NotificationPanel.jsx";
import ReadAllButton from "./_components/ReadAllButton.jsx";

export default function NotificationPage() {
  return (
    <main className="p-6">
      <header className="border-b pb-4">
        <h2 className="text-xl font-semibold">알림</h2>
        <NotificationBadge />
        <ReadAllButton />
        <Link href="/p3-14/explore" className="underline">
          둘러보기
        </Link>
      </header>
      <NotificationPanel />
    </main>
  );
}
