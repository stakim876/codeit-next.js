/*
  복습: 쿼리 에러가 화면 전체를 바꿀 때 다시 시도 순서
  핵심: error.js는 같은 구간의 렌더 중 throw를 받아 페이지 대신 그려진다. throwOnError가 true일 때만 쿼리 실패가 여기로 올라온다.
  이유: reset()만 호출하면 쿼리에 에러가 남은 채 페이지가 다시 그려져 곧바로 이 화면으로 돌아온다. 쿼리 에러 표시를 먼저 지워야 다시 받을 기회가 생긴다.
  실행: useQueryErrorResetBoundary의 resetQuery()로 쿼리 에러를 지우고, 그다음 Next가 넘긴 reset()으로 이 대체 화면을 걷는다. useEffect는 들어온 error를 콘솔에만 남긴다.
  활용: 데이터 실패로 페이지가 대체된 뒤, 사용자가 다시 시도할 수 있는 에러 화면에 쓴다.
*/

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
