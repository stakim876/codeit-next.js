/*
  복습: 10초 동안은 캐시를 신선한 값으로 믿기
  핵심: staleTime이 지나기 전에는 다시 마운트해도 queryFn을 부르지 않는다. isFetching은 실제 재요청이 있을 때만 true다.
  이유: 12장의 횟수는 갔다 오면 항상 1이 더 올랐다. 그 차이는 서버가 아니라 클라이언트가 재요청을 참았는지에 있다.
  실행: 첫 방문만 불러오는 중… 이다. 10초 안에 돌아오면 같은 count이고 확인 중 문구가 없다. 10초 뒤에 돌아오면 숫자를 보여 준 채 다시 받고, 끝나면 서버가 1 올린 값으로 바뀐다.
  활용: 환율, 재고처럼 몇 초 안의 재조회를 생략할 때 쓴다.
*/

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
