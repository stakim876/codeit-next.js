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
