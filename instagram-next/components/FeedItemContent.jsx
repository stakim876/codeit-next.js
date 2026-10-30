// ~/instagram-next/components/FeedItemContent.jsx
import Link from 'next/link';
import styles from './FeedItem.module.scss';
import FeedItemCaption from './FeedItemCaption.jsx';

// 작성자 이름과 본문, 작성 시간을 그림
const FeedItemContent = ({ username, content, createdAt }) => {
  return (
    <div className={styles.text}>
      {/* 작성자 이름. 누르면 프로필로 이동 */}
      <Link
        href={`/${username}`}
        className={styles.username}>
        {username}
      </Link>
      {/* 본문과 작성 시간 */}
      <FeedItemCaption
        content={content}
        createdAt={createdAt}
      />
    </div>        
  );
};

export default FeedItemContent;