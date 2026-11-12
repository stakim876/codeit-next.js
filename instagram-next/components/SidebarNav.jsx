// ~/instagram-next/components/SidebarNav.jsx
// 왼쪽 메뉴를 감싼다. 검색이 열리면 메뉴를 아이콘만 남기고 접는다.
// 열림 상태를 읽으므로 클라이언트 컴포넌트여야 한다.
'use client';

import { useUiStore } from '@/stores/useUiStore.js';
import styles from './Sidebar.module.scss';

export default function SidebarNav({ children }) {
  console.log('[render] SidebarNav');
  // 검색 열림 여부와 닫기 함수. 검색 버튼이 이 값을 바꾼다.
  const isSearchOpen = useUiStore((state) => state.isSearchOpen);
  const closeSearch = useUiStore((state) => state.closeSearch);

  // 사이드바 안의 링크를 누르면 검색 패널을 닫는다.
  const closeOnLink = (event) => {
    if (event.target.closest('a')) {
      closeSearch();
    }
  };

  return (
    <>
      {/* 검색 중이면 collapsed를 붙여 글자를 숨기고 너비를 72px로 줄인다 */}
      <nav
        className={`${styles.sidebar} ${isSearchOpen ? styles.collapsed : ''}`}
        onClick={closeOnLink}>
        {children}
      </nav>

      {/* 검색 중이면 메뉴 뒤 화면을 덮는다. 그 빈 곳을 누르면 검색을 닫는다 */}
      {isSearchOpen && (
        <div
          className={styles.searchBackdrop}
          onClick={closeSearch}
        />
      )}
    </>
  );
}