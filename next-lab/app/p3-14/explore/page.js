/*
  복습: 알림 쿼리를 구독하지 않는 옆 화면
  핵심: 이 페이지는 notifications 키를 읽지 않는다. 알림 페이지를 떠나면 그 구독이 줄고, 캐시가 남을지는 staleTime과 gcTime에 따른다.
  이유: 에러 화면과 정상 화면을 오가며 캐시가 남는지 보려면, 데이터를 안 쓰는 주소가 하나 있어야 한다.
  실행: 알림으로 링크가 /p3-14 다. 캐시가 아직 있으면 배지는 이전 개수를 바로 그린다.
  활용: 캐시 수명을 확인하려고 두는 빈 이동 화면에 쓴다.
*/

// ~/next-lab/app/p3-14/explore/page.js
import Link from "next/link";

export default function ExplorePage() {
  return (
    <main className="p-6">
      <h2 className="text-xl font-semibold">둘러보기</h2>
      <Link href="/p3-14" className="mt-4 inline-block underline">
        알림으로
      </Link>
    </main>
  );
}
