import styles from './FeedItem.module.scss';
import { FaEllipsis } from 'react-icons/fa6';

// 작성자 프로필, 이름, 더보기 버튼을 그림
const FeedItemHeader = ({
  username,
  profileImage = 'https://picsum.photos/seed/default/40/40',
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.userInfo}>
        {/* 프로필 사진. 누르면 프로필로 이동 */}
        <a href={`/${username}`} className={styles.profileLink}>
          <div className={styles.profileImage}>
            <img src={profileImage} alt={`${username}의 프로필`} />
          </div>
        </a>
        <div className={styles.userDetails}>
          {/* 작성자 이름. 누르면 프로필로 이동 */}
          <a href={`/${username}`} className={styles.username}>
            {username}
          </a>
        </div>
      </div>
      {/* 더보기 */}
      <button type="button" className={styles.optionsButton}>
        <FaEllipsis />
      </button>
    </header>
  );
};

export default FeedItemHeader;
