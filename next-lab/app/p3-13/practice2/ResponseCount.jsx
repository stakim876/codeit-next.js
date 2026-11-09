// ~/next-lab/app/p3-13/practice2/ResponseCount.jsx
// staleTime 10초 안에는 다른 화면에 갔다 와도 캐시 숫자를 바로 보여주고 다시 받지 않는다.
'use client';

import { useQuery } from '@tanstack/react-query';

async function getCount() {
  const response = await fetch('/p3-13/practice2/api');

  if (!response.ok) {
    throw new Error(`응답 횟수를 불러오지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function ResponseCount() {
  // isPending은 처음 받기 전. isFetching은 이미 있는 숫자를 보여 주면서 다시 받는 중이다.
  const { data, isPending, isFetching } = useQuery({
    queryKey: ['response-count'],
    queryFn: getCount,
    staleTime: 10 * 1000
  });

  if (isPending) {
    return <p className='mt-4'>불러오는 중…</p>;
  }

  return (
    <p className='mt-4'>
      서버가 응답한 횟수 {data.count}번{isFetching && ' · 새로 확인하는 중'}
    </p>
  );
}
