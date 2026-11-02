// ~/instagram-next/app/api/members/search/route.js
// /api/members/search?keyword=mi 에서 keyword로 사용자를 거른다.
import { profiles } from '@/data/profiles.js';

export function GET(request) {
  // 주소 뒤 ?keyword= 값을 꺼낸다.
  const keyword = request.nextUrl.searchParams.get('keyword');

  if (!keyword) {
    return Response.json([]); // 검색어가 없으면 빈 목록
  }

  // username에 keyword가 들어 있는 프로필만 남긴다.
  const found = profiles.filter((item) => item.username.includes(keyword));

  return Response.json(found);
}
