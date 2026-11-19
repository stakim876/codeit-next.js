/*
  복습: 응답 전에 캐시를 먼저 고치고, 끝나면 서버 값으로 맞추기
  핵심: 배치만 보면 practice1과 같다. 차이는 FollowButton이 onMutate에서 profile 캐시를 즉시 바꾸고, 성공하면 다시 invalidate한다는 점이다.
  이유: 1초를 기다린 뒤에야 숫자가 바뀌면 클릭이 늦은 느낌이다. 먼저 화면을 바꾸고, 서버 응답으로 확정한다.
  실행: /p3-15/practice2 에서 세 컴포넌트가 같은 profile 키를 구독한다. 버튼을 누르는 순간 숫자와 글자가 바뀌고, GET이 끝나면 서버 숫자로 다시 맞춘다.
  활용: 낙관적 갱신 뒤 서버 재조회로 확정하는 프로필 화면에 쓴다.
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
      <FollowButton /> {/* 누르면 캐시를 먼저 바꾸고, 성공하면 다시 받음 */}
    </main>
  );  
}