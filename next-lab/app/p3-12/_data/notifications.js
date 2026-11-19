/*
  복습: 라우트가 공유하는 서버 메모리
  핵심: 모듈 스코프의 배열은 서버 프로세스가 살아있는 동안 같은 객체를 가리킨다. GET은 이 배열을 읽고 POST는 같은 배열에 붙인다.
  이유: 데이터베이스 없이 추가한 알림이 다음 GET에 보이는지 확인하려면, 요청이 끝나도 유지되는 값이 필요하다.
  실행: 처음 세 건 중 1번과 2번은 안 읽음, 3번은 읽음이다. 배지의 안 읽은 개수는 이 isRead를 센 결과다.
  활용: 수업용 목업 데이터, 재시작 전까지 유지되는 임시 저장소에 쓴다.
*/

// ~/next-lab/app/p3-12/_data/notifications.js
// 서버가 메모리에 들고 있는 알림 목록. POST가 이 배열에 새 알림을 붙인다.
export const notifications = [
  { id: 1, text: 'minji 님이 회원님의 사진을 좋아합니다.', isRead: false },
  {
    id: 2,
    text: 'seungwoo 님이 회원님을 팔로우하기 시작했습니다.',
    isRead: false,
  },
  { id: 3, text: 'seungtae 님이 댓글을 남겼습니다.', isRead: true },
];
