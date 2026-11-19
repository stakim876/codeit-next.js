/*
  복습: practice1과 같은 에러 화면, 같은 매개변수 이름
  핵심: 첫 프로필 조회가 throwOnError로 올라오면 이 파일이 대신 그려진다. 다시 시도는 쿼리 에러를 지운 다음 페이지를 다시 그려야 한다.
  이유: 쿼리 에러가 남은 채 페이지를 그리면 같은 throw로 이 화면이 반복된다.
  실행: 클릭 핸들러는 retry()를 부른다. Next가 넘기는 함수는 reset이라 이 매개변수에는 들어오지 않는다. retry is not a function 에서 멈추고, 쿼리 에러를 지우는 reset()은 실행되지 않는다.
  활용: 낙관적 갱신 실습에서도 첫 로딩 실패 화면의 동작은 practice1과 같다는 비교에 쓴다.
*/

// ~/next-lab/app/p3-14/homework2/error.js
"use client";

import { useEffect } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

export default function ErrorPage({ error, retry }) {
  const { reset } = useQueryErrorResetBoundary();
  
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    reset();
    retry();
  };

  return (
    <main className="p-6">
      <p className="text-red-500">프로필을 불러오지 못했어요. 잠시 뒤에 다시 시도해 주세요.</p>
      <button type="button" className="mt-2 rounded border px-2" onClick={handleRetry}>
        다시 시도
      </button>  
    </main>
  );
}