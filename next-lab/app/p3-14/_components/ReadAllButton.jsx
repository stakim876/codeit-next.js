/*
  복습: 서버가 거절하면 캐시는 그대로 두고 문구만 보여 주기
  핵심: mutationFn이 ok가 아니면 throw한다. onError는 콘솔만 남기고 invalidateQueries는 호출하지 않는다. onSuccess에서만 쿼리를 무효화한다.
  이유: 실패했는데 키를 버리면 멀쩡하던 목록까지 다시 받으며 흔들린다. 실패는 error 상태로 버튼 옆에만 알린다.
  실행: 이 실습의 PATCH /notifications/read 는 500이다. 1초 뒤 버튼 옆에 읽음으로 바꾸지 못했어요가 나오고 배지 숫자는 유지된다. isPending 동안은 보내는 중… 이다.
  활용: 결제, 일괄 변경처럼 실패 시 화면 데이터를 롤백할 필요 없이 메시지만 보여줄 때 쓴다.
*/

// ~/next-lab/app/p3-14/_components/ReadAllButton.jsx
// 메모. 클릭하면 PATCH /notifications/read.
// 서버가 500을 주면 throw → onError에서 console.error, error가 채워진다.
// 쿼리 캐시는 그대로다. 버튼 옆 문구만 나온다.
// 성공했을 때만 invalidateQueries로 목록과 배지를 다시 받는다.
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function readAllNotifications() {
  const response = await fetch("/p3-14/api/notifications/read", {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error(`알림을 읽음으로 바꾸지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function ReadAllButton() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: readAllNotifications,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <>
      <button
        type="button"
        className="mr-2 rounded border px-2"
        onClick={() => mutate()}
        disabled={isPending}
      >
        {isPending ? "보내는 중…" : "모두 읽음"}
      </button>
      {error && (
        <span className="mr-2 text-red-500">
          읽음으로 바꾸지 못했어요. 잠시 뒤에 다시 눌러 주세요.
        </span>
      )}
    </>
  );
}
