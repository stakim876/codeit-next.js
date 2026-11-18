/*
  복습: 모든 페이지를 같은 레이아웃으로 감싸고 탭 제목을 정하기
  핵심: QueryProvider가 페이지를 감싸고, CreateFeedModalRoot를 그 옆에 붙인다. 제목 기본값은 Instagram이다.
  이유: 받아 둔 데이터를 페이지마다 새로 만들지 않는다. 글 작성 창도 페이지 안에 두면 이동할 때마다 사라진다.
  실행: metadataBase는 SITE_URL이다. 페이지가 제목을 주면 %s • Instagram이 되고, 없으면 Instagram이다.
  활용: 앱 전체의 제목, 공유 미리보기, 글 작성 창을 한곳에서 붙일 때 쓴다.
*/

// ~/instagram-next/app/layout.js
// 모든 페이지를 감싸는 루트 레이아웃. 탭 제목의 기본값도 여기서 정한다.
import '@/styles/global.scss';
import QueryProvider from '@/components/QueryProvider.jsx';
import CreateFeedModalRoot from '@/components/CreateFeedModalRoot.jsx';

// 탭 제목과 링크 미리보기. 페이지가 제목을 주면 template의 %s에 들어간다.
export const metadata = {
  // 상대 경로를 절대 주소로 만들 때 앞에 붙는 사이트 주소.
  metadataBase: new URL(process.env.SITE_URL),
  title: {
    default: 'Instagram', // 페이지가 제목을 안 주면 탭에 이 글자가 나온다
    template: '%s • Instagram', // %s 자리에 generateMetadata의 title이 들어간다
  },
  description: '친구들이 올린 사진을 보고, 내 사진도 올려보세요.',
  openGraph: {
    siteName: 'Instagram', // 링크를 공유할 때 보이는 사이트 이름
    images: '/phones.png', // metadataBase와 합쳐 미리보기 사진 주소가 된다
  },
};

// 이 함수가 기본 export 되어야 앱이 그려진다.
export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body>
        {/* QueryProvider가 브라우저에서 받아 둔 데이터를 페이지끼리 같이 쓴다.
            글 작성 창은 그 옆에 붙인다. */}
        <QueryProvider>
          {children}
          <CreateFeedModalRoot />
        </QueryProvider>
      </body>
    </html>
  );
}