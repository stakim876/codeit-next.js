/*
  복습: 이미 팔로우 중이면 숫자를 또 올리지 않기
  핵심: PUT은 following이 false일 때만 true로 바꾸고 1을 더한다. DELETE는 true일 때만 false로 바꾸고 1을 뺀다. 같은 요청을 두 번 보내도 조건이 막는다.
  이유: 버튼이 잠기기 전에 요청이 겹치거나 HTTP 파일을 반복 실행해도 팔로워가 계속 늘면 상태가 어긋난다. 서버가 현재 값으로 한 번만 반영한다.
  실행: 각 메서드는 1초 기다린 뒤 following과 followerCount만 JSON으로 준다. 화면은 이 응답을 버튼 글자에 직접 넣지 않고, 무효화로 GET 전체를 다시 받는다.
  활용: 토글 API가 현재 상태를 보고 중복 반영을 막을 때 쓴다.
*/

// ~/next-lab/app/p3-15/practice1/api/follow/route.js
import { profile } from '../../_data/profile.js'; // 메모리의 프로필. 여기서 직접 바꿈

export async function PUT() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 뒤에 반영

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
