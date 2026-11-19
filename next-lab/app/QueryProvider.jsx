/*
  복습: 받아 둔 서버 데이터를 페이지 이동 뒤에도 유지하기
  핵심: QueryClient는 React Query의 저장소다. 같은 클라이언트를 쓰면 queryKey가 같은 결과는 다시 요청하지 않고 꺼내 쓴다. 'use client'는 이 파일이 브라우저 상태와 훅을 쓴다는 표시다.
  이유: 페이지마다 새 클라이언트를 만들면 알림을 받아 두고 다른 화면을 갔다가 돌아와도 캐시가 비어 다시 1초를 기다린다. 서버에서는 요청마다 새 클라이언트가 필요하다. 한 객체를 공유하면 다른 사용자의 캐시가 섞인다.
  실행: window가 없으면 요청마다 new QueryClient()다. 브라우저에서는 browserQueryClient가 없을 때만 만들고 그다음부터 같은 객체를 돌려준다. Devtools는 그 캐시가 fresh인지 stale인지 보여 준다.
  활용: 목록, 알림, 프로필처럼 여러 컴포넌트가 같은 서버 결과를 나눠 쓸 때 앱 바깥에서 한 번 감싼다.
*/

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