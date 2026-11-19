/*
  복습: 한 건 수정 뒤에 목록 쿼리를 버리기
  핵심: useMutation은 PATCH를 보내고, onSuccess에서 invalidateQueries로 notifications 키를 stale로 만들어 다시 받게 한다. variables는 이번 mutate에 넘긴 id다.
  이유: 버튼 클릭만으로 목록 배열의 isRead를 고치면 서버가 실패해도 화면은 읽음이 된다. 서버가 성공한 뒤에 목록을 다시 받아야 배지와 글자색이 서버와 같다.
  실행: 안 읽은 행에만 읽음 버튼이 있다. 누른 id와 variables가 같으면 그 버튼만 보내는 중… 이다. isPending은 mutation 전체라 다른 읽음 버튼도 disabled다. 성공하면 목록과 배지가 다시 GET한다.
  활용: 항목 하나의 상태 변경 후 목록 전체를 서버 값으로 맞출 때 쓴다.
*/

// ~/next-lab/app/p3-13/_components/NotificationList.jsx
// 안 읽은 알림 하나만 PATCH한다. 성공하면 notifications 쿼리를 버려 배지와 목록이 다시 받는다.
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "./useNotifications.js";

async function readNotification(id) {
  const response = await fetch(`/p3-13/api/notifications/${id}/read`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error(`알림을 읽음으로 바꾸지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function NotificationList() {
  const { data, isPending, error } = useNotifications();

  const queryClient = useQueryClient();
  const readOne = useMutation({
    mutationFn: readNotification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  if (isPending) {
    return <p className="mt-4">불러오는 중…</p>;
  }

  if (error) {
    return <p className="mt-4">{error.message}</p>;
  }

  return (
    <ul className="mt-4 space-y-2">
      {data.map((item) => (
        <li key={item.id} className={item.isRead ? "text-gray-400" : ""}>
          {item.text}
          {!item.isRead && (
            <button
              type="button"
              className="ml-2 rounded border px-2"
              onClick={() => readOne.mutate(item.id)}
              disabled={readOne.isPending}
            >
              {/* variables는 이번 mutate에 넘긴 id. 누른 버튼만 보내는 중으로 바꾼다. */}
              {readOne.isPending && readOne.variables === item.id
                ? "보내는 중…"
                : "읽음"}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
