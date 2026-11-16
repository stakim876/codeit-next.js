/*
  복습: 왼쪽 메뉴에 홈, 검색, 만들기, 내 프로필을 두기
  핵심: 이 파일은 배치만 한다. 검색 열림은 SearchButton과 SearchPanel이, 접힘은 SidebarNav가 맡는다.
  이유: 프로필 사진을 picsum으로 두면 사람마다 다른 그림이 나온다. 승태 메뉴는 저장해 둔 작은 사진을 쓴다.
  실행: 홈은 /, 프로필은 /seungtae다. 검색을 누르면 패널이 열리고, 만들기 버튼은 글 창을 연다.
  활용: 여러 메뉴가 각자 상태를 갖고, 부모는 칸만 나눠 줄 때 쓴다.
*/

// ~/instagram-next/components/Sidebar.jsx
import Link from 'next/link';
import Image from 'next/image';
import { FaHouse } from 'react-icons/fa6';
import InstagramLogo from './InstagramLogo.jsx';
import NavLink from './NavLink.jsx';
import CreateButton from './CreateButton.jsx';
import SearchButton from './SearchButton.jsx';
import SearchPanel from './SearchPanel.jsx';
import styles from './Sidebar.module.scss';
import SidebarNav from './SidebarNav.jsx';

function Sidebar() {

  console.log('[render] Sidebar');

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

          <NavLink
            href='/seungtae'
            className={styles.menuItem}>
            <div className={styles.profileImage}>
              <Image
                src='/profiles/seungtae-small.jpg'
                alt='프로필'
                width={40}
                height={40}
              />
            </div>
            <span className={styles.menuText}>프로필</span>
          </NavLink>
        </div>
      </SidebarNav>

      <SearchPanel />
    </>
  );
}

export default Sidebar;