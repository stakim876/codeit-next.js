// ~/next-lab/app/p3-12/practice2/TopKeyword.jsx
// 헤더의 1위. 목록과 같은 useTrending이라 요청은 한 번만 나간다.
'use client';

import { useTrending } from './useTrending.js';

export default function TopKeyword() {
  const { data, isPending } = useTrending();

  if (isPending) {
    return <p className='font-semibold'>지금 1위 …</p>;
  }

  return <p className='font-semibold'>지금 1위 {data.keywords[0]}</p>;
}
