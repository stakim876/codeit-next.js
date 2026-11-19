/*
  복습: 검색이 거를 사람 목록
  핵심: username이 검색 대상이고 name은 화면 표시용이다. 서버 필터는 username.includes만 본다.
  이유: 이름 김승태로 찾으면 표의 name은 맞지만 필터가 username만 보므로 걸리지 않는다. 어떤 필드를 비교하는지 데이터에서 구분된다.
  실행: seungtae, minji, seungwoo, minho, yuna 다섯 명이다. min은 두 명, 빈 검색은 화면이 요청하지 않는다.
  활용: 검색 대상 필드와 표시 필드가 다른 목업에 쓴다.
*/

// ~/next-lab/app/p3-14/_data/members.js
export const members = [
  { username: "seungtae", name: "김승태" },
  { username: "minji", name: "이민지" },
  { username: "seungwoo", name: "박승우" },
  { username: "minho", name: "최민호" },
  { username: "yuna", name: "정유나" },
];
