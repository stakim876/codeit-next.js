// ~/next-lab/app/QueryProvider.jsx
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