/*
  복습: 폼이 무효화한 키를 목록이 다시 그리기
  핵심: queryKey guestbook이 폼의 invalidateQueries와 같다. 무효화되면 이 useQuery가 getEntries를 다시 실행한다.
  이유: 폼이 응답 한 건만 목록 끝에 붙이면, 다른 탭에서 생긴 글이나 서버가 매긴 id를 놓친다. 목록 GET이 기준이 된다.
  실행: 처음엔 불러오는 중…, 실패하면 error.message, 성공하면 id를 key로 한 문장 목록이다. POST가 끝나 무효화되면 새 배열로 다시 그린다.
  활용: 작성 폼과 분리된 댓글 목록이 서버를 다시 읽어 맞춰질 때 쓴다.
*/

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
