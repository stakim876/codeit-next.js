// ~/instagram-next/components/FeedList.jsx
import { connection } from 'next/server';
import styles from './FeedList.module.scss';
import FeedItem from './FeedItem.jsx';
import { posts } from '@/data/posts.js';

// 서버에서 글 목록을 읽어 글마다 FeedItem을 그린다.
const FeedList = async () => {
  // 요청이 들어온 뒤에 그린다. 글 시간이 지금 기준이라 빌드할 때 굳으면 안 된다.
  await connection();
  // 이 줄을 켜면 글 목록 대신 error.js가 나온다. 지금은 목록이 그려지게 꺼 둔다.
  // throw new Error('게시물 목록을 받아 오지 못했어요');

  return (
    <div className={styles.feedList}>
      {/* posts를 한 바퀴 돌며 글마다 FeedItem 하나를 그림.
          key는 글을 구분하는 id. isFirst는 첫 글만 true라 그 사진만 바로 불러온다. */}
      {posts.map((post, index) => (
        <FeedItem
          key={post.id}
          postId={post.id}
          username={post.username}
          profileImage={post.profileImage}
          postImage={post.postImage}
          postAlt={post.postAlt}
          content={post.content}
          createdAt={post.createdAt}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
};

export default FeedList;
