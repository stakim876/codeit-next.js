// ~/instagram-next/components/FeedItemCaption.jsx
import styles from './FeedItem.module.scss';
import { timeAgo } from '../utils/timeAgo.js';

// 게시글 본문과 작성 시간을 그림
const FeedItemCaption = ({ content, createdAt }) => {
  return (
    <>
     {/* 본문 */}
     <span className={styles.caption}>{content}</span>
     {/* timeAgo가 ISO 시각을 「12분 전」으로 바꿔 그림 */}
     <div className={styles.time}>{timeAgo(createdAt)}</div>
    </> 
  ); 
};

export default FeedItemCaption;