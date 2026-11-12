// ~/instagram-next/components/SearchButton.jsx
// 사이드바의 검색 버튼. 누르면 검색 패널을 열거나 닫는다.
// 스토어의 열림 상태를 바꾸므로 클라이언트 컴포넌트여야 한다.
'use client';

import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useUiStore } from '@/stores/useUiStore.js';
import styles from './Sidebar.module.scss';

export default function SearchButton() {
  console.log('[render] SearchButton');
  // 스토어에서 toggleSearch만 꺼낸다. 이 함수가 검색 열림 여부를 뒤집는다.
  const toggle = useUiStore((state) => state.toggleSearch);
  
  return (
    <button 
      type='button'
      className={styles.menuItem}
      onclick={toggle}>
      <FaMagnifyingGlass size={24} />
      <span className={styles.menuItem}>검색</span>  
      </button>
  );
}