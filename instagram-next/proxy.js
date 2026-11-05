// ~/instagram-next/proxy.js
// 페이지를 그리기 전에 주소만 검사한다. 프로필 주소와 저장 목록에만 적용된다.
import { NextResponse } from 'next/server';
import { profiles } from '@/data/profiles.js';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // /Seungtae처럼 대문자가 있으면 소문자 주소로 보낸다.
  if (pathname !== pathname.toLowerCase()) {
    return NextResponse.redirect(new URL(pathname.toLowerCase(), request.url));
  }

  // 로그인과 파일 주소는 프로필 검사가 필요 없다.
  if (pathname === '/login' || pathname.includes('.')) {
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

// 이 파일은 아이디 주소와 그 저장 목록에서만 실행된다.
export const config = {
  matcher: ['/:username', '/:username/saved'],
};
