/*
  복습: 폴더가 주소를 만드는 방식
  핵심: app 아래 폴더 이름이 URL 조각이고, 그 안의 page.js만 화면이 된다. 이 파일의 주소는 /p3-02/practice1 이다.
  이유: 라우터에 주소와 컴포넌트를 따로 등록하지 않아도, 파일을 두는 위치가 곧 이동 경로가 된다.
  실행: 그 주소로 오면 HomePage가 h2 한 줄을 그린다. about, help는 자식 폴더라 이 파일이 대신 열리지는 않는다.
  활용: 섹션마다 폴더를 나눠 독립된 화면을 만들 때 쓴다.
*/

// ~/next-lab/app/p3-02/practice1/page.js
// /p3-02/practice1. 이 파일의 default export가 실습 홈 화면이다.
const HomePage = () => {
  return <h2 className='p-6 text-xl font-semibold'>여기는 홈이에요.</h2>;
};

export default HomePage;
