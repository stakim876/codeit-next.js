// ~/instagram-next/app/(main)/[username]/page.js
// /seungtae 처럼 주소의 사용자 이름으로 프로필을 그린다.
import { notFound, redirect } from 'next/navigation';
import styles from '@/components/ProfilePage.module.scss';
import ProfileImage from '@/components/ProfileImage.jsx';
import { profiles, getProfile } from '@/data/profiles.js';

// params를 기다리므로 즉시 이동 검사에서는 이 페이지를 뺀다.
export const instant = false;

// 빌드할 때 미리 만들 사용자 이름. profiles의 username이 [username]이 된다.
export function generateStaticParams() {
  return profiles.map((profile) => ({ username: profile.username }));
}

// 탭 제목과 설명. 루트 layout의 template에서 %s 자리에 title이 들어간다.
export async function generateMetadata({ params }) {
  const { username } = await params;
  const profile = await getProfile(username);

  // 없는 사용자는 제목을 비워 둔다. 화면은 아래 notFound()가 바꾼다.
  if (profile === undefined) {
    return {};
  }

  return {
    title: `${profile.name}(@${profile.username})`,
    description: `게시물 ${profile.postCount}개, 팔로워 ${profile.followerCount}명, 팔로우 ${profile.followingCount}명`,
  };
}

export default async function ProfilePage({ params }) {
  // params는 Promise. [username] 칸의 글자를 꺼낸다.
  const { username } = await params;

  // 대문자가 섞이면 소문자 주소로 보낸다. /SeungTae → /seungtae
  if (username !== username.toLowerCase()) {
    redirect(`/${username.toLowerCase()}`);
  }

  const profile = await getProfile(username);

  // 목록에 없는 사용자면 not-found.js를 그린다.
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
