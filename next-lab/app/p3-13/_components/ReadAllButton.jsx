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
