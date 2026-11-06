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
