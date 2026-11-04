// ~/instagram-next/components/FeedItemActions.jsx
'use client';

import { useEffect, useState } from 'react';
import {
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from 'react-icons/fa6';
import styles from './FeedItem.module.scss';

// 클릭으로 좋아요 수를 바꾸므로 이 파일은 브라우저에서 실행된다.
const FeedItemActions = ({ postId, likeCount }) => {
  // liked는 내가 눌렀는지, count는 화면에 보일 개수. 처음 개수는 부모가 넘긴 값.
  const [like, setLike] = useState({ liked: false, count: likeCount });

  // 서버에는 localStorage가 없다. 브라우저에 뜬 뒤에 이 글의 저장값을 읽는다.
  useEffect(() => {
    const saved = localStorage.getItem(`like-${postId}`);
    if (saved) {
      setLike(JSON.parse(saved));
    }
  }, [postId]);

  // 누르면 liked를 뒤집고 개수를 바꾼 뒤, 글 id로 localStorage에 남긴다.
  const handleLike = () => {
    const next = {
      ...like,
      liked: !like.liked,
      count: like.liked ? like.count - 1 : like.count + 1,
    };
    localStorage.setItem(`like-${postId}`, JSON.stringify(next));
    setLike(next);
  };

  return (
    <div className={styles.actions}>
      <div className={styles.actionButtons}>
        <div className={styles.leftButtons}>
          {/* 좋아요. liked면 채워진 하트 */}
          <button
            type='button'
            className={styles.actionButton}
            onClick={handleLike}>
            {like.liked ? <FaHeart className={styles.liked} /> : <FaRegHeart />}
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
        좋아요 <span>{like.count.toLocaleString()}</span>개
      </div>
    </div>
  );
};

export default FeedItemActions;
