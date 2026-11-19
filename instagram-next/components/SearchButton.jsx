// ~/instagram-next/components/SearchButton.jsx
// 사이드바의 검색 버튼. 누르면 검색 패널을 열거나 닫는다.
// 스토어의 열림 상태를 바꾸므로 클라이언트 컴포넌트여야 한다.
'use client';

import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useUiStore } from '@/stores/useUiStore.js';
import styles from './Sidebar.module.scss';

export default function SearchButton() {
  // 렌더 확인용. 주석을 풀면 이 버튼이 다시 그려질 때마다 콘솔에 찍힌다.
  // console.log('[render] SearchButton');
  // 스토어에서 toggleSearch만 꺼낸다. 이 함수가 검색 열림 여부를 뒤집는다.
  const toggle = useUiStore((state) => state.toggleSearch);
  
  return (
    <button 
      type='button'
      className={styles.menuItem}
      onClick={toggle}>
      <FaMagnifyingGlass size={24} />
      {/* 칸은 menuItem, 글자는 menuText. 홈·만들기와 같은 글자 클래스다. */}
      <span className={styles.menuText}>검색</span>  
      </button>
  );
}