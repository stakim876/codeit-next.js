// ~/next-lab/app/p3-14/error.js
"use client";

import { useEffect } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

export default function ErrorPage({ error, reset }) {
  const { reset: resetQuery } = useQueryErrorResetBoundary();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    // 쿼리에 남은 에러를 지운 뒤, Next가 에러 화면을 걷게 한다.
    resetQuery();
    reset();
  };

  return (
    <main className="p-6">
      <p className="text-red-500">
        화면을 불러오지 못했어요. 잠시 뒤에 다시 시도해 주세요.
      </p>
      <button
        type="button"
        className="mt-2 rounded border px-2"
        onClick={handleRetry}
      >
        다시 시도
      </button>
    </main>
  );
}
