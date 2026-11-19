/*
  복습: 프로필 조회를 한 키로 공유하고, 첫 실패만 에러 화면으로 올리기
  핵심: queryKey profile이 이름, 숫자, 버튼의 공통 캐시다. retry는 1이라 실패하면 한 번만 더 부른다. throwOnError는 data가 아직 없을 때만 true다.
  이유: 버튼이 팔로우를 바꾼 뒤 다시 받는 요청이 실패해도, 이미 보여 주던 이름까지 에러 화면으로 바꾸면 안 된다. 처음 로드 실패만 대체 화면이 필요하다.
  실행: GET /p3-15/practice1/api 가 1초 뒤 프로필 객체를 주면 그 객체가 캐시다. ok가 아니면 Error를 던진다.
  활용: 여러 조각이 한 사용자 자원을 보여주고, 갱신 실패는 각 조각이 처리하게 할 때 쓴다.
*/

// ~/next-lab/app/p3-14/homework2/useProfile.js
import { useQuery } from "@tanstack/react-query";

async function getProfile() {
  const response = await fetch("/p3-15/practice1/api"); // 프로필 요청

  if (!response.ok) {
    throw new Error(`프로필을 불러오지 못했어요 (${response.status})`); // 실패면 쿼리 에러
  }

  return response.json(); // 이 객체가 캐시에 들어감
}

export function useProfile() {
  return useQuery({
    queryKey: ["profile"], // 이름, 숫자, 버튼이 같이 쓰는 키
    queryFn: getProfile, // 캐시가 없을 때 이 함수로 받음
    retry: 1, // 실패하면 한 번만 더
    throwOnError: (error, query) => query.state.data === undefined, // 한 번도 못 받았을 때만 에러 화면
  });
}
