/*
  복습: 일괄 수정 뒤 같은 키를 무효화하기
  핵심: mutate()는 인자가 없는 PATCH다. 성공하면 notifications 쿼리를 무효화해 배지와 목록이 GET으로 다시 센다.
  이유: 응답의 count만 배지에 넣으면 목록의 회색 처리와 어긋날 수 있다. 서버 목록을 다시 읽는 편이 한 출처가 된다.
  실행: 클릭 후 1초 동안 보내는 중… 이고 버튼은 잠긴다. 성공하면 안 읽은 개수가 다시 계산되어 0에 가까워진다. 실패하면 throw되어 onSuccess는 실행되지 않는다.
  활용: 선택 항목 삭제, 모두 보관처럼 일괄 API 뒤에 목록을 새로 받을 때 쓴다.
*/

// ~/next-lab/app/p3-13/_components/ReadAllButton.jsx
// 안 읽은 알림을 한 번에 PATCH한다. 성공하면 같은 notifications 쿼리를 다시 받는다.
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function readAllNotifications() {
  const response = await fetch("/p3-13/api/notifications/read", {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error(`알림을 읽음으로 바꾸지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function ReadAllButton() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: readAllNotifications,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return (
    <button
      type="button"
      className="mr-2 rounded border px-2"
      onClick={() => mutate()}
      disabled={isPending}
    >
      {isPending ? "보내는 중…" : "모두 읽음"}
    </button>
  );
}
