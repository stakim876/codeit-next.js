/*
  복습: 공유 쿼리의 로딩과 실패를 목록에서 보여 주기
  핵심: isPending, error, data는 1위 컴포넌트와 같은 쿼리 상태다. 한곳이 실패하면 다른 곳의 error도 같은 실패다.
  이유: 1위는 로딩 문구만 필요하고 목록은 실패 문장까지 필요하다. 상태 객체는 같고 그리는 가지만 다르다.
  실행: 처음에는 불러오는 중…, queryFn이 throw하면 그 메시지, 성공하면 기준 시각과 순서 목록이다. refetchInterval이 있는 훅이라 10초마다 이 목록도 바뀐다.
  활용: 같은 쿼리를 구독하는 두 번째 화면이 실패와 목록을 담당할 때 쓴다.
*/

// ~/next-lab/app/p3-12/practice2/TrendingList.jsx
// 검색어 목록. 1위와 같은 쿼리라, 처음 받기 전에는 둘 다 불러오는 중이다.
'use client';

import { useTrending } from './useTrending.js';

export default function TrendingList() {
  const { data, isPending, error } = useTrending();

  if (isPending) {
    return <p className='mt-4'>불러오는 중…</p>;
  }

  if (error) {
    return <p className='mt-4'>{error.message}</p>;
  }

  return (
    <section className='mt-4'>
      <p className='text-sm text-gray-500'>{data.checkedAt} 기준</p>
      <ol className='mt-2 list-decimal pl-6'>
        {data.keywords.map((keyword) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </ol>
    </section>
  );
}
