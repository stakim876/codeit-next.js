/*
  복습: 검색 화면은 입력 컴포넌트만 둔다
  핵심: 페이지는 제목과 MemberSearch를 배치한다. 글자를 칠 때마다 키가 바뀌는 쿼리는 클라이언트 컴포넌트 안에 있다.
  이유: 입력 state가 페이지에 있으면 페이지 전체가 클라이언트가 된다. 검색만 클라이언트로 두면 제목은 서버에서 그린다.
  실행: /p3-14/search 에서 MemberSearch가 빈 칸으로 시작하고, 글자가 생기기 전에는 요청을 보내지 않는다.
  활용: 검색처럼 입력과 요청이 한 위젯에 모인 화면에 쓴다.
*/

// ~/next-lab/app/p3-14/search/page.js
import MemberSearch from "../_components/MemberSearch.jsx";

export default function SearchPage() {
  return (
    <main className="p-6">
      <h2 className="text-xl font-semibold">사람 찾기</h2>
      <MemberSearch />
    </main>
  );
}
