/*
  복습: 지금 로그인한 사람을 서버의 «나는 누구»로 묻기
  핵심: queryKey는 ['me']이고 queryFn은 authApi.me다. 4xx면 다시 보내지 않는다.
  이유: 화면은 쿠키를 읽지 못한다. 401은 다시 보내도 같은 답이므로, 연결 실패와 5xx만 세 번까지 다시 보낸다.
  실행: useMe를 부르면 성공 시 data가 사용자다. ApiError이고 status가 500 미만이면 retryOnServerError가 false를 돌려준다.
  활용: 로그인 화면 이동, 피드의 보는 사람, 사이드바 프로필이 같은 캐시를 쓸 때 쓴다.
*/

// ~/instagram-next/hooks/useMe.js
import { useQuery } from '@tanstack/react-query';
import { authApi, ApiError } from '@/services/api';

// 서버가 4xx 로 답했으면 다시 보내도 같은 답이다 ㅡ 연결 실패와 5xx 만 세 번까지 다시 보낸다. 
function retryOnServerError(failureCount, error) {
  if (error instanceof ApiError && error.status < 500) {
    return false;
  }  

  return failureCount < 3;
}

// 지금 로그인한 사람 ㅡ 화면은 쿠키를 읽을 수 없으니 서버의 «나는 누구»에 묻는다.
export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: authApi.me,
    retry: retryOnServerError,
  });  
}