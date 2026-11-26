/*
  복습: 입력이 멈춘 뒤에만 값을 넘기기
  핵심: value가 바뀌면 delay 뒤에 settled를 그 값으로 바꾼다. 그 전에 다시 바뀌면 앞 타이머를 취소한다.
  이유: 글자를 치는 동안마다 검색 요청을 보내면 호출이 글자 수만큼 늘어난다.
  실행: 처음 settled는 받은 value다. delay 동안 더 바뀌지 않은 마지막 값만 돌아온다.
  활용: 검색창 입력을 잠시 모았다가 회원 검색 쿼리에 넣을 때 쓴다.
*/

// ~/instagram-next/hooks/useDebouncedValue.js
import { useEffect, useState } from 'react';

// 값이 바뀐 뒤 delay 동안 더 바뀌지 않으면, 그때 그 값을 돌려준다.
export function useDebouncedValue(value, delay) {
  const [settled, setSettled] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setSettled(value), delay);

    // 그사이 또 바뀌면 앞의 타이머를 취소한다 - 마지막 값만 남는다.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return settled;
}

