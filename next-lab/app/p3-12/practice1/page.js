/*
  복습: 인기 검색어 화면의 자리만 잡기
  핵심: 페이지는 제목과 TrendingList를 둘 뿐이다. 10초마다 다시 받는 타이머는 클라이언트 목록 안에 있다.
  이유: 서버 컴포넌트는 setInterval을 가질 수 없다. 실시간으로 바뀌는 부분만 클라이언트로 내리면 제목은 서버 HTML로 남는다.
  실행: /p3-12/practice1 을 열면 제목 아래 TrendingList가 마운트되고, 그 훅이 첫 요청과 10초 간격 요청을 시작한다.
  활용: 정적 제목 아래 실시간 위젯만 클라이언트로 두는 화면에 쓴다.
*/

// ~/next-lab/app/p3-12/practice1/page.js
// /p3-12/practice1. 직접 타이머를 돌려 인기 검색어를 다시 받는다.
import TrendingList from './TrendingList.jsx';

export default function TrendingPage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>실시간 인기 검색어</h2>
      <TrendingList />
    </main>
  );
}
