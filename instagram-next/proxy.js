/*
  복습: 페이지를 그리기 전에 주소와 로그인 쿠키를 검사하기
  핵심: matcher에 적힌 주소만 proxy가 먼저 본다. 대문자는 소문자로 보내고, accessToken 쿠키가 없으면 /login으로 보낸다. 표에 없는 아이디는 404다.
  이유: 화면을 그리기 전에 잘못된 주소와 비로그인 요청을 걸러 낸다. 토큰이 살아 있는지는 여기서 묻지 않는다.
  실행: /Seungtae는 /seungtae로 보낸다. 쿠키가 없으면 /login?next=원래주소다. /는 프로필 검사를 건너뛴다. 없는 아이디는 /_not-found를 404로 다시 쓴다. /login, /signup, 파일 주소는 통과다.
  활용: 홈, 프로필, 저장 목록에 들어가기 전에 로그인과 아이디를 확인할 때 쓴다.
*/

// ~/instagram-next/proxy.js
import { NextResponse } from 'next/server';
import { profiles } from '@/data/profiles.js';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // /Seungtae처럼 대문자가 있으면 소문자 주소로 보낸다.
  if (pathname !== pathname.toLowerCase()) {
    return NextResponse.redirect(new URL(pathname.toLowerCase(), request.url));
  }

  // 로그인, 가입, 파일 주소는 프로필 검사가 필요 없다.
  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname.includes('.')
  ) {
    return;
  }

  // 로그인 쿠키가 없으면 페이지를 그리기 전에 로그인 화면으로 보낸다 — 토큰이 살아 있는지는 묻지 않는다.
  if (!request.cookies.has('accessToken')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 피드는 사용자 이름이 든 주소가 아니다 — 아래 프로필 목록 확인을 건너뛴다.
  if (pathname === '/') {
    return;
  }

  // /seungtae, /seungtae/saved의 첫 칸이 아이디다.
  const username = pathname.split('/')[1];
  const profile = profiles.find((item) => item.username === username);

  // 없는 아이디는 없는 주소 화면을 404로 보여 준다.
  if (profile === undefined) {
    return NextResponse.rewrite(new URL('/_not-found', request.url), {
      status: 404,
    });
  }
}

// 홈, 프로필, 저장 목록만 이 검사를 탄다.
export const config = {
  matcher: ['/', '/:username', '/:username/saved'],
};
