// ~/instagram-next/app/(main)/[username]/saved/page.js
// /[username]/saved. 그 사용자가 저장한 글. 아직 글이 없으면 안내만 그린다.
import styles from '@/components/StatusMessage.module.scss';
import { profiles } from '@/data/profiles.js';

// params를 기다려야 해서 즉시 이동 검사에서 이 페이지를 뺀다.
export const instant = false;

export default async function SavedPage({ params }) {
  // params는 Promise. 주소의 [username] 칸을 꺼낸다.
  const { username } = await params;
  const profile = profiles.find((item) => item.username === username);

  // 없는 아이디면 저장 목록 대신 안내만 그린다.
  if (profile === undefined) {
    return <p className={styles.errorText}>{username} 님의 프로필이 없어요.</p>;
  }

  return (
    <main className={styles.hashtagMain}>
      <p className={styles.emptyHint}>
        {profile.username} 님이 저장한 게시물이 아직 없어요.
      </p>
    </main>
  );
}