/*
  복습: 사이드바 더 보기에서 로그아웃하기
  핵심: 더 보기를 누르면 메뉴가 열리고, 로그아웃은 authApi.logout이다. 성공하면 받아 둔 캐시를 비우고 로그인으로 간다.
  이유: 세션만 지우고 화면 캐시를 남기면 다음 화면이 이전 사람을 그대로 본다. 메뉴도 숨겨진 채 남지 않게 닫고 나서 보낸다.
  실행: 메뉴 밖을 누르면 닫힌다. 로그아웃을 누르면 메뉴를 닫고 POST /auth/logout을 보낸 뒤 queryClient.clear와 /login으로 간다.
  활용: 사이드바 맨 아래에서 로그인 세션과 피드 캐시를 함께 지울 때 쓴다.
*/

// ~/instagram-next/components/MoreButton.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaBars } from 'react-icons/fa6';
import styles from './Sidebar.module.scss';
import { authApi } from '@/services/api.js';

// 사이드바 맨 아래 «더 보기» — 누르면 메뉴가 열리고, 메뉴에서 로그아웃한다.
export default function MoreButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  // 메뉴 밖을 누르면 닫는다.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(`.${styles.moreMenu}`) &&
        !event.target.closest('#moreButton')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const { mutate: logout } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // 서버가 세션을 지웠으면 화면이 받아 둔 것도 모두 버린다 — «나는 누구»도, 게시물 목록도.
      queryClient.clear();
      router.replace('/login');
    },
  });

  return (
    <div style={{ position: 'relative' }}>
      <button
        type='button'
        id='moreButton'
        className={styles.menuItem}
        onClick={() => setIsOpen(!isOpen)}>
        <FaBars size={24} />
        <span className={styles.menuText}>더 보기</span>
      </button>

      {isOpen && (
        <div className={styles.moreMenu}>
          <button
            className={styles.menuItem}
            onClick={() => {
              // 이 메뉴도 숨겨진 채 남는다 — 닫고 나서 로그아웃한다.
              setIsOpen(false);
              logout();
            }}>
            <span>로그아웃</span>
          </button>
        </div>
      )}
    </div>
  );
}