// ~/instagrem-next/app/page.js
import page from '@/components/FeedPage.module.scss';
import styles from '@/components/FeedList.module.scss';
import FeedItem from '@/components/FeedItem.jsx';
import { posts } from '@/data/posts.js'; // 그릴 게시글 목록

// / 경로 페이지. layout의 children 자리에 렌더됨
export default function Home() {
  return (
    <main className={page.mainContent}>
      <div className={styles.feedList}>
        {/* posts를 한 바퀴 돌며 글마다 FeedItem 하나를 그림.
            key는 React가 글을 구분하는 id, 나머지 속성은 post 필드를 넘김 */}
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