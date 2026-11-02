// ~/instagram-next/app/(main)/layout.js
// (main)은 주소에 붙지 않는 묶음. 홈(/)과 /[username]이 children으로 들어온다.
import Sidebar from '@/components/Sidebar.jsx';

// 피드·프로필 공통 레이아웃. 왼쪽 메뉴는 여기만 그린다. 로그인 화면에는 없다.
export default function MainLayout({ children }) {
  return (
    // 메뉴와 페이지는 형제라 fragment로 묶는다.
    <>
      <Sidebar />
      {/* 홈 피드, 프로필, 저장 페이지가 이 자리에 들어간다 */}
      {children}
    </>
  );
}
