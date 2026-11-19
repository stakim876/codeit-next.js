/*
  복습: 동적 칸보다 고정 폴더가 우선인 이유
  핵심: [city]는 어떤 한 단어든 받을 수 있지만, 같은 위치에 all이라는 실제 폴더가 있으면 all은 그 고정 파일로 간다.
  이유: 전체 보기를 도시 이름으로 처리하면 all이라는 도시가 있는지 매번 데이터에서 걸러야 한다. 주소 단계에서 고정 화면과 변수 화면을 나누면 역할이 분명하다.
  실행: /p3-03/practice1/all 은 이 파일을 연다. params.city로 all을 받지 않는다. seoul은 여전히 [city]/page.js다.
  활용: 전체 목록, 새 글 작성처럼 동적 주소와 겹치기 쉬운 고정 화면에 쓴다.
*/

// ~/next-lab/app/p3-03/practice1/all/page.js
// /p3-03/practice1/all. 폴더 이름이 all로 고정되어 도시 이름과 다른 화면이다.
export default function AllCitiesPage() {
  return (
    <h2 className='p-6 text-xl font-semibold'>세 도시를 한꺼번에 보여줘요</h2>
  );
}
