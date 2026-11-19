/*
  복습: 클릭으로 화면 숫자를 바꾸기
  핵심: useState는 브라우저에만 있는 상태다. 그래서 파일 맨 위 'use client'가 필요하다. setCount에 함수를 넘기면 인자 prevCount는 지금 화면에 있는 값이다.
  이유: count + 1을 직접 넘기면, 같은 클릭 처리에서 여러 번 호출할 때 옛 값을 기준으로 더할 수 있다. 함수 갱신은 직전 상태를 받아 더한다.
  실행: 처음 count는 0이라 버튼 글자는 박수 0번이다. 누를 때마다 1이 더해져 그 숫자만 다시 그려진다. 서버는 이 클릭을 모른다.
  활용: 좋아요 수, 수량 증감처럼 서버에 바로 보내지 않는 화면 조작에 쓴다.
*/

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
