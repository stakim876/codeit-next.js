// ~/instagram-next/hooks/useDebouncedValue.js
import { useEffect, useState } from 'react';

// 값이 바뀐 뒤 delay 동안 더 바뀌지 않으면, 그때 그 값을 돌려준다.
export function useDebouncedValue(value, delay) {
  const [settled, setSettled] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setSettled(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return settled;
}
