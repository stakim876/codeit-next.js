/*
  복습: 팔로우 실습의 시작 상태
  핵심: 내보낸 객체 하나를 조회 라우트와 팔로우 라우트가 같이 고친다. 초기에는 민지를 팔로우하지 않았고 팔로워는 8500이다.
  이유: 요청마다 새 객체를 만들면 PUT으로 올린 숫자가 GET에서 사라진다. 모듈 스코프 객체가 프로세스 안의 저장소다.
  실행: 서버를 재시작하면 이 초기값으로 돌아간다. 사용자별로 나뉘지 않는다.
  활용: 재시작 전까지만 유지되면 되는 프로필 목업에 쓴다.
*/

// ~/next-lab/app/p3-14/homework2/_data/profile.js
export const profile = {
  username: 'minji',
  name: '김민지',
  followerCount: 8500,
  following: false,  
};