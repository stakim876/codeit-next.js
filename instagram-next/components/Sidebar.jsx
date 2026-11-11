// ~/instagram-next/components/Sidebar.jsx
// (main) 화면의 왼쪽 메뉴. 로그인 화면에는 없다.
// 주소 표시와 만들기 창은 NavLink, CreateButton이 맡으므로 이 파일은 서버 컴포넌트다.
import Link from "next/link";
import Image from "next/image";
import { FaHouse } from "react-icons/fa6";
import InstagramLogo from "./InstagramLogo.jsx";
import NavLink from "./NavLink.jsx";
import CreateButton from "./CreateButton.jsx";
import styles from "./Sidebar.module.scss";

function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      {/* 로고를 누르면 홈(/)으로 rka */}
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <InstagramLogo />
        </Link>
      </div>

      <div className={styles.menuContainer}>
        {/* NavLink는 지금 주소와 href가 같으면 현재 메뉴로 표시함 */}
        <NavLink href="/" className={styles.menuItem}>
          <FaHouse size={24} />
          <span className={styles.menuText}>홈</span>
        </NavLink>

        {/* 누르면 글 작성 창을 열음 */}
        <CreateButton />

        {/* 내 프로필. 주소가 /seungtae일 때 현재 메뉴가 됨 */}
        <NavLink href="/seungtae" className={styles.menuItem}>
          <div className={styles.profileImage}>
            <Image
              src="/profiles/seungtae-small.jpg"
              alt="프로필"
              width={40}
              height={40}
            />
          </div>
          <span className={styles.menuText}>프로필</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Sidebar;
