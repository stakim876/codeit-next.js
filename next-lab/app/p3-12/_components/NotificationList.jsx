/*
  복습: 같은 캐시로 목록을 그리고 실패를 따로 보여 주기
  핵심: 배지와 같은 useNotifications라서 캐시가 있으면 isPending은 바로 false다. error는 queryFn이 throw한 뒤에 채워진다.
  이유: 목록은 글 전체가 필요해서 개수만 있는 배지와 그리는 정보가 다르다. 받는 경로는 하나이고 그리는 방식만 갈린다.
  실행: 캐시가 없으면 불러오는 중…, 실패하면 error.message, 성공하면 isRead인 항목만 회색이다. 패널이 닫혀 언마운트되어도 캐시는 provider에 남는다.
  활용: 미리보기 숫자와 상세 목록이 한 응답을 나눠 쓰는 화면에 쓴다.
*/

// ~/next-lab/app/p3-12/_components/NotificationList.jsx
// 알림 글 목록. 배지와 같은 useNotifications라 이미 받은 목록을 다시 쓴다.
'use client';

import { useNotifications } from './useNotifications.js';

export default function NotificationList() {
  const { data, isPending, error } = useNotifications();

  if (isPending) {
    return <p className='mt-4'>불러오는 중…</p>;
  }

  if (error) {
    return <p className='mt-4'>{error.message}</p>;
  }

  return (
    <ul className='mt-4 space-y-2'>
      {data.map((item) => (
        <li
          key={item.id}
          className={item.isRead ? 'text-gray-400' : ''}>
          {item.text}
        </li>
      ))}
    </ul>
  );
}
