// ~/next-lab/app/p3-14/homework2/FollowerCount.jsx
"use client";

import { useProfile } from "./useProfile.js";

export default function FollowerCount() {
  const { data, isPending, isFetching } = useProfile(); // 버튼과 같은 ['profile'] 캐시

  if (isPending) {
    return <p className="mt-4">불러오는 중…</p>; // 아직 한 번도 못 받음
  }

  return (
    <p className="mt-4">
      {/* 숫자는 유지. 다시 받는 중일 때만 뒤 문구 */}
      팔로워 {data.followerCount.toLocaleString()}명{isFetching && " · 새로 확인하는 중"}
    </p>
  );
}