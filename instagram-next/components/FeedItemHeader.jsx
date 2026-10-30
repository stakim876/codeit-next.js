// ~/instagram-next/components/FeedItemHeader.jsx
import Link from 'next/link';
import styles from './FeedItem.module.scss';
import { FaEllipsis } from 'react-icons/fa6';

// 작성자 프로필, 이름, 더보기 버튼을 그림.
// profileImage가 없으면 두 번째 인자 기본 사진을 씀.
const FeedItemHeader = ({
  username,
  profileImage = 'https://picsum.photos/seed/default/40/40',
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.userInfo}>
        {/* `/${username}` → /seungtae 같은 프로필 주소 */}
        <Link
          href={`/${username}`}
          className={styles.profileLink}> 
          <div className={styles.profileImage}>
            <img
              src={profileImage}
              alt={`${username}의 프로필`}
            />
          </div>
        </Link>
      <div className={styles.userDetailes}>
        {/* 이름도 같은 프로필 주소로 이동 */}
        <Link
          href={`/${username}`}
          className={styles.username}>
          {username}
        </Link>
      </div>
    </div>  
    {/* 더보기 */}
    <button className={styles.optionsButton}>
      <FaEllipsis />
    </button>    
  </header>
  );
};

export default FeedItemHeader;