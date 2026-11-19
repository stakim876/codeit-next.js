/*
  복습: 왼쪽 메뉴에 홈, 검색, 만들기, 프로필, 더 보기를 두기
  핵심: 이 파일은 배치만 한다. 프로필은 ProfileLink가, 로그아웃은 MoreButton이 맡는다.
  이유: 아이디와 사진을 여기 적으면 로그인한 사람이 바뀌어도 같은 메뉴가 남는다. 열림과 로그아웃은 각 버튼이 가진다.
  실행: 홈은 /다. 검색은 패널을 열고, 만들기는 글 창을 연다. 더 보기는 메뉴 아래에 둔다.
  활용: 여러 메뉴가 각자 상태를 갖고, 부모는 칸만 나눠 줄 때 쓴다.
*/

// ~/instagram-next/components/Sidebar.jsx
import Link from 'next/link';
import { FaHouse } from 'react-icons/fa6';
import InstagramLogo from './InstagramLogo.jsx';
import NavLink from './NavLink.jsx';
import CreateButton from './CreateButton.jsx';
import SearchButton from './SearchButton.jsx';
import SearchPanel from './SearchPanel.jsx';
import styles from './Sidebar.module.scss';
import SidebarNav from './SidebarNav.jsx';
import ProfileLink from './ProfileLink.jsx';
import MoreButton from './MoreButton.jsx';

function Sidebar() {

  // 렌더 확인용. 주석을 풀면 이 함수가 다시 실행될 때마다 콘솔에 찍힌다.
  // console.log('[render] Sidebar');

  return (
    <>
      <SidebarNav>
        <div className={styles.logoContainer}>
          <Link
            href='/'
            className={styles.logo}>
            <InstagramLogo />
          </Link>
        </div>

        <div className={styles.menuContainer}>
          <NavLink
            href='/'
            className={styles.menuItem}>
            <FaHouse size={24} />
            <span className={styles.menuText}>홈</span>
          </NavLink>

          <SearchButton />

          <CreateButton />

          <ProfileLink />
        </div>

        <div className={styles.bottomMenu}>
          <MoreButton />
        </div>
      </SidebarNav>

      <SearchPanel />
    </>
  );
}

export default Sidebar;