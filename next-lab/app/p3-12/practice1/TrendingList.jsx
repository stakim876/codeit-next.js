/*
  복습: 값이 오기 전에는 null로 로딩을 구분하기
  핵심: useState(null)은 아직 응답이 없다는 표시다. 응답 객체와 겹치지 않게 null만 로딩으로 본다.
  이유: 빈 배열도 정상적인 검색어 없음일 수 있다. 아직 못 받은 상태와 빈 결과를 같은 값으로 두면 둘을 구분할 수 없다.
  실행: trending이 null이면 불러오는 중… 이다. 객체가 오면 checkedAt과 keywords를 순서 목록으로 그린다. 실패해도 null이라 이 파일은 에러 문장을 따로 그리지 않는다.
  활용: 직접 fetch하는 위젯에서 초기값과 응답을 나눌 때 쓴다.
*/

// ~/next-lab/app/p3-12/practice1/TrendingList.jsx
// 아직 못 받았으면 null이라 불러오는 중을 보여 준다.
'use client';

import { useTrending } from './useTrending.js';

export default function TrendingList() {
  const trending = useTrending();

  if (trending === null) {
    return <p className='mt-4'>불러오는 중…</p>;
  }

  return (
    <section className='mt-4'>
      <p className='text-sm text-gray-500'>{trending.checkedAt} 기준</p>
      <ol className='mt-2 list-decimal pl-6'>
        {trending.keywords.map((keyword) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </ol>
    </section>
  );
}
