/*
  복습: 배지와 목록이 키 하나로 연결되고, 모두 읽음은 그 키를 비운다
  핵심: 배지는 select로 개수만 받고 목록은 배열을 받는다. queryKey가 둘 다 notifications라 요청은 하나다. ReadAllButton은 캐시를 직접 읽지 않는다.
  이유: 개수 계산을 배지마다 복사하지 않고 select에 두면, 캐시 원본은 배열로 남아 목록이 같이 쓴다. 모두 읽음은 성공한 뒤에만 그 키를 무효화해야 실패 때 목록이 그대로다.
  실행: /p3-14 에서 배지는 마운트되자마자 쿼리를 구독한다. 목록은 알림 보기를 눌러야 마운트되지만 같은 캐시를 본다. 모두 읽음은 이 실습 서버가 500을 주므로 성공 무효화까지 가지 않는다.
  활용: 요약과 상세가 한 캐시를 쓰고, 변경 버튼은 성공 후에만 그 캐시를 버리는 화면에 쓴다.
*/

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
