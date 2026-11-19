/*
  복습: 이름, 팔로워 수, 버튼이 프로필 캐시 하나를 나누어 쓰기
  핵심: 세 컴포넌트 모두 useProfile의 queryKey profile을 본다. 버튼은 성공한 뒤에 그 키를 무효화해 이름과 숫자를 다시 받게 한다.
  이유: 팔로우 결과를 버튼만 알면 헤더 숫자는 옛 값이다. 서버 프로필을 다시 읽으면 이름 칸과 숫자가 같은 응답으로 맞춰진다.
  실행: /p3-15/practice1 에서 셋이 같이 마운트되어 프로필 GET은 한 번이다. 버튼을 누르면 PUT 또는 DELETE가 끝나고 invalidate 뒤 숫자와 버튼 글자가 서버 값으로 다시 그려진다.
  활용: 요약 헤더와 액션 버튼이 한 자원의 다른 필드를 그릴 때 쓴다.
*/

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
      <FollowButton /> {/* 성공하면 그 캐시를 비워서 위 둘을 다시 받음 */}
    </main>
  );  
}