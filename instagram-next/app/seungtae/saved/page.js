// ~/instagram-next/app/seungtae/saved/page.js
import styles from '@/components/StatusMessage.module.scss';
import { profile } from '../profile.js';

// /seungtae/saved 경로. 저장한 글이 없을 때 안내만 그림
export default function SavedPage() {
  return (
    <main className={styles.hashtagMain}>
      <p className={styles.emptyHint}>
        {/* profile.username을 문장 안에 끼워 넣음 */}
        {profile.username} 님이 저장한 게시물이 아직 없어요.
      </p>
    </main>
  );
}
