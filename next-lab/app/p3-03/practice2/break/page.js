/*
  복습: 그룹 밖에 두어 공통 틀을 빼기
  핵심: break는 (study)와 형제다. (study)/layout.js의 자식이 아니므로 공부방 제목과 메뉴 없이 이 파일만 그려진다.
  이유: 쉬는 시간까지 그룹에 넣으면 메뉴를 숨기는 조건이 레이아웃에 생긴다. 폴더 위치로 소속을 나누면 조건이 필요 없다.
  실행: /p3-03/practice2/break 는 루트 레이아웃 아래 이 문장만 보인다. 메뉴의 쉬는 시간 링크가 이 주소로 나간다.
  활용: 로그인 화면, 빈 상태처럼 구역 메뉴에서 빼야 하는 주소에 쓴다.
*/

// ~/next-lab/app/p3-03/practice2/break/page.js
// /p3-03/practice2/break. (study) 밖에 있어서 공부방 메뉴 없이 이 화면만 나온다.
export default function BreakPage() {
  return <p className='p-6'>쉬는 시간이에요</p>;
}
