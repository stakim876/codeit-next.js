/*
  복습: 커서 페이지를 이어서 쌓기
  핵심: useInfiniteQuery는 data.pages에 받은 페이지를 순서대로 담는다. initialPageParam null은 첫 요청에 커서가 없다는 뜻이다. getNextPageParam이 null을 돌려주면 hasNextPage가 false다.
  이유: 페이지 번호를 클라이언트가 세면 새 공지가 앞에 끼었을 때 항목이 겹치거나 빠진다. 마지막 공지 id보다 작은 것부터 달라고 하면 그 기준이 서버에 있다.
  실행: 첫 요청은 /api 이고 그다음부터는 마지막 item.id를 cursor로 붙인다. pages를 flatMap해 한 목록으로 편다. 다음이 있으면 더 보기, 받는 중이면 그 버튼이 불러오는 중…, 없으면 마지막 공지예요다. 첫 실패로 data가 없으면 error.message만 보인다.
  활용: 최신순 피드를 스크롤하며 이어서 받을 때 쓴다.
*/

// ~/next-lab/app/p3-16/practice1/NoticeList.jsx
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

async function getNoticePage({ pageParam }) {
  const address = pageParam
    ? `/p3-16/practice1/api?cursor=${pageParam}`
    : '/p3-16/practice1/api';
  const response = await fetch(address);

  if (!response.ok) {
    throw new Error(`공지를 불러오지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function NoticeList() {
  const {
    data,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['notices'],
    queryFn: getNoticePage,
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.items[lastPage.items.length - 1].id : null,

    
  });

  if (isPending) {
    return <p className='mt-4'>불러오는 중…</p>;
  }

  if (data === undefined) {
    return <p className='mt-4'>{error.message}</p>;
  }

  const notices = data.pages.flatMap((page) => page.items);

  return (
    <section className='mt-4'>
      <ul className='list-disc pl-6'>
        {notices.map((notice) => (
          <li key={notice.id}>{notice.title}</li>
        ))}
      </ul>
      {hasNextPage ? (
        <button
          type='button'
          className='mt-4 rounded border px-2'
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}>
          {isFetchingNextPage ? '불러오는 중…' : '더 보기'}
        </button>
      ) : (
        <p className='mt-4'>마지막 공지예요</p>
      )}
    </section>
  );
}
