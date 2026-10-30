// ~/instagram-react/src/components/FeedItemComments.jsx
import styles from './FeedItem.module.scss';
// 댓글 개수를 보여주고, 누르면 댓글 목록을 여는 버튼
const FeedItemComments = ({ commentCount }) => {
  return (
    <div className={styles.commentSection}>
      {/* toLocaleString()이 댓글 수를 천 단위로 보여줌 */}
      <button
        type='button'
        className={styles.viewCommentsButton}>
        댓글 {commentCount.toLocaleString()}개 보기
      </button>
    </div>
  );
};

export default FeedItemComments;