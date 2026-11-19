/*
  복습: 목록 트리는 열렸을 때만 만들기
  핵심: isOpen이 false면 NotificationList를 렌더하지 않는다. 배지는 패널 밖에서 이미 같은 키를 구독한다.
  이유: 닫힌 목록의 읽음 버튼까지 마운트할 필요가 없다. 열 때 마운트하면 그때의 캐시 배열로 바로 그린다.
  실행: 버튼이 isOpen을 뒤집고, 참일 때만 목록이 아래에 붙는다.
  활용: 헤더가 데이터를 이미 구독할 때 상세만 접는 UI에 쓴다.
*/

// ~/next-lab/app/p3-12/_components/NotificationPanel.jsx
"use client";

import { useState } from 'react';
import NotificationList from './NotificationList.jsx';

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className='mt-4'>
       <button
         type='button'
         className='rounded border px-2'
         onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '알림 닫기' : '알림 보기'}
         </button>
          {isOpen && <NotificationList />}
    </section>
  );
}