// ~/next-lab/app/p3-15/practice1/api/follow/route.js
import { profile } from '../../_data/profile.js'; // 메모리의 프로필. 여기서 직접 바꿈

export async function PUT() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 뒤에 반영

  // throw new Error(); // 이 줄을 살리면 팔로우가 실패함

  if (!profile.following) {
    profile.following = true; // 아직 아니면 팔로우로
    profile.followerCount += 1; // 숫자 +1
  }

  return Response.json({
    following: profile.following, // 버튼이 다시 받을 상태
    followerCount: profile.followerCount,
  });
}

export async function DELETE() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 뒤에 취소

  if (profile.following) {
    profile.following = false; // 팔로우 해제
    profile.followerCount -= 1; // 숫자 -1
  }

  return Response.json({
    following: profile.following,
    followerCount: profile.followerCount, // 줄인 숫자
  });
}

