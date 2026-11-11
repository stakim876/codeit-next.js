// ~/instagram-next/components/FeedItemActions.jsx
// 글 카드의 하트, 보내기, 저장과 좋아요 수.
// 하트를 누르면 좋아요 요청을 보내므로 클라이언트 컴포넌트다.
'use client';

import {
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from 'react-icons/fa6';
import styles from './FeedItem.module.scss';
import { useLikePost } from '@/hooks/useLikePost.js';


const FeedItemActions = ({ postId, likeCount, liked }) => {

  // mutate가 좋아요를 바꾸라고 보낸다. isPending이면 그 요청이 아직 끝나지 않았다.
  const { mutate, isPending } = useLikePost();

  return (
    <div className={styles.actions}>
      <div className={styles.actionButtons}>
        <div className={styles.leftButtons}>
          {/* liked의 반대로 보낸다. 요청 중에는 버튼을 눌러도 다시 보내지 않는다. */}
          <button 
            type='button'
            className={styles.actionButton}
            onClick={() => mutate({ postId, liked: !liked })}
            disabled={isPending}
            aria-busy={isPending}>
            {/* 이미 눌렀으면 채운 하트, 아니면 빈 하트 */}
            {liked ? <FaHeart className={styles.liked} /> : <FaRegHeart />}  
          </button>
          <button 
            type='button'
            className={styles.actionButton}>
            <FaRegComment />  
            </button>
            <button
              type='button'
              className={styles.actionButton}>
              <FaRegPaperPlane />  
            </button>
        </div>
        <button
          type='button'
          className={styles.actionButton}>
          <FaRegBookmark />  
          </button>
      </div>
     {/* 천 단위로 끊어 좋아요 수를 보여 준다. */}
     <div className={styles.likes}>
      좋아요 <span>{likeCount.toLocaleString()}</span>개
     </div>
    </div>
  );
};

export default FeedItemActions;