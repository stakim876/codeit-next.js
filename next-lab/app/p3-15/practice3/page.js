// ~/next-lab/app/p3-14/practice2/page.js
import GuestbookForm from "./GuestbookForm.jsx";
import GuestbookList from "./GuestbookList.jsx";

export default function GuestbookPage() {
  return (
    <main className="p-6">
      <h2 className="text-xl font-semibold">방명록</h2>
      {/* 둘 다 같은 ['guestbook'] 캐시 */}
      <GuestbookForm /> {/* 응답 전에 목록에 먼저 넣고, 끝나면 비움 */}
      <GuestbookList /> {/* 그 캐시를 그림. 응답 전 글은 회색 */}
    </main>
  );  
}