/*
  복습: 주소에는 안 나오는 공통 메뉴
  핵심: 괄호 폴더 (study)는 라우트 그룹이다. URL에 study가 붙지 않고, 그 안의 layout.js는 그룹에 속한 화면에만 children 바깥을 씌운다.
  이유: 국어와 수학은 같은 메뉴가 필요하고 쉬는 시간은 메뉴가 없어야 한다. 그룹 밖으로 레이아웃을 빼면 쉬는 시간까지 메뉴가 따라온다.
  실행: /p3-03/practice2, /korean, /math 는 이 메뉴 안에 그려진다. 쉬는 시간 링크는 /break 로 보내며, 그 페이지는 이 layout의 children이 아니다.
  활용: 관리자 구역, 과목 구역처럼 URL은 짧게 두고 일부 화면에만 틀을 씌울 때 쓴다.
*/

// ~/next-lab/app/p3-03/practice2/(study)/layout.js
// (study)는 주소에 붙지 않는다. 국어·수학·처음 화면만 이 메뉴를 같이 쓴다.
import Link from 'next/link';

export default function StudyLayout({ children }) {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>공부방</h2>
      <nav className='mt-4 flex gap-4'>
        <Link
          href='/p3-03/practice2'
          className='underline'>
          처음
        </Link>
        <Link
          href='/p3-03/practice2/korean'
          className='underline'>
          국어
        </Link>
        <Link
          href='/p3-03/practice2/math'
          className='underline'>
          수학
        </Link>
        <Link
          href='/p3-03/practice2/break'
          className='underline'>
          쉬는 시간
        </Link>
      </nav>
      {/* 처음, 국어, 수학 페이지가 이 자리에 들어간다 */}
      <div className='mt-6'>{children}</div>
    </main>
  );
}
