/*
  복습: 보는 사람에 따라 찜 표시가 달라지는 목록을 받기
  핵심: 요청 주소에 userId를 붙여, 서버가 그 사람이 찜한 상품만 wished true로 표시하게 한다. 쿼리 키는 products 하나다.
  이유: 찜 여부는 상품 속성이 아니라 사용자와 상품의 쌍이다. 클라이언트 목록만으로는 누가 찜했는지 알 수 없어 서버가 행마다 계산한다.
  실행: 이 컴포넌트는 ./me.js 의 MY_USER_ID를 import한다. 그 파일은 폴더에 없다. 이 파일을 번들하는 순간 모듈을 찾지 못해 컴포넌트가 로드되지 않는다. 이 실습에는 page.js도 없어 /p3-17/practice1 주소 자체도 생기지 않는다. 로드가 된다고 가정한 렌더는 로딩, 에러 메시지, 이름과 찜 개수, wished면 내가 찜함이다.
  활용: 사용자 id를 조회에 실어 행마다 내 상태를 받는 목록에 쓴다. 지금은 me.js가 없어 그 경로가 동작하지 않는다.
*/

// ~/next-lab/app/p3-17/practice1/ProductList.jsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { MY_USER_ID } from './me.js';

async function getProducts() {
  const response = await fetch(`/p3-17/practice1/api?userId=${MY_USER_ID}`);

  if (!response.ok) {
    throw new Error(`상품을 불러오지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function ProductList() {
  const { data, isPending, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isPending) {
    return <p className='mt-4'>불러오는 중…</p>;
  }

  if (data === undefined) {
    return <p className='mt-4'>{error.message}</p>;
  }

  return (
    <ul className='mt-4 space-y-2'>
      {data.map((product) => (
        <li key={product.id}>
          {product.name} — 찜 {product.wishCount}개
          {product.wished && ' · 내가 찜함'}
        </li>
      ))}
    </ul>
  );
}
