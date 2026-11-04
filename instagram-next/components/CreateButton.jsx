// ~/instagram-next/components/CreateButton.jsx
// 사이드바의 만들기 버튼. 누르면 글 작성 창을 연다.
// 창 상태를 읽으므로 클라이언트 컴포넌트여야 한다.
'use client';

import { FaRegSquarePlus } from 'react-icons/fa6';
import { useOpenCreateFeedModal } from './CreateFeedModalContext.jsx';
import styles from './Sidebar.module.scss';

export default function CreateButton() {
  // 레이아웃의 Provider가 넣어 둔 열기 함수.
  const open = useOpenCreateFeedModal();

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