// ~/next-lab/app/p3-14/error.js
// 메모. throwOnError가 true일 때 알림 화면 대신 이 파일이 뜬다.
// 다시 시도 순서: resetQuery()로 쿼리 에러 표시를 지우고, reset()으로 Next가 이 화면을 걷는다.
// 쿼리 에러를 먼저 지워야, 다시 그릴 때 곧바로 이 화면으로 돌아오지 않는다.
"use client";

import { useEffect } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

export default function ErrorPage({ error, reset }) {
  const { reset: resetQuery } = useQueryErrorResetBoundary();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
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
