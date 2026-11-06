// ~/instagram-next/components/FeedList.jsx
// 서버에서 글 목록을 읽어 글마다 FeedItem을 그린다.
import { connection } from "next/server";
import styles from "./FeedList.module.scss";
import FeedItem from "./FeedItem.jsx";
import { getPosts } from "@/data/posts.js";

const FeedList = async () => {
  // 글 시각이 지금 기준이라, 빌드할 때 굳히지 않고 요청 뒤에 그린다.
  await connection();
  // getPosts가 캐시와 2초 대기를 담당한다.
  const posts = await getPosts();

  // 이 줄을 켜면 글 목록 대신 error.js가 나온다. 지금은 목록이 그려지게 꺼 둔다.
  // throw new Error('게시물 목록을 받아 오지 못했어요');

  return (
    <div className={styles.feedList}>
      {/* key는 글을 구분하는 id. isFirst는 첫 글만 true라 그 사진만 바로 불러온다. */}
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
          liked={post.liked}
          commentCount={post.commentCount}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
};

export default FeedList;
