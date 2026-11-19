/*
  복습: 쿼리 클라이언트를 만드는 파일을 이 실습 폴더에 복사해 둔 것
  핵심: 브라우저에서는 클라이언트 하나, 서버 렌더에서는 요청마다 새 QueryClient를 만드는 구조는 루트 app/QueryProvider.jsx와 같다.
  이유: 장바구니 실습은 서버 응답을 React Query로 받지 않는다. zustand 스토어만 쓴다. 이 파일을 감싸지 않아도 담기와 패널은 동작한다.
  실행: practice2/page.js와 루트 layout.js 모두 이 경로를 import하지 않는다. 루트 layout은 app/QueryProvider.jsx를 이미 쓰고 있다. 그래서 이 파일의 Devtools는 화면에 추가되지 않는다.
  활용: 전역 상태를 쿼리 캐시와 헷갈릴 때, 마운트되지 않은 provider는 효과가 없다는 비교에 쓴다.
*/

// ~/next-lab/app/p3-18/practice2/QueryProvider.jsx
// 브라우저에서 받아 둔 데이터를 페이지가 바뀌어도 다시 쓸 수 있게 감싼다.
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// 브라우저에서는 이 클라이언트 하나를 계속 쓴다.
let browserQueryClient;

function getQueryClient() {
  // 서버에서 그리면 요청마다 새 클라이언트를 만든다. 캐시가 요청 사이에 섞이지 않는다.
  if (typeof window === 'undefined') {
    return new QueryClient();
  }  

  if (!browserQueryClient) {
    browserQueryClient = new QueryClient();
  }

  return browserQueryClient;
}

export default function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}  
     {/* 쿼리 캐시와 stale 상태를 브라우저에서 본다. */}
     <ReactQueryDevtools /> 
    </QueryClientProvider>
  );  
}