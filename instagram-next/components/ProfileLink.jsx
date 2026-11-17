/*
  복습: 사이드바 프로필을 로그인한 사람 주소로 보내기
  핵심: useMe의 username으로 /아이디 주소를 만든다. 사진이 없으면 /default-profile.svg를 쓴다.
  이유: 사이드바에 아이디를 고정하면 로그인한 사람이 바뀌어도 같은 프로필로 간다.
  실행: me가 있으면 /username, 없으면 /다. 사진은 me.profileImage가 있으면 그것을 쓴다.
  활용: 메뉴의 내 프로필이 지금 로그인한 사람을 따라갈 때 쓴다.
*/

// ~/instagram-next/components/ProfileLink.jsx
'use client';

import Image from 'next/image';
import NavLink from './NavLink.jsx';
import styles from './Sidebar.module.scss';
import { useMe } from '@/hooks/useMe.js';

// 사이드바의 «프로필» ㅡ 로그인한 사람의 프로필로 간다. 
export default function ProfileLink() {
  const { data: me } = useMe();
  
  return (
    <NavLink 
      href={me ? `/${me.username}` : '/'}
      className={styles.menuItem}>
      <div className={styles.profileImage}>
        <Image 
          // 프로필 사진이 없는 사람은 기본 이미지를 보여 준다.
          src={me?.profileImage ?? '/default-profile.svg'}
          alt='프로필'
          width={40}
          height={40}
        />  
        </div>
        <span className={styles.menuItem}>프로필</span>  
      </NavLink>
  );
}