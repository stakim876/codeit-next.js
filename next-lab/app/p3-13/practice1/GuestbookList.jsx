// ~/next-lab/app/p3-13/practice1/GuestbookList.jsx
// 폼과 같은 guestbook 쿼리라서, 글을 남기면 이 목록도 다시 그린다.
'use client';

import { useQuery } from '@tanstack/react-query';

async function getEntries() {
  const response = await fetch('/p3-13/practice1/api');

  if (!response.ok) {
    throw new Error(`방명록을 불러오지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function GuestbookList() {
  const { data, isPending, error } = useQuery({
    queryKey: ['guestbook'],
    queryFn: getEntries,
  });

  if (isPending) {
    return <p className='mt-4'>불러오는 중…</p>;
  }

  if (error) {
    return <p className='mt-4'>{error.message}</p>;
  }

  return (
    <ul className='mt-4 list-disc pl-6'>
      {data.map((entry) => (
        <li key={entry.id}>{entry.text}</li>
      ))}
    </ul>
  );
}
