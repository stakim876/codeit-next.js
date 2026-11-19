/*
  복습: 프로필을 한 번도 못 받았을 때의 대체 화면
  핵심: useProfile의 throwOnError가 캐시에 data가 없을 때 true라, 첫 GET이 실패하면 이 파일이 페이지 대신 그려진다.
  이유: 쿼리 에러를 지우지 않고 페이지만 다시 그리면 남은 에러가 곧바로 이 화면을 다시 연다. reset은 쿼리 쪽 에러를 지우는 함수다.
  실행: 버튼은 retry()를 호출한다. Next가 error.js에 넘기는 다시 그리기 함수 이름은 reset이다. 이 파일의 매개변수 이름이 retry라 그 함수는 들어오지 않고, 클릭하면 retry is not a function 으로 멈춘다. 쿼리 에러를 지우는 reset()은 그 다음 줄이라 실행되지 않는다.
  활용: 에러 경계의 props 이름과 쿼리 리셋 함수 이름이 겹칠 때, 실제로 어떤 함수가 호출되는지 구분하는 예다.
*/

// ~/next-lab/app/p3-14/homework2/error.js
"use client";

import { useEffect } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

export default function ErrorPage({ error, retry }) {
  const { reset } = useQueryErrorResetBoundary(); // 쿼리에 걸린 에러를 지우는 함수

  useEffect(() => {
    console.error(error); // 들어온 에러는 콘솔에만 남김
  }, [error]);

  const handleRetry = () => {
    reset(); // 쿼리 에러를 먼저 지움. 안 지우면 다시 이 화면으로 돌아옴
    retry(); // 그다음 이 화면을 걷고 페이지를 다시 그림
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
