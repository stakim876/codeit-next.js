/*
  복습: 게시물과 인증 주소를 바깥 서버로 넘기기
  핵심: /api/v2/posts와 /api/v2/auth는 이 앱 파일이 없을 때 API_URL로 다시 보낸다.
  이유: 화면 서버와 게시물 서버의 포트가 다르다. 브라우저는 화면과 같은 주소로만 요청한다.
  실행: API_URL이 http://localhost:3000이면 /api/v2/posts/1은 그 서버의 같은 경로로 간다. 이 앱에 route.js가 있으면 그 파일이 먼저 받는다.
  활용: 프론트와 API를 다른 포트로 띄우고, 화면 주소는 하나로 두고 싶을 때 쓴다.
*/

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // /api/v2/posts 와 /api/v2/auth 는 이 앱이 아니라 API_URL의 서버로 넘긴다.
  async rewrites() {
    return [
      {
        source: '/api/v2/posts/:path*',
        destination: `${process.env.API_URL}/api/v2/posts/:path*`,
      },
      {
        source: '/api/v2/auth/:path*',
        destination: `${process.env.API_URL}/api/v2/auth/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [new URL('https://picsum.photos/seed/**')],
  },
};

export default nextConfig;
