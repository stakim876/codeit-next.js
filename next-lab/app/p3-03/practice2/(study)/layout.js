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
