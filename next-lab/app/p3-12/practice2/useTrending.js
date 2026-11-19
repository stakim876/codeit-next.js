/*
  복습: 폴링을 쿼리 옵션으로 옮기기
  핵심: refetchInterval: 10000 은 쿼리가 쓰이는 동안 10초마다 queryFn을 다시 실행한다. queryKey가 trending으로 같으면 구독자가 여러이어도 요청은 하나로 합쳐진다.
  이유: practice1은 훅을 부르는 컴포넌트마다 setInterval이 생겼다. 캐시 키가 그 중복을 없애고, 언마운트 정리는 라이브러리가 한다.
  실행: getTrending이 /p3-12/practice2/api 를 부른다. ok가 아니면 Error를 던진다. 성공한 JSON이 1위와 목록의 data다.
  활용: 여러 위젯이 같은 실시간 데이터를 10초마다 나눠 볼 때 쓴다.
*/

// ~/next-lab/app/p3-12/practice2/useTrending.js
// queryKey가 같으면 1위와 목록이 받아 둔 검색어를 같이 쓴다. 10초마다 다시 받는다.
import { useQuery } from '@tanstack/react-query';

async function getTrending() {
  const response = await fetch('/p3-12/practice2/api');

  if (!response.ok) {
    throw new Error(`인기 검색어를 불러오지 못했습니다.`);
  }

  return response.json();
}

export function useTrending() {
  return useQuery({
    queryKey: ['trending'],
    queryFn: getTrending,
    refetchInterval: 10000,
  });
}
