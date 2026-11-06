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
