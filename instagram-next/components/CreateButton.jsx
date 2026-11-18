/*
  복습: 사이드바 만들기로 글 작성 창 열기
  핵심: useUiStore의 openCreateFeed만 고른다. 버튼을 누르면 그 함수를 부른다.
  이유: 창을 여기서 직접 그리면 사이드바가 모달 상태를 가지게 된다. 열림은 스토어가 맡고, 붙이는 일은 레이아웃이 맡는다.
  실행: 만들기를 누르면 openCreateFeed가 isCreateFeedOpen을 true로 바꾼다. CreateFeedModalRoot가 그 값을 보고 창을 붙인다.
  활용: 메뉴 버튼이 스토어만 바꾸고, 창은 다른 컴포넌트가 그릴 때 쓴다.
*/

// ~/instagram-next/components/CreateButton.jsx
// 사이드바의 만들기 버튼. 누르면 글 작성 창을 연다.
// 창 상태를 읽으므로 클라이언트 컴포넌트여야 한다.
'use client';

import { FaRegSquarePlus } from 'react-icons/fa6';
import { useUiStore } from '@/stores/useUiStore.js';
import styles from './Sidebar.module.scss';

export default function CreateButton() {
  // 스토어의 열기 함수. 만들기를 누르면 글 작성 창이 열린다.
  const open = useUiStore((state) => state.openCreateFeed);

  return (
    <button
      type='button'
      className={styles.menuItem}
      onClick={open}>
      <FaRegSquarePlus size={24} />
      <span className={styles.menuText}>만들기</span>
    </button>    
  );
}