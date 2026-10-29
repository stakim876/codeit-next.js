// ~/instagram-next/app/page.js
import page from '@/components/FeedPage.module.scss';
import styles from '@/components/FeedList.module.scss';
import FeedItem from '@/components/FeedItem.jsx';
import { posts } from '@/data/posts.js';

// / 경로 페이지. layout의 children 자리에 렌더됨
export default function Home() {
  return (
    <main className={page.mainContent}>
      <div className={styles.feedList}>
        {/* posts를 돌면서 게시글 하나씩 그림 */}
        {posts.map((post) => (
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
          />    
        ))}   
    </div>
  </main>
  );  
}