/*
  복습: 마운트할 때 받고, 10초마다 다시 받고, 떠날 때 타이머 지우기
  핵심: useEffect의 빈 의존성 배열은 마운트 때 한 번 설정한다. setInterval 반환값을 정리 함수에서 clearInterval하지 않으면 화면을 떠나도 요청이 계속된다.
  이유: 인기 검색어는 서버가 10초 칸마다 순서를 돌린다. 클라이언트가 그 간격으로 다시 받아야 순서가 바뀐 것을 본다.
  실행: load가 /p3-12/practice1/api 를 받아 setTrending한다. 그다음 10초마다 같은 함수다. 컴포넌트가 언마운트되면 정리 함수가 타이머를 끈다. 이 훅을 두 컴포넌트가 쓰면 타이머와 요청도 두 개다.
  활용: 채팅 폴링, 대시보드 갱신처럼 라이브러리 없이 간격을 둘 때 쓴다. 같은 데이터를 여러 곳이 쓰면 다음 실습의 queryKey가 그 중복을 없앤다.
*/

// ~/next-lab/app/p3-12/practice1/useTrending.js
// 10초마다 인기 검색어를 다시 받는다. 화면이 바뀌면 이 타이머는 지운다.
import { useEffect, useState } from 'react';

export function useTrending() {
  const [trending, setTrending] = useState(null);

  useEffect(() => {
    const load = async () => {
      const response = await fetch('/p3-12/practice1/api');
      setTrending(await response.json());
    };

    load();
    const timer = setInterval(load, 10000);

    return () => clearInterval(timer);
  }, []);

  return trending;
}
