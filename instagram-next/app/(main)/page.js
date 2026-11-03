// ~/instagram-next/app/(main)/page.js
// / 경로. (main) layout의 children 자리에 피드가 그려진다.
import { Suspense } from 'react';
import page from '@/components/FeedPage.module.scss';
import styles from '@/components/FeedList.module.scss';
import FeedList from '@/components/FeedList.jsx';
import FeedSkeleton from '@/components/FeedSkeleton.jsx';

export default function Home() {
  return (
    <main className={page.mainContent}>
      {/* FeedList는 요청을 기다린 뒤에 그린다.
          그 전에는 게시글 모양의 빈 칸 두 개를 보여 준다. */}
      <Suspense
        fallback={
          <div className={styles.loader}>
            <FeedSkeleton />
            <FeedSkeleton />
          </div>
        }>
        <FeedList />
      </Suspense>
    </main>
  );
}