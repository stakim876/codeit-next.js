// ~/instagram-next/app/not-found.js
// 어떤 페이지에도 안 맞는 주소로 들어오면 이 화면이 그려진다.
// 루트 레이아웃에는 메뉴가 없어서, 없는 주소에서도 메뉴를 직접 그린다.
import Sidebar from '@/components/Sidebar.jsx';
import styles from '@/components/StatusMessage.module.scss';

export default function NotFound() {
  return (
    <>
      <Sidebar />
      <main className={styles.hashtagMain}>
        <p className={styles.emptyHint}>이런 주소는 없어요.</p>
      </main>
    </>
  );
}
