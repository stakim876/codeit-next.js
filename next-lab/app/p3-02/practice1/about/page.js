/*
  복습: 자식 폴더가 더 긴 주소를 만들기
  핵심: about/page.js는 부모 page.js를 교체하지 않고, /p3-02/practice1/about 라는 다른 주소의 화면이다.
  이유: 소개와 홈을 한 파일의 if로 나누면 주소가 바뀌지 않아 새로고침과 공유가 안 된다. 폴더가 주소를 가지면 그 화면만 바로 열 수 있다.
  실행: 이 주소의 default export가 h2를 그린다. 부모 레이아웃이 따로 없으므로 루트 layout의 children으로만 들어간다.
  활용: 소개, 도움말처럼 홈 아래의 고정 주소에 쓴다.
*/

// ~/next-lab/app/p3-02/practice1/about/page.js
// /p3-02/practice1/about. 이 파일의 default export가 소개 화면이다.
const AboutPage = () => {
  return <h2 className='p-6 text-xl font-semibold'>여기는 소개에요.</h2>;
};

export default AboutPage;