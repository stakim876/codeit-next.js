// ~/instagram-next/app/layout.js
// 모든 페이지를 감싸는 루트 레이아웃. 탭 제목의 기본값도 여기서 정한다.
import '@/styles/global.scss';
import { CreateFeedModalProvider } from '@/components/CreateFeedModalContext.jsx';

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
        {/* 글 작성 창 상태를 모든 페이지에서 쓸 수 있게 감싼다.
            children 자리에 (main), (auth) 레이아웃이 들어간다. */}
        <CreateFeedModalProvider>{children}</CreateFeedModalProvider>
      </body>
    </html>
  );
}