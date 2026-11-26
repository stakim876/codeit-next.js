// ~/instagram-next/components/CommentArea.jsx
import styles from "./FeedItem.module.scss";
// 댓글 영역을 감쌈. FeedItem이 넣은 댓글 수·입력 폼이 children으로 이 자리에 그려짐
const CommentArea = ({ children }) => {
  return <div className={styles.postComments}>{children}</div>;  
};

export default CommentArea;