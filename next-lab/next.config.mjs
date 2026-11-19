/*
  복습: Next 빌드가 이 앱을 어떻게 다룰지 정하기
  핵심: next.config는 페이지 코드가 아니라 개발 서버와 빌드가 읽는 설정이다. cacheComponents는 컴포넌트 캐시를 켜고, partialPrefetching은 링크 이동 전에 화면 일부만 미리 받게 한다.
  이유: 실습마다 시각이나 메모리 데이터를 요청 시점에 그리려면, 캐시를 켠 상태에서 connection()이나 instant 설정으로 어디를 굳히지 않을지 나눠야 한다. CSS는 Tailwind 로더를 타야 클래스 이름이 스타일로 바뀐다.
  실행: next dev와 next build가 이 객체를 읽는다. turbopack.rules의 *.css는 @tailwindcss/turbopack 로더를 거친 뒤 CSS로 취급된다.
  활용: 프레임워크 동작, 번들러, 실험 기능을 코드 밖 한 파일에서 바꿀 때 쓴다.
*/

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
