/*
  복습: practice2 주소의 프로필을 같은 키 이름으로 받기
  핵심: queryKey 문자열은 practice1과 같이 profile이다. 다만 이 훅을 부르는 화면이 /p3-15/practice2 라 런타임에는 그 페이지의 캐시다. fetch 주소는 /p3-15/practice2/api 다.
  이유: 키 이름이 같아도 페이지를 옮겨 컴포넌트가 언마운트되면 구독은 바뀐다. 조회 URL을 실습별로 나눠 다른 메모리 객체를 읽게 한다.
  실행: 실패하면 한 번 재시도하고, data가 없을 때만 에러 화면으로 throw한다. 성공 객체를 이름, 숫자, 버튼이 같이 쓴다.
  활용: 화면마다 API는 나누고, 그 화면 안에서는 키 하나로 필드를 나눠 그릴 때 쓴다.
*/

// ~/next-lab/app/p3-14/homework2/useProfile.js
import { useQuery } from "@tanstack/react-query";

async function getProfile() {
  const response = await fetch("/p3-15/practice2/api"); // 프로필 요청

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
