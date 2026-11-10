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
