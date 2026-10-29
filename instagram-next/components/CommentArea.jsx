// ~/instagram-next/components/CommentArea.jsx
import styles from "./FeedItem.module.scss";
// 댓글 영역을 감싸고, children 자리에 댓글 내용을 그림
const CommentArea = ({ children }) => {
  return <div className={styles.postComments}>{children}</div>;  
};

export default CommentArea;