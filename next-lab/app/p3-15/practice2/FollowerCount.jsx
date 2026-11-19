/*
  복습: 서버 응답 전에 바뀐 캐시 숫자를 바로 보여 주기
  핵심: 버튼의 setQueryData가 followerCount를 먼저 증감하면, 이 컴포넌트는 같은 키를 구독하므로 그 숫자로 다시 그린다. isFetching은 그 뒤 invalidate의 GET에 해당한다.
  이유: 낙관적 갱신의 대상이 숫자다. 버튼만 글자가 바뀌고 숫자가 1초 뒤에 따라오면 둘이 어긋나 보인다.
  실행: 첫 로딩 뒤에 8,500명이다. 팔로우를 누르면 기다리지 않고 8,501명이 되고, 재요청 중 문구가 붙을 수 있다. 실패하면 버튼이 이전 캐시로 되돌려 이 숫자도 8500으로 돌아간다.
  활용: 좋아요 수를 클릭 즉시 올리고, 실패하면 같이 되돌릴 때 쓴다.
*/

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
