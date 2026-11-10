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