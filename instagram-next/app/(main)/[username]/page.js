// ~/instagram-next/app/(main)/[username]/page.js
// /[username] 경로. 예: /seungtae. 주소의 아이디로 프로필을 찾아 그린다.
import styles from '@/components/ProfilePage.module.scss';
import stateStyles from '@/components/StatusMessage.module.scss';
import ProfileImage from '@/components/ProfileImage.jsx';
import { profiles } from '@/data/profiles.js';

// params를 기다려야 해서 화면이 바로 바뀌지 않아도 된다. 즉시 이동 검사에서 이 페이지를 뺀다.
export const instant = false;

export default async function ProfilePage({ params }) {
  // params는 Promise. 주소의 [username] 칸을 꺼낸다.
  const { username } = await params;
  // 프로필 목록에서 그 아이디와 같은 항목을 찾는다.
  const profile = profiles.find((item) => item.username === username);

  // 없으면 안내만 그리고 끝낸다.
  if (profile === undefined) {
    return (
      <p className={stateStyles.errorText}>{username} 님의 프로필이 없어요.</p>
    );
  }

  return (
    <main className={styles.profileMain}>
      <header className={styles.profileHeader}>
        <ProfileImage
          imageUrl={profile.profileImage}
          username={profile.username}
        />

        <div className={styles.profileInfo}>
          <div className={styles.profileActions}>
            {/* 사용자 아이디 */}
            <h2 className={styles.username}>{profile.username}</h2>
          </div>

          <ul className={styles.profileStats}>
            <li>
              게시물{' '}
              <span className={styles.statsNumber}>{profile.postCount}</span>
            </li>
            <li>
              팔로워{' '}
              <span className={styles.statsNumber}>
                {profile.followerCount}
              </span>
            </li>
            <li>
              팔로우{' '}
              <span className={styles.statsNumber}>
                {profile.followingCount}
              </span>
            </li>
          </ul>

          <div className={styles.profileBio}>
            {/* 표시 이름 */}
            <span className={styles.fullName}>{profile.name}</span>
          </div>
        </div>
      </header>
    </main>
  );
}