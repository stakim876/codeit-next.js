/*
  복습: 그룹 안의 하위 주소
  핵심: korean은 괄호가 없는 실제 폴더라 주소에 남는다. 전체 주소는 /p3-03/practice2/korean 이다.
  이유: 과목마다 파일을 나누면 그 과목 주소만 북마크할 수 있고, 메뉴 틀은 부모 그룹 레이아웃이 유지한다.
  실행: 이 p가 layout의 children으로 들어가 메뉴 아래에 국어 시간이에요가 보인다. 수학 페이지와 동시에 그려지지는 않는다.
  활용: 탭 안의 개별 문서, 과목 페이지에 쓴다.
*/

// ~/next-lab/app/p3-03/practice2/(study)/korean/page.js
// /p3-03/practice2/korean. 위 (study) 레이아웃의 children으로 들어간다.
export default function KoreanPage() {
  return <p>국어 시간이에요</p>;
}
