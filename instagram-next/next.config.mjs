/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // /api/posts 요청은 이 앱이 아니라 API_URL의 게시물 서버로 넘긴다.
  async rewrites() {
    return [
      {
        source: '/api/posts/:path*',
        destination: `${process.env.API_URL}/api/posts/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [new URL('https://picsum.photos/seed/**')],
  },
};

export default nextConfig;
