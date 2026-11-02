// ~/next-lab/app/p3-03/practice1/page.js
// /p3-03/practice1. 도시 이름을 주소에 넣어 각 도시 페이지로 보낸다.
import Link from 'next/link';

const cities = ['seoul', 'busan', 'gwangju'];

export default function CityListPage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>도시를 골라보세요</h2>
      <nav className='mt-4 flex gap-4'>
        {/* city가 곧 [city] 칸의 값이 된다. 예: /p3-03/practice1/seoul */}
        {cities.map((city) => (
          <Link
            key={city}
            href={`/p3-03/practice1/${city}`}
            className='underline'>
            {city}
          </Link>
        ))}
        {/* all은 고정 폴더라 [city]에 잡히지 않고 all/page.js로 간다 */}
        <Link
          href='/p3-03/practice1/all'
          className='underline'>
          전체
        </Link>
      </nav>
    </main>
  );
}
