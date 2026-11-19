/*
  복습: 낙관적 갱신이 실패했을 때를 대비해 throw를 꺼 둔 PUT
  핵심: 동작은 practice1과 같다. following이 아닐 때만 1을 더하고, 이미 팔로우면 DELETE만 1을 뺀다. throw new Error()는 주석이라 지금은 성공한다.
  이유: 그 한 줄을 살리면 응답이 실패해 버튼의 onError가 이전 캐시로 되돌린다. 평소에는 성공시켜 숫자가 먼저 바뀐 뒤 GET과 같아지는지 본다.
  실행: PUT과 DELETE 모두 1초 대기 후 현재 following과 followerCount를 준다. 주석을 살리기 전에는 서버도 낙관적 숫자와 같은 방향으로 변한다.
  활용: 성공 경로와 일부러 실패시키는 한 줄을 같은 핸들러에 두고 롤백을 시험할 때 쓴다.
*/

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

