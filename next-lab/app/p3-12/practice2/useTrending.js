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
