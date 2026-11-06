// ~/next-lab/app/p3-06/practice3/page.js
// /p3-06/practice3. 버튼을 누를 때마다 횟수가 늘어난다.
// useState를 쓰므로 이 파일은 브라우저에서 실행된다.
'use client';

import { useState } from 'react';
 
export default function Practice3Page() {
  // count는 지금 횟수, setCount는 그 횟수를 바꾸는 함수.
  const [count, setCount] = useState(0);

  return (
    <main className='p-6'>
      <button
        type='button'
        className='rounded border px-4 py-2'
        // 이전 횟수에 1을 더해 다시 그린다.
        onClick={() => setCount((prevCount) => prevCount + 1)}>
        박수 {count}번
      </button>
    </main>
  );
}
