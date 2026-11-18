/*
  복습: 검색 글자가 아이디에 들어 있는 회원만 { data } 봉투로 돌려주기
  핵심: 검색 글자가 없으면 { data: [] }다. 있으면 username에 그 글자가 포함된 프로필만 data에 담는다.
  이유: 검색 패널이 회원 전체를 받지 않게 한다. 백엔드의 새 주소와 같은 봉투라 request가 그 모양을 그대로 읽는다.
  실행: searchParams에서 keyword를 읽는다. 없으면 빈 data를, 있으면 거른 프로필을 { data }로 보낸다.
  활용: 검색창에 친 글자로 사람 목록을 바꿀 때 쓴다.
*/

// ~/instagram-next/app/api/v2/members/search/route.js
import { profiles } from '@/data/profiles.js';

export function GET(request) {
  const keyword = request.nextUrl.searchParams.get('keyword');

  // request() 가 부르는 주소라 백엔드의 새 주소와 같은 봉투에 담아 보낸다.
  if (!keyword) {
    return Response.json({ data: [] });
  }

  const found = profiles.filter((item) => item.username.includes(keyword));

  return Response.json({ data: found });
}