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
