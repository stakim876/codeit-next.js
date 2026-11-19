/*
  복습: 검색어가 이름 일부와 겹치는 사람만 돌려주기
  핵심: searchParams의 keyword로 username.includes를 한다. 대소문자와 빈 값을 따로 보정하지 않는다.
  이유: 화면은 글자가 있을 때만 이 주소를 부른다. 서버는 그 문자열이 포함된 아이디만 걸러 응답량을 줄인다.
  실행: 1초 뒤에 걸러진 배열을 준다. keyword가 min이면 minji와 minho가 남고 seungtae는 빠진다. keyword가 null이면 includes가 모든 항목에서 false라 빈 배열이다.
  활용: 사용자 검색, 자동완성처럼 부분 문자열이 조건인 API에 쓴다.
*/

// ~/next-lab/app/p3-14/api/members/route.js
// 메모. ?keyword=min 에서 min을 꺼내 username.includes로 거른다.
// minji, minho는 걸리고 seungtae는 빠진다.
import { members } from "../../_data/members.js";

export async function GET(request) {
  const keyword = request.nextUrl.searchParams.get("keyword");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const found = members.filter((member) => member.username.includes(keyword));

  return Response.json(found);
}
