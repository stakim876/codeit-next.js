// ~/instagram-next/components/FeedSkeleton.jsx
import styles from './FeedList.module.scss';

// 글이 도착하기 전, 게시글 모양의 빈 칸을 그린다. 내용은 없고 자리만 있다.
const FeedSkeleton = () => (
  <div className={styles.skeletonPost}>
    {/* 프로필 사진과 이름 자리 */}
    <div className={styles.skeletonHeader}>
      <div className={styles.skeletonAvatar} />
      <div className={styles.skeletonUsername} />
    </div>
    {/* 게시글 사진 자리 */}
    <div className={styles.skeletonImage} />
    <div className={styles.skeletonFooter}>
      {/* 좋아요, 댓글, 공유 아이콘 자리 */}
      <div className={styles.skeletonIconGroup}>
        <div className={styles.skeletonIcon} />
        <div className={styles.skeletonIcon} />
        <div className={styles.skeletonIcon} />
      </div>
      {/* 본문 두 줄 자리. 아래 줄은 더 짧다 */}
      <div className={styles.skeletonTextLine} />
      <div className={styles.skeletonTextLineShort} />
    </div>
  </div>
);

export default FeedSkeleton;
