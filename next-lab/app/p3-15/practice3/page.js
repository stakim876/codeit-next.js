/*
  복습: 글을 서버 응답 전에 목록 캐시에 먼저 넣기
  핵심: 폼과 목록은 guestbook 키를 공유한다. 폼의 onMutate가 그 배열에 pending 글을 붙이고, 목록은 pending이면 회색으로 그린다.
  이유: 1초 동안 목록이 그대로면 클릭이 먹은지 모른다. 임시 줄을 먼저 넣고, 끝나면 서버 목록으로 바꿔 임시 표시를 걷는다.
  실행: /p3-15/practice3 에서 남기기를 누르면 회색 줄이 바로 생기고, 성공하면 서버 GET의 검은 줄로 교체된다. 20자를 넘기면 회색 줄은 사라지고 서버 문구가 폼에 남는다.
  활용: 댓글을 보내는 동안 임시로 보여주고 확정 응답으로 바꾸는 목록에 쓴다.
*/

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