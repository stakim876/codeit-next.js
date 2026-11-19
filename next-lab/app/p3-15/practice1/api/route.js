/*
  복습: 팔로우 라우트가 고치는 그 객체를 그대로 돌려주기
  핵심: GET은 _data/profile.js의 객체를 JSON으로 직렬화한다. 모듈이 같은 객체를 내보내므로 PUT과 DELETE가 고친 following과 followerCount가 다음 GET에 보인다.
  이유: 버튼은 성공 뒤 이 GET으로 캐시를 다시 채운다. 저장과 조회가 다른 객체면 숫자가 되돌아간다.
  실행: 1초 뒤에 프로필 JSON이다. 처음 following은 false, followerCount는 8500이다.
  활용: 메모리 한 객체를 조회와 변경이 공유하는 수업용 API에 쓴다.
*/

// ~/next-lab/app/p3-14/homework2/api/route.js
import { profile } from "../_data/profile.js"; // 팔로우 라우트가 바꾸는 그 객체

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 뒤에 응답

  return Response.json(profile); // useProfile이 이 값을 ['profile'] 캐시에 넣음
}
