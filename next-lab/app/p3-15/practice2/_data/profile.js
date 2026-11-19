/*
  복습: practice2 전용 시작 프로필
  핵심: 민지, 8500명, 아직 팔로우하지 않음. practice1과 값이 같아도 객체는 이 파일 것이다.
  이유: 낙관적 갱신은 이 객체를 서버가 나중에 확정한다. 다른 실습과 공유하면 롤백 실험이 그쪽 숫자를 바꾼다.
  실행: PUT이 following과 followerCount를 이 객체에서 직접 고친다. 재시작하면 초기값이다.
  활용: 화면 낙관적 값과 비교할 서버 초기 상태에 쓴다.
*/

// ~/next-lab/app/p3-14/homework2/_data/profile.js
export const profile = {
  username: 'minji',
  name: '김민지',
  followerCount: 8500,
  following: false,
};