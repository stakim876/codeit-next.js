// ~/next-lab/app/p3-14/homework2/api/route.js
import { profile } from "../_data/profile.js"; // 팔로우 라우트가 바꾸는 그 객체

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 뒤에 응답

  return Response.json(profile); // useProfile이 이 값을 ['profile'] 캐시에 넣음
}