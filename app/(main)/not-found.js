// ~/instagram-next/app/(main)/not-found.js
// (main) 안 페이지가 notFound()를 호출하면 이 문구가 대신 그려진다.
// 왼쪽 메뉴는 (main)/layout.js가 그리므로 여기서는 안내만 둔다.
import Sidebar from "@/components/Sidebar.jsx";
import styles from "@/components/StatusMessage.module.scss";

export default function NotFound() {
  return (
    <>
      <main className={styles.hashtagMain}>
        <p className={styles.emptyHint}>이런 주소는 없어요.</p>
      </main>
    </>
  );
}
