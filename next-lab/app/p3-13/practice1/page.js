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
