/*
  복습: 그룹 폴더가 지워진 뒤의 첫 주소
  핵심: (study)는 주소에 없으므로 이 page.js의 경로는 /p3-03/practice2 다. 그룹은 정리용 이름일 뿐이다.
  이유: 첫 화면을 study/page.js처럼 실제 폴더에 두면 주소가 /practice2/study가 되어 메뉴의 처음 링크와 어긋난다.
  실행: 이 문장은 (study)/layout.js의 children 자리에 들어가 공부방 메뉴 아래에 보인다.
  활용: 구역의 기본 안내 화면을 URL에 구역 이름을 노출하지 않고 둘 때 쓴다.
*/

// ~/next-lab/app/p3-03/practice2/(study)/page.js
// /p3-03/practice2. (study)는 주소에 없으므로 이 파일이 공부방 첫 화면이다.
export default function StudyHomePage() {
  return <p>과목을 골라보세요</p>;
}
