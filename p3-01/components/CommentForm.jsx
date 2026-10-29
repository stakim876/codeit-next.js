// ~/instagram-next/components/CommentForm.jsx
import styles from './FeedItem.module.scss';

// 댓글을 입력하고 게시하는 폼
const CommentForm = () => {
  return (
    <form className={styles.commentForm}>
      {/* 댓글 내용을 적는 입력창 */}
      <input
        type='text'
        placeholder='댓글 달기...'
        className={styles.commentInput}
      />
      {/* 폼을 제출하는 버튼. disabled라 아직 게시할 수 없음 */}
      <button
        type='submit'
        className={styles.commentSubmit}
        disabled
      >
        게시
      </button>
    </form>
  );
};

export default CommentForm;
