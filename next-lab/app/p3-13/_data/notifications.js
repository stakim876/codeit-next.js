/*
  복습: 이 실습만의 알림 메모리
  핵심: p3-12와 파일이 비슷해도 모듈은 따로다. 이 배열을 import한 p3-13 라우트만 같은 객체를 공유한다.
  이유: 실습이 한 배열을 같이 쓰면 12장에서 POST한 항목이 13장 개수에 섞인다. 폴더마다 데이터를 두면 읽음 실험을 처음부터 할 수 있다.
  실행: 1번 minji 좋아요와 2번 seungwoo 팔로우는 안 읽음, 3번 jaehoon 댓글은 이미 읽음이다. 모두 읽음의 처음 count는 2다.
  활용: 단계별 예제가 서로 영향을 주지 않게 목업을 나눌 때 쓴다.
*/

// ~/next-lab/app/p3-12/_data/notifications.js
export const notifications = [
  { id: 1, text: 'minji 님이 회원님의 사진을 좋아합니다.', isRead: false },
  {
    id: 2,
    text: 'seungwoo 님이 회원님을 팔로우하기 시작했습니다.',
    isRead: false,
  },
  { id: 3, text: 'jaehoon 님이 댓글을 남겼습니다.', isRead: true },
];
