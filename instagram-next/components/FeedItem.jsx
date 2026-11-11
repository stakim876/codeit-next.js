// ~/instagram-next/components/FeedItem.jsx
// 피드의 글 카드 하나. 위부터 작성자, 사진, 좋아요, 본문, 댓글 순이다.
import styles from './FeedItem.module.scss';
import carousel from './Carousel.module.scss';
import FeedItemHeader from './FeedItemHeader.jsx';
import FeedItemActions from './FeedItemActions.jsx';
import FeedItemContent from './FeedItemContent.jsx';
import FeedItemComments from './FeedItemComments.jsx';
import CommentForm from './CommentForm.jsx';
import CommentArea from './CommentArea.jsx';
import Image from 'next/image';
import Carousel from './Carousel.jsx';
import { useLikePost } from '@/hooks/useLikePost.js';

const FeedItem = ({
  postId,
  username,
  profileImage,
  imageUrls,
  postAlt,
  content,
  createdAt,
  likeCount,
  liked,
  commentCount,
  isFirst,
}) => {
  // mutate가 좋아요 요청을 보낸다. isPending이면 그 요청이 아직 끝나지 않았다.
  const { mutate, isPending } = useLikePost();

  // 사진을 두 번 누르는 것은 «누르기» 만 한다 — 이미 눌렀거나 보내는 중이면 보내지 않는다.
  const likeByDoubleClick = () => {
    if (liked || isPending) return;
    mutate({ postId, liked: true });
  };

  return (
    <article className={styles.post}>
      {/* 작성자 사진과 이름 */}
      <FeedItemHeader
        postId={postId}
        username={username}
        profileImage={profileImage}
      />

      {/* 사진이 여러 장이면 Carousel이 넘긴다. 두 번 누르면 좋아요만 보낸다.
          isFirst는 첫 글의 첫 장만 바로 받게 하려고 넘긴다. */}
      <div className={styles.imageContainer}>
        <Carousel
          imageUrls={imageUrls}
          alt={postAlt}
          isFirst={isFirst}
          onImageDoubleClick={likeByDoubleClick}
        />
      </div>

      {/* 하트, 댓글, 공유, 저장. 좋아요 수와 이미 눌렀는지를 받는다. */}
      <FeedItemActions
        postId={postId}
        likeCount={likeCount}
        liked={liked}
      />

      {/* 이름, 본문, 올린 시각 */}
      <div className={styles.content}>
        <FeedItemContent
          username={username}
          content={content}
          createdAt={createdAt}
        />
      </div>

      {/* 댓글 수와 입력 칸. CommentArea가 둘을 한 영역으로 묶는다. */}
      <CommentArea>
        <FeedItemComments commentCount={commentCount} />
        <CommentForm postId={postId} />
      </CommentArea>
    </article>
  );
};;

export default FeedItem;