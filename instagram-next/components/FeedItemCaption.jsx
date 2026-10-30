// ~/instagram-next/components/FeedItemCaption.jsx
import styles from './FeedItem.module.scss';
import { formatDate } from '../utils/formatDate.js';

// 게시글 본문과 작성 시간을 그림
const FeedItemCaption = ({ content, createdAt }) => {
  return (
    <>
     {/* 본문 */}
     <span className={styles.caption}>{content}</span>
     {/* formatDate가 ISO 시각을 「10월 15일」로 바꿔 그림 */}
     <div className={styles.time}>{formatDate(createdAt)}</div>
    </> 
  ); 
};

export default FeedItemCaption;