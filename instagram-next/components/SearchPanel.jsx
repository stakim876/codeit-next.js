// ~/instagram-next/components/SearchPanel.jsx
// 사이드바 옆 검색 패널. 입력한 단어로 사람을 찾아 프로필로 이동한다.
// 입력값, 검색 요청, 열림 상태는 브라우저에서만 바뀌므로 클라이언트 컴포넌트다.
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { FaTimes } from 'react-icons/fa';
import { useUiStore } from '@/stores/useUiStore.js';
import styles from './SearchPanel.module.scss';

// keyword로 /api/members/search를 호출해 사용자 목록을 받는다.
async function searchMembers(keyword) {
  const response = await fetch(`/api/members/search?keyword=${keyword}`);

  if (!response.ok) {
    throw new Error(`사람을 찾지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function SearchPanel() {
  // 스토어의 열림 여부와 닫기 함수. 검색 버튼이 이 값을 바꾼다.
  const isOpen = useUiStore((state) => state.isSearchOpen);
  const close = useUiStore((state) => state.closeSearch);
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  // 검색어가 있을 때만 요청한다. 같은 keyword면 받아 둔 결과를 다시 쓴다.
  const { data, isPending, error } = useQuery({
    queryKey: ['members', keyword],
    queryFn: () => searchMembers(keyword),
    enabled: keyword !== '',
  });

  // 패널을 닫고 그 사람 프로필 주소로 이동한다.
  const goToProfile = (username) => {
    close();
    router.push(`/${username}`);
  };

  let result;

  // 검색어 없음, 로딩, 오류, 결과 없음, 목록 순으로 그릴 내용을 고른다.
  if (keyword === '') {
    result = null;
  } else if (isPending) {
    result = Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className={styles.skeletonItem}>
        <div className={styles.skeletonAvatar} />
        <div>
          <div className={styles.skeletonUsername} />
          <div className={styles.skeletonName} />
        </div>
      </div>
    ));
  } else if (error) {
    result = <div className={styles.emptyState}>{error.message}</div>;
  } else if (data.length === 0) {
    result = <div className={styles.emptyState}>검색 결과 없음</div>;
  } else {
    result = data.map((member) => (
      <div
        key={member.username}
        className={styles.resultItem}
        onClick={() => goToProfile(member.username)}>
        <div className={styles.resultAvatar}>
          <Image
            src={member.profileImage}
            alt={member.username}
            width={44}
            height={44}
          />
        </div>
        <div className={styles.resultInfo}>
          <span className={styles.resultUsername}>{member.username}</span>
          <span className={styles.resultName}>{member.name}</span>
        </div>
      </div>
    ));
  }

  return (
    <div className={`${styles.SearchPanel} ${isOpen ? styles.open : ''}`}>
      {/* isOpen이면 open 클래스가 붙어 패널이 열린다 */}
      <div className={styles.header}>
        <h2>검색</h2>
    </div> 

    <div className={styles.searchInputContainer}>
      <input 
        type='text'
        className={styles.searchInput}
        placeholder='검색'
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)} 
      />
      {/* 검색어가 있을 때만 지우는 버튼을 보여 준다 */}
      {keyword && (
        <button 
          type='button'
          className={styles.clearButton}
          onClick={() => setKeyword('')}>
          <FaTimes size={8} />  
        </button>
      )}    
    </div> 

    <hr className={styles.divider} />

    <div className={styles.content}>{result}</div>
 </div>
  );
}  