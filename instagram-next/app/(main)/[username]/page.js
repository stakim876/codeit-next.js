// ~/instagram-next/app/(main)/[username]/page.js
// /[username] 경로. 예: /seungtae. 주소의 아이디로 프로필과 탭 제목을 만든다.
import { notFound } from 'next/navigation';
import styles from '@/components/ProfilePage.module.scss';
import ProfileImage from '@/components/ProfileImage.jsx';
import { profiles } from '@/data/profiles.js';

// params를 기다리므로 즉시 이동 검사에서는 이 페이지를 뺀다.
export const instant = false;

// 아이디로 프로필 하나를 찾는다. 화면과 탭 제목이 같은 함수를 쓴다.
function findProfile(username) {
  return profiles.find((item) => item.username === username);
}

// 빌드 때 만들 프로필 주소. profiles의 username이 [username] 칸이 된다.
export function generateStaticParams() {
  return profiles.map((profile) => ({ username: profile.username }));
}

// 브라우저 탭 제목과 설명. 페이지 본문과 따로 실행된다.
export async function generateMetadata({ params }) {
  // params는 Promise. 주소의 [username] 칸을 꺼낸다.
  const { username } = await params;
  const profile = findProfile(username);

  // 없는 아이디면 제목을 만들지 않는다. 본문은 notFound()로 넘어간다.
  if (profile === undefined) {
    return {};
  }

  return {
    title: `${profile.name}(@${profile.username})`,
    description: `게시물 ${profile.postCount}개, 팔로워 ${profile.followerCount}명, 팔로우 ${profile.followingCount}명`,
  };
}

export default async function ProfilePage({ params }) {
  const { username } = await params;
  const profile = findProfile(username);

  // 없으면 (main)/not-found.js를 그린다.
  if (profile === undefined) {
    notFound();
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
            <span className={styles.fullName}>{profile.name}</span>
          </div>
        </div>
      </header>
    </main>
  );
}