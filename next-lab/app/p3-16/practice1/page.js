/*
  복습: 공지 목록 페이지는 무한 스크롤 컴포넌트만 둔다
  핵심: 다음 페이지를 이어 받는 상태는 클라이언트 훅이 가진다. 서버 페이지는 제목과 NoticeList만 배치한다.
  이유: 커서는 버튼을 누를 때마다 바뀐다. 그 누적 페이지는 브라우저 쿼리 캐시에 쌓인다.
  실행: /p3-16/practice1 에서 NoticeList가 첫 페이지를 받고, 더 보기가 다음 커서를 요청한다.
  활용: 제목은 서버, 이어 받기 목록은 클라이언트로 나누는 화면에 쓴다.
*/

// ~/next-lab/app/p3-16/practice1/page.js
import NoticeList from './NoticeList.jsx';

export default function NoticePage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>공지사항</h2>
      <NoticeList />
    </main>
  );
}
