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
