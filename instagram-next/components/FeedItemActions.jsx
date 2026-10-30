// ~/instagram-next/components/FeedItemActions.jsx
import {
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from 'react-icons/fa6';
import styles from './FeedItem.module.scss';

// 좋아요, 댓글, 공유, 저장 버튼과 좋아요 수를 그림
const FeedItemActions = ({ likeCount }) => {
 return (
  <div className={styles.actions}>
    <div className={styles.actionButtons}>
      <div className={styles.leftButtons}>
       {/* 좋아요 */}
       <button
         type='button'
         className={styles.actionButton}>
         <FaRegHeart />
        </button>
       {/* 댓글 */}
       <button
         type='button'
         className={styles.actionButton}>
         <FaRegComment />
       </button>
       {/* 공유 */}
       <button
         type='button'
         className={styles.actionButton}>
         <FaRegPaperPlane />
       </button>
      </div>
      {/* 저장 */}
      <button
        type='button'
        className={styles.actionButton}>
        <FaRegBookmark />
       </button>
      </div>
     {/* toLocaleString()이 1300을 1,300처럼 천 단위로 끊음 */}
     <div className={styles.likes}>
       좋아요 <span>{likeCount.toLocaleString()}</span>개
    </div>
   </div>     
 );   
};

export default FeedItemActions;