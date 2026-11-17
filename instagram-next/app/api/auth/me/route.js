/*
  복습: 로그인 쿠키가 있으면 지금 사용자를 돌려주기
  핵심: sessionId 쿠키가 없으면 401이다. 있으면 seungtae 사용자를 돌려준다.
  이유: /api/auth/me는 바깥 인증 서버로 넘어가는데, 그 서버가 꺼져 있으면 «나는 누구»가 실패한다.
  실행: useMe가 GET /api/auth/me를 부른다. 로그인 라우트가 심은 쿠키를 이 경로가 확인한다.
  활용: 피드와 로그인 이동이 같은 사람 정보를 읽을 때 쓴다.
*/

// ~/instagram-next/app/api/auth/me/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  if (!request.cookies.has('sessionId')) {
    return NextResponse.json(
      { message: '로그인이 필요해요' },
      { status: 401 },
    );
  }

  return NextResponse.json({
    id: 3,
    username: 'seungtae',
    name: '김승태',
    profileImage: '/profiles/seungtae.jpg',
  });
}
