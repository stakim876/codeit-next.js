// ~/instagram-next/app/(main)/[username]/loading.js
// /[username] 페이지가 데이터를 기다리는 동안 이 문구를 먼저 보여 준다.
import styles from '@/components/StatusMessage.module.scss';

export default function Loading() {
  return <p className={styles.loadingText}>불러오는 중이에요…</p>;
}
