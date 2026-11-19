/*
  복습: 1위와 전체 목록을 같은 데이터로 나누어 그리기
  핵심: TopKeyword와 TrendingList는 서로 값을 넘기지 않는다. 둘 다 useTrending의 queryKey trending을 본다.
  이유: 부모가 받아서 props로 내리면 페이지가 클라이언트가 되거나, 요청을 한곳에 모으는 코드가 필요하다. 같은 키는 그 연결 없이 캐시를 공유한다.
  실행: /p3-12/practice2 에서 헤더의 1위와 아래 목록이 함께 마운트된다. 첫 요청은 한 번이고, 10초마다 다시 받아 둘 다 갱신된다.
  활용: 요약 숫자와 상세 목록이 한 화면에 있는 대시보드에 쓴다.
*/

// ~/next-lab/app/p3-12/practice2/page.js
// /p3-12/practice2. 1위와 목록이 같은 검색어 데이터를 나눠 그린다.
import TopKeyword from './TopKeyword.jsx';
import TrendingList from './TrendingList.jsx';

export default function TrendingPage() {
  return (
    <main className='p-6'>
      <header className='border-b pb-4'>
        <h2 className='text-xl font-semibold'>실시간 인기 검색어</h2>
        <TopKeyword />
      </header>
      <TrendingList />
    </main>
  );
}
