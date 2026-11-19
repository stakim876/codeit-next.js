/*
  복습: 폼과 목록이 같은 방명록 키를 쓰게 배치하기
  핵심: 페이지는 폼과 목록을 위아래로 둔다. 둘의 연결은 props가 아니라 guestbook이라는 queryKey다.
  이유: 부모가 목록 state를 들면 페이지도 클라이언트가 된다. 각자 훅을 쓰고 키만 같으면 서버 페이지가 배치를 유지한다.
  실행: /p3-13/practice1 에서 폼이 POST에 성공하면 그 키를 무효화하고, 목록의 useQuery가 다시 GET해 새 글을 그린다.
  활용: 입력과 목록이 형제인 댓글, 방명록 화면에 쓴다.
*/

// ~/next-lab/app/p3-13/practice1/page.js
// 폼이 글을 추가하고, 목록은 그 결과를 같은 guestbook 쿼리로 보여 준다.
import GuestbookForm from './GuestbookForm.jsx';
import GuestbookList from './GuestbookList.jsx';

export default function GuestbookPage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>방명록</h2>
      <GuestbookForm />
      <GuestbookList />
    </main>
  );
}
