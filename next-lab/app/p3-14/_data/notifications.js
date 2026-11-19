/*
  복습: 14장 알림 화면만 쓰는 메모리
  핵심: 이 배열은 p3-14 라우트만 import한다. 1번과 2번은 안 읽음, 3번은 읽음이다.
  이유: 12장, 13장과 배열을 공유하면 다른 실습의 POST가 이 배지 개수를 바꾼다.
  실행: 배지의 처음 안 읽은 개수는 2다. 한 건 읽음 PATCH가 이 객체의 isRead를 직접 바꾼다. 모두 읽음 라우트는 500이라 이 값을 건드리지 않는다.
  활용: 화면 실습마다 초기 상태를 고정할 때 쓴다.
*/

// ~/next-lab/app/p3-12/_data/notifications.js
export const notifications = [
  { id: 1, text: "minji 님이 회원님의 사진을 좋아합니다.", isRead: false },
  {
    id: 2,
    text: "seungwoo 님이 회원님을 팔로우하기 시작했습니다.",
    isRead: false,
  },
  { id: 3, text: "seungtae 님이 댓글을 남겼습니다.", isRead: true },
];
