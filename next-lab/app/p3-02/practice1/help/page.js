/*
  복습: 같은 부모 아래의 또 다른 고정 주소
  핵심: help/page.js는 /p3-02/practice1/help 다. about과 형제 폴더라 둘 중 주소가 일치하는 파일만 그려진다.
  이유: 화면 이름을 파일 이름으로 남기면, 주소만 보고 어떤 컴포넌트인지 찾을 수 있다.
  실행: 이 주소로 요청이 오면 HelpPage만 실행된다. about/page.js는 같이 그려지지 않는다.
  활용: 고객센터, 도움말처럼 고정된 하위 페이지에 쓴다.
*/

// ~/next-lab/app/p3-02/practice1/help/page.js
// /p3-02/practice1/help. 이 파일의 default export가 도움말 화면이다.
const HelpPage = () => {
  return <h2 className='p-6 text-xl font-semibold'>여기는 도움말이에요.</h2>;
};

export default HelpPage;
