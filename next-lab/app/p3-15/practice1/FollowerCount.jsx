/*
  복습: 다시 받는 동안 팔로워 숫자를 유지하기
  핵심: data.followerCount는 캐시에 들어 있는 마지막 숫자다. isFetching은 무효화 뒤 GET이 진행 중일 때 true다.
  이유: 팔로우 요청이 끝난 뒤 프로필을 다시 받는 1초 동안 숫자를 로딩으로 바꾸면, 방금 기대한 변화가 빈칸이 된다.
  실행: 처음만 불러오는 중… 이다. 이후엔 8,500명처럼 천 단위 콤마가 붙는다. 재요청 중에는 새로 확인하는 중이 뒤에 붙고, 응답이 오면 서버가 증감한 숫자로 바뀐다.
  활용: 좋아요 수처럼 갱신 중에도 마지막 숫자를 보여주는 자리에 쓴다.
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