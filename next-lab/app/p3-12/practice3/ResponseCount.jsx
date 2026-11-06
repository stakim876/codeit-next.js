// ~/next-lab/app/p3-12/practice3/ResponseCount.jsx
// 응답 횟수. 다른 화면을 갔다 오면 캐시가 있어 바로 숫자가 나오고, 뒤에서 다시 받는다.
'use client';

import { useQuery } from '@tanstack/react-query';

async function getCount() {
  const response = await fetch('/p3-12/practice3/api');

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
