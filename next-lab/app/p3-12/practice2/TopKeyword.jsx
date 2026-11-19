/*
  복습: 공유 캐시에서 1위만 꺼내기
  핵심: useTrending이 돌려주는 data는 검색어 응답 전체다. 이 컴포넌트는 keywords[0]만 문장에 넣는다.
  이유: 1위 문장과 목록의 받는 코드를 따로 쓰면 10초 타이머가 두 개가 된다. 훅을 공유하면 받는 주기는 하나다.
  실행: isPending이면 지금 1위 … 다. 데이터가 오면 배열 첫 단어가 1위다. 목록이 같이 마운트되어 있으면 그 요청 결과를 그대로 쓴다.
  활용: 헤더 한 줄 요약이 본문과 같은 응답의 일부만 필요할 때 쓴다.
*/

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
