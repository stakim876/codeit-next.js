// ~/next-lab/app/p3-15/practice3/GuestbookList.jsx
'use client';

import { useQuery } from "@tanstack/react-query";

async function getEntries() {
  const response = await fetch('/p3-15/practice3/api'); // 방명록 목록

  if (!response.ok) {
    throw new Error(`방명록을 불러오지 못했어요 (${response.status})`); // 실패면 쿼리 에러
  }

  return response.json();
}

export default function GuestbookList() {
  const { data, isPending, error } = useQuery({
    queryKey: ['guestbook'], // 폼이 먼저 넣고, 끝나면 다시 받는 키
    queryFn: getEntries,
  });

  if (isPending) {
    return <p className='mt-4'>불러오는 중…</p>; // 아직 한 번도 못 받음
  }

  if (data === undefined) {
    return <p className='mt-4'>{error.message}</p>; // 받은 목록이 없을 때만 에러 문구
  }

  return (
    <ul className='mt-4 list-disc pl-6'>
      {data.map((entry) => (
        <li
          key={entry.id}
          className={entry.pending ? 'text-gray-400' : ''}> {/* 응답 전 글은 회색 */}
          {entry.text}
        </li>
      ))}
    </ul>
  );
}