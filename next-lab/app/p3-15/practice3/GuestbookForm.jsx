// ~/next-lab/app/p3-14/practice2/GuestbookForm.jsx
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function addEntry(text) {
  const response = await fetch("/p3-15/practice3/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }), // 입력한 글
  });

  if (response.status === 400) {
    const { message } = await response.json();
    throw new Error(message); // 서버가 준 거절 문구
  }

  if (!response.ok) {
    throw new Error("글을 남기지 못했어요. 잠시 뒤에 다시 남겨 주세요."); // 그 외 실패
  }

  return response.json();
}

export default function GuestbookForm() {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: addEntry,
    onMutate: async (text) => {
      await queryClient.cancelQueries({ queryKey: ['guestbook'] }); // 진행 중인 목록 요청을 멈춤
      const previousEntries = queryClient.getQueryData(['guestbook']); // 실패하면 되돌릴 목록

      queryClient.setQueryData(['guestbook'], (entries) => [
        ...entries,
        { id: Date.now(), text, pending: true }, // 응답 전에 목록에 먼저 넣음
      ]);

      return { previousEntries };
    },
    onError: (error, text, onMutateResult) => {
      queryClient.setQueryData(['guestbook'], onMutateResult.previousEntries); // 실패하면 이전 목록으로
    },
    onSuccess: () => {
      setText(''); // 성공하면 입력을 비움
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['guestbook'] }); // 끝나면 서버 목록으로 다시 맞춤
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(text); // 지금 입력으로 요청
  };

  const handleChange = (event) => {
    setText(event.target.value);
    reset(); // 글을 고치면 에러 문구를 지움
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input className="rounded border px-2" value={text} onChange={handleChange} />
        <button type="submit" className="rounded border px-2" disabled={isPending || text.trim() === ""}>
          {isPending ? "남기는 중…" : "남기기"} {/* 빈 글이거나 보내는 중이면 버튼을 막음 */}
        </button>
      </div>
      {error && <p className="mt-2 text-red-500">{error.message}</p>} {/* 400이면 서버 문구 */}
    </form>
  );
}