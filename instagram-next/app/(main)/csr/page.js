// ~/instagram-next/app/(main)/csr/page.js
// /csr. 글 목록을 브라우저에서 받아 그리는 화면이다.
import page from '@/components/FeedPage.module.scss';
import FeedListClient from '@/components/FeedListClient.jsx';

export default function CsrFeedPage() {
  return (
    <main className={page.mainContent}>
      {/* 홈의 FeedList와 달리, 이 목록은 브라우저에서 /api/posts를 읽어 그린다. */}
      <FeedListClient />
    </main>    
  );  
}