// ~/instagram-next/app/(main)/page.js
// / 경로. (main) layout의 children 자리에 피드가 그려진다.
import page from '@/components/FeedPage.module.scss';
import FeedList from '@/components/FeedList.jsx';

export default function Home() {
  return (
    // mainContent가 피드 칸의 너비와 여백을 정한다.
    <main className={page.mainContent}>
      {/* FeedList가 서버에서 글 목록을 읽어 그린다 */}
      <FeedList />
    </main>
  );
}