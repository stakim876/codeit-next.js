// ~/instagram-next/components/Sidebar.jsx
import Link from 'next/link';
import { FaHouse } from 'react-icons/fa6';
import InstagramLogo from './InstagramLogo.jsx';
import NavLink from './NavLink.jsx';
import styles from './Sidebar.module.scss';

// 왼쪽 고정 메뉴. 홈과 프로필로 이동
function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logoContainer}>
        {/* 로고를 누르면 홈으로 */}
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

        {/* 프로필은 /seungtae 페이지로 이동 */}
        <NavLink
          href='/seungtae'
          className={styles.menuItem}>
          <div className={styles.profileImage}>
            <img
              src='/profiles/seungtae-small.jpg'
              alt='프로필'
            />
          </div>
          <span className={styles.menuText}>프로필</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Sidebar;
