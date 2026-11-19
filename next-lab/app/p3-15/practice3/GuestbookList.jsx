/*
  복습: 서버 글과 아직 응답 전인 글을 색으로 나누기
  핵심: data가 있으면 에러가 있어도 목록을 그린다. data가 undefined일 때만 에러 문장이다. pending이 true인 항목만 회색이다.
  이유: 낙관적 줄은 서버에 아직 없다. 색으로 구분하지 않으면 확정된 글과 롤백될 글이 같아 보인다. 첫 로딩 실패는 그릴 배열이 없으므로 문구만 보여 준다.
  실행: guestbook 키로 GET한다. 폼이 setQueryData로 붙인 줄은 회색이고, invalidate 뒤 서버 배열에는 pending이 없어 검은 글이 된다.
  활용: 전송 중인 메시지와 저장된 메시지를 한 목록에서 구분할 때 쓴다.
*/

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