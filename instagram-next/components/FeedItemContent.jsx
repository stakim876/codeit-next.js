// ~/instagram-next/components/FeedItemContent.jsx
import styles from './FeedItem.module.scss';
import FeedItemCaption from './FeedItemCaption.jsx';

// 작성자 이름과 본문, 작성 시간을 그림
const FeedItemContent = ({ username, content, createdAt }) => {
  return (
    <div className={styles.text}>
      {/* 작성자 이름. 누르면 프로필로 이동 */}
      <a 
        href={`/${username}`}
        className={styles.username}>
        {username}
      </a>
      {/* 본문과 작성 시간 */}
      <FeedItemCaption
        content={content}
        createdAt={createdAt}
      />
    </div>        
  );
};

export default FeedItemContent;