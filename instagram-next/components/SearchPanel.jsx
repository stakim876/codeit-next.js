/*
  복습: 사이드바 검색으로 사람을 찾아 프로필로 이동하기
  핵심: 검색어가 있을 때만 쿼리를 돌리고, 결과 배열의 한 줄을 누르면 패널을 닫고 그 아이디 주소로 간다.
  이유: 열림은 useUiStore가 맡고, 검색 요청은 이 패널이 맡는다. 빈 검색어에는 요청을 보내지 않는다.
  실행: queryKey는 ['members', keyword]다. queryFn은 memberApi.search(keyword)를 부른다. 기다리는 동안은 뼈대 다섯 줄, 오류는 error.message, 빈 배열은 검색 결과 없음이다. 결과는 data.length와 data.map으로 그린다.
  활용: 회원 검색이 배열로 풀려 오고, 고른 사람 프로필로 바로 보낼 때 쓴다.
*/

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
import { memberApi } from '@/services/api.js';

export default function SearchPanel() {
  // 스토어의 열림 여부와 닫기 함수. 검색 버튼이 이 값을 바꾼다.
  const isOpen = useUiStore((state) => state.isSearchOpen);
  const close = useUiStore((state) => state.closeSearch);
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  // 검색어가 있을 때만 요청한다. 같은 keyword면 받아 둔 결과를 다시 쓴다.
  const { data, isPending, error } = useQuery({
    queryKey: ['members', keyword],
    // 사람 검색. memberApi는 services/api.js에 있다.
    queryFn: () => memberApi.search(keyword),
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

  // scss의 .searchPanel과 이름이 같아야 위치와 열림 이동이 붙는다.
  return (
    <div className={`${styles.searchPanel} ${isOpen ? styles.open : ''}`}>
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