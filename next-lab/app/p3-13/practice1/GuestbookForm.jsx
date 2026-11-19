/*
  복습: 추가에 성공한 뒤에만 입력칸을 비우기
  핵심: useMutation의 onSuccess는 POST가 2xx일 때만 실행된다. 그때 guestbook 키를 무효화하고 setText('')로 칸을 비운다.
  이유: 요청을 보내는 순간에 칸을 비우면 실패했을 때 쓴 글이 사라진다. 성공 응답 뒤에 비워야 다시 누를 글이 남는다.
  실행: submit이 기본 새로고침을 preventDefault로 막고 mutate(text)를 부른다. 빈 칸이거나 isPending이면 버튼이 잠긴다. 1초 대기 후 201이면 목록이 다시 받아지고 칸은 빈다.
  활용: 댓글 작성처럼 실패 시 초안을 유지하는 폼에 쓴다.
*/

// ~/next-lab/app/p3-13/practice1/GuestbookForm.jsx
// 글을 POST로 남긴다. 성공하면 guestbook 쿼리를 버려 목록이 다시 받게 한다.
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function addEntry(text) {
  const response = await fetch("/p3-13/practice1/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`글을 남기지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function GuestbookForm() {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addEntry,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["guestbook"] });
      setText("");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(text);
  };

  return (
    <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
      <input
        className="rounded border px-2"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button
        type="submit"
        className="rounded border px-2"
        disabled={isPending || text.trim() === ""}
      >
        {isPending ? "남기는 중…" : "남기기"}
      </button>
    </form>
  );
}
