// ~/instagram-next/components/FeedItemActions.jsx
// 게시글 아래의 하트, 댓글, 공유, 저장. 하트를 누르면 서버에서 좋아요를 바꾼다.
// 클릭으로 화면이 바뀌므로 클라이언트 컴포넌트여야 한다.
"use client";

import { useTransition } from "react";
import {
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from "react-icons/fa6";
import styles from "./FeedItem.module.scss";
import { likePost, unlikePost } from "@/app/actions.js";

const FeedItemActions = ({ postId, likeCount, liked }) => {
  // isPending은 서버 함수가 끝나는 동안 true. 그때 하트 버튼을 잠근다.
  const [isPending, startTransition] = useTransition();

  // 이미 좋아요면 해제하고, 아니면 추가한다. 서버 함수는 startTransition 안에서 부른다.
  const handleLike = () => {
    startTransition(async () => {
      if (liked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
    });
  };

  return (
    <div className={styles.actions}>
      <div className={styles.actionButtons}>
        <div className={styles.leftButtons}>
          {/* 좋아요. liked면 채워진 하트. 서버 작업 중에는 버튼을 막는다. */}
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleLike}
            disabled={isPending}
            aria-busy={isPending}
          >
            {liked ? <FaHeart className={styles.liked} /> : <FaRegHeart />}
          </button>
          {/* 댓글 */}
          <button type="button" className={styles.actionButton}>
            <FaRegComment />
          </button>
          {/* 공유 */}
          <button type="button" className={styles.actionButton}>
            <FaRegPaperPlane />
          </button>
        </div>
        {/* 저장 */}
        <button type="button" className={styles.actionButton}>
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
