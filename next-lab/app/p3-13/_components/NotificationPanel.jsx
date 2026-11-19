/*
  복습: 목록은 열 때만 마운트하기
  핵심: isOpen이 false면 NotificationList가 없다. 배지와 모두 읽음은 패널 밖에서 같은 키를 이미 구독한다.
  이유: 닫혀 있는 목록까지 트리에 두면 읽음 버튼의 mutation이 필요 없을 때도 같이 산다. 열릴 때 마운트하면 그 시점의 캐시로 바로 그린다.
  실행: 알림 보기와 알림 닫기가 isOpen을 뒤집는다. 30초 fresh 안에 다시 열면 목록 요청은 나가지 않는다.
  활용: 헤더가 이미 데이터를 구독 중일 때, 상세만 접었다 펴는 UI에 쓴다.
*/

// ~/next-lab/app/p3-12/_components/NotificationPanel.jsx
"use client";

import { useState } from "react";
import NotificationList from "./NotificationList.jsx";

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mt-4">
      <button
        type="button"
        className="rounded border px-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "알림 닫기" : "알림 보기"}
      </button>
      {isOpen && <NotificationList />}
    </section>
  );
}
