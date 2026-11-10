// ~/next-lab/app/p3-14/homework2/page.js
import ProfileName from "./ProfileName.jsx";
import FollowerCount from "./FollowerCount.jsx";
import FollowButton from "./FollowButton.jsx";

export default function ProfilePage() {
  return (
    <main className="p-6">
      {/* 셋 다 같은 ['profile'] 캐시 */}
      <ProfileName />
      <FollowerCount />
      <FollowButton /> {/* 누르면 캐시를 먼저 바꾸고, 성공하면 다시 받음 */}
    </main>
  );  
}