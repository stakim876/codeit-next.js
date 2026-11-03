// ~/instagram-next/components/FeedListClient.jsx
'use client';

import { useEffect, useState } from 'react';
import styles from './FeedList.module.scss';
import FeedItem from './FeedItem.jsx';

// 브라우저에서 /api/posts를 받아 글마다 FeedItem을 그린다.
export default function FeedListClient() {
  // 처음엔 빈 배열. setPosts가 호출되면 목록이 다시 그려진다.
  const [posts, setPosts] = useState([]);

  // 첫 화면이 그려진 뒤 한 번만 글을 가져온다. []라 다시 실행되지 않는다.
  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    loadPosts();
  }, []);

  return (
    <div className={styles.feedList}>
      {/* 받아 온 posts를 한 바퀴 돌며 글마다 FeedItem 하나를 그림.
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
}