/*
  복습: 처음 로딩과 다시 받기를 문구로 나누기
  핵심: staleTime을 주지 않으면 받은 직후부터 stale이다. 컴포넌트가 다시 마운트되면 캐시를 바로 그리면서 백그라운드로 다시 받는다. isPending은 캐시가 없을 때만 true다.
  이유: 다시 받는 1초 동안 숫자를 숨기면 갔다 올 때마다 불러오는 중만 보인다. 캐시가 있으면 숫자를 유지해야 차이가 드러난다.
  실행: 첫 방문은 불러오는 중… 이다. 이후엔 서버가 응답한 횟수 N번이고, 재요청 중에는 새로 확인하는 중이 붙는다. 재요청이 끝나면 서버가 올린 새 count로 바뀐다.
  활용: 새로고침 없이 최신 값을 맞추되, 기다리는 동안 마지막 값을 보여주는 카운터에 쓴다.
*/

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
