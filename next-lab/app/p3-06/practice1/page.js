/*
  복습: 요청마다 달라지는 시각을 빌드 결과에 굳히지 않기
  핵심: connection()은 이 컴포넌트를 요청이 도착한 뒤에 그리게 한다. Suspense는 그 비동기 컴포넌트가 끝나기 전에 fallback을 보여 준다.
  이유: 시각을 빌드할 때 계산하면 모든 방문자가 빌드 시각을 본다. 요청 시각이 필요하면 그 부분만 동적로 남기고, 기다리는 동안 빈 화면 대신 안내를 보여 줘야 한다.
  실행: 제목은 바로 그려지고, Clock이 connection()을 기다리는 동안 fallback 문장이 보인다. 끝나면 그 자리만 한국 로캘 시각으로 바뀐다.
  활용: 현재 시각, 재고, 로그인 사용자처럼 요청마다 다른 조각을 정적 틀 안에 넣을 때 쓴다.
*/

// ~/next-lab/app/p3-06/practice1/page.js
// /p3-06/practice1. 이 화면을 연 시각을 보여 준다.
import { Suspense } from 'react';
import { connection } from 'next/server';

async function Clock() {
  // 시각은 요청마다 달라서, 빌드할 때 굳히지 않고 요청 뒤에 그린다.
  await connection();

  return (
    <p className='mt-4 text-3xl'>{new Date().toLocaleTimeString('ko-KR')}</p>
  );
}

export default function Practice1Page() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>이 화면을 연 시각</h2>
      {/* Clock이 끝나기 전에는 불러오는 중 문구를 보여 준다. */}
      <Suspense
        fallback={<p className='mt-4 text-3xl'>시각을 불러오는 중이에요</p>}>
        <Clock />
      </Suspense>
    </main>
  );
}
