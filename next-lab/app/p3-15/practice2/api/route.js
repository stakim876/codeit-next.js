/*
  복습: practice2 메모리의 프로필을 조회하기
  핵심: import 경로는 이 폴더의 _data/profile.js다. practice1의 객체와 다른 모듈이라 팔로우 수가 서로 섞이지 않는다.
  이유: 낙관적 갱신 실험에서 서버 숫자를 올려도 1번 실습 화면의 8500이 같이 변하면 비교가 안 된다.
  실행: 1초 뒤 그 객체를 JSON으로 준다. 버튼의 invalidate가 이 GET을 다시 부른다.
  활용: 실습별로 저장소를 나눈 조회 API에 쓴다.
*/

// ~/next-lab/app/p3-14/homework2/api/route.js
import { profile } from "../_data/profile.js"; // 팔로우 라우트가 바꾸는 그 객체

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 뒤에 응답

  return Response.json(profile); // useProfile이 이 값을 ['profile'] 캐시에 넣음
}