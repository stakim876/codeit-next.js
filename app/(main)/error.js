// ~/instagram-next/app/(main)/error.js
// (main) 레이아웃이나 그 안 페이지가 실패하면 이 화면으로 바뀐다.
// error.js는 클라이언트 컴포넌트여야 한다.
'use client';

import { useEffect } from 'react';
import styles from '@/components/StatusMessage.module.scss';

export default function ErrorPage({ error }) {
  // error는 던져진 에러 객체. 안내 문구만 화면에 두고, 원인은 콘솔에 남긴다.
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.hashtagMain}>
      <p className={styles.errorText}>
        화면을 불러오지 못했습니다. 잠시 뒤에 새로고침해주세요.
      </p>
    </main>
  );
}
