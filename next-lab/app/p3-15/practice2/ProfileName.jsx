/*
  복습: 낙관적 갱신 중에도 이름은 캐시에서 그대로 그리기
  핵심: onMutate가 profile 객체를 통째로 바꿔도 name과 username은 펼쳐서 유지된다. 이 컴포넌트는 그 필드를 읽는다.
  이유: 숫자만 바뀌는 갱신에서 제목까지 로딩으로 바꾸면 낙관적 갱신의 이점이 줄어든다.
  실행: isPending일 때만 … 다. 이후에는 김민지 (@minji)가 팔로우 요청 도중에도 남는다.
  활용: 낙관적으로 바뀌지 않는 필드를 같은 캐시에서 읽게 할 때 쓴다.
*/

// ~/next-lab/app/p3-14/homework2/ProfileName.jsx
"use client";

import { useProfile } from "./useProfile.js";

export default function ProfileName() {
  const { data, isPending } = useProfile(); // 버튼과 같은 ['profile'] 캐시

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