// ~/instagram-next/app/(main)/[username]/saved/page.js
// /[username]/saved. 예: /seungtae/saved. 그 아이디의 저장 목록 화면이다.
import styles from "@/components/StatusMessage.module.scss";
import { profiles } from "@/data/profiles.js";
import { notFound } from "next/navigation";

// params를 기다리므로 즉시 이동 검사에서는 이 페이지를 뺀다.
export const instant = false;

export default async function SavedPage({ params }) {
  // params는 Promise. 주소의 [username] 칸을 꺼낸다.
  const { username } = await params;
  const profile = profiles.find((item) => item.username === username);

  // 없는 아이디면 (main)/not-found.js를 그린다.
  if (profile === undefined) {
    notFound();
  }
  return (
    <main className={styles.hashtagMain}>
      <p className={styles.emptyHint}>
        {profile.username} 님이 저장한 게시물이 아직 없어요.
      </p>
    </main>
  );
}
