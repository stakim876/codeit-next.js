/*
  복습: 같은 레이아웃을 쓰는 형제 화면
  핵심: math/page.js도 (study) 안이라 국어와 같은 layout.js를 공유한다. 주소만 /p3-03/practice2/math 로 다르다.
  이유: 메뉴를 페이지마다 복사하면 링크를 고칠 때 파일을 모두 열어야 한다. children만 바뀌면 메뉴는 한 파일에 남는다.
  실행: 수학 링크를 누르면 이전 children인 국어 문장 자리에 이 문장이 들어온다. 메뉴 헤더는 그대로다.
  활용: 설정 하위 메뉴, 과목 전환처럼 틀은 같고 본문만 바뀔 때 쓴다.
*/

// ~/next-lab/app/p3-03/practice2/(study)/math/page.js
// /p3-03/practice2/math. 국어와 같이 공부방 메뉴 안에 그려진다.
export default function MathPage() {
  return <p>수학 시간이에요</p>;
}
