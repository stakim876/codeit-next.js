// ~/instagram-next/app/layout.js
import '@/styles/global.scss';

export const metadata = {
  title: 'Instagram',
  description: 'Instagram feed',  
};

// 앱이 그려지려면 이 함수가 기본으로 export 되어야 함
export default function RootLayout({ children }) {
  return (
    // 루트 레이아웃은 html과 body로 페이지를 감쌈
    <html lang='ko'>
      {/* children 자리에 각 페이지가 들어감 */}
      <body>{children}</body>
   </html>     
  );      
}