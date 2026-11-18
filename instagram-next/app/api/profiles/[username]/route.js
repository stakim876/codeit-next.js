/*
  복습: 주소의 아이디로 프로필 하나를 찾아 돌려주기
  핵심: /api/profiles/minji의 minji로 profiles에서 한 사람을 찾는다. 없으면 404와 안내 문장이다.
  이유: 목록과 한 사람의 주소를 나눈다. params는 Promise라 await한 뒤에 username을 꺼낸다.
  실행: GET /api/profiles/seungtae는 그 프로필 JSON이다. 표에 없는 아이디는 { message: '그런 사람은 없어요' }와 404다.
  활용: 프로필 페이지가 주소의 이름으로 한 사람 정보를 받을 때 쓴다.
*/

// ~/instagram-next/app/api/profiles/[username]/route.js
import { profiles } from '@/data/profiles.js';

export async function GET(request, { params }) {
  const { username } = await params;
  const profile = profiles.find((item) => item.username === username);

  if (profile === undefined) {
    return Response.json({ message: '그런 사람은 없어요' }, { status: 404 });
  }

  return Response.json(profile);
}
