// ~/next-lab/app/p3-14/api/members/route.js
// 메모. ?keyword=min 에서 min을 꺼내 username.includes로 거른다.
// minji, minho는 걸리고 seungtae는 빠진다.
import { members } from "../../_data/members.js";

export async function GET(request) {
  const keyword = request.nextUrl.searchParams.get("keyword");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const found = members.filter((member) => member.username.includes(keyword));

  return Response.json(found);
}
