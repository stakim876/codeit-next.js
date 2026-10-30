// ~/instagram-react/src/components/FeedItem.jsx
import styles from './FeedItem.module.scss';
import carousel from './Carousel.module.scss';
import FeedItemHeader from './FeedItemHeader.jsx';
import FeedItemActions from './FeedItemActions.jsx';
import FeedItemContent from './FeedItemContent.jsx';
import FeedItemComments from './FeedItemComments.jsx';
import CommentForm from './CommentForm.jsx';
import CommentArea from './CommentArea.jsx';

// page.js가 넘긴 props를 받아 헤더, 사진, 좋아요, 본문, 댓글에 필요한 값만 다시 넘김
const FeedItem = ({
  postId,
  username,
  profileImage,
  postImage,
  postAlt,
  content,
  createdAt,
  likeCount,
  commentCount,  
}) => {
  return (
    <article className={styles.post}>
      {/* 작성자 프로필과 이름 */}
      <FeedItemHeader
        postId={postId}
        username={username}
        profileImage={profileImage}
    />

    <div className={styles.imageContainer}>
      <div className={carousel.carouselSlide}>
        {/* 게시글 사진 */}
        <img
          src={postImage}
          alt={postAlt}
       />
     </div>
    </div>

   {/* 좋아요 */}
   <FeedItemActions
     postId={postId}
     likeCount={likeCount}
    />

    <div className={styles.content}>
      {/* 본문과 작성 시간 */}
      <FeedItemContent
        username={username}
        content={content}
        createdAt={createdAt}
      />    
    </div>

    {/* 댓글 수와 댓글 입력 */}
    <CommentArea>
      <FeedItemComments commentCount={commentCount} />
      <CommentForm postId={postId} />
     </CommentArea>
    </article>              
  );   
};

export default FeedItem;