/*
  복습: 캐시의 이름과 아이디만 제목으로 그리기
  핵심: isPending은 프로필을 한 번도 못 받은 상태다. 그때는 … 만 보여주고, 객체가 오면 name과 username을 쓴다.
  이유: 버튼이 팔로우를 바꿔도 이름은 같은 캐시에 있다. 다시 받는 동안 이름을 숨기지 않으면 제목이 깜빡이지 않는다. 이 컴포넌트는 isFetching을 보지 않는다.
  실행: 첫 1초는 …, 이후엔 김민지 (@minji)다. 팔로우 성공 뒤 재요청 중에도 이 글자는 이전 data로 유지된다.
  활용: 갱신과 무관하게 유지되는 제목 필드에 쓴다.
*/

// ~/next-lab/app/p3-14/homework2/ProfileName.jsx
"use client";

import { useProfile } from "./useProfile.js";

export default function ProfileName() {
  const {data, isPending } = useProfile(); // 버튼과 같은 ['profile'] 캐시

  if (isPending) {
    return <h2 className="text-xl font-semibold">…</h2>; // 아직 한 번도 못 받음
  }

  return (
    <h2 className="text-xl font-semibold">
      {/* 캐시의 이름과 아이디. 다시 받는 중에도 이 글자는 유지 */}
      {data.name} (@{data.username})
    </h2>
  );
}