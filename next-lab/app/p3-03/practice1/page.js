/*
  복습: 목록의 각 항목을 동적 주소로 보내기
  핵심: next/link의 Link는 전체 새로고침 없이 앱 안 이동을 한다. href에 넣은 도시 이름이 [city] 폴더의 값이 된다.
  이유: a 태그로 이동하면 브라우저가 문서를 새로 받아 루트 레이아웃의 캐시도 끊긴다. Link는 바뀐 구간만 교체한다.
  실행: seoul, busan, gwangju가 /p3-03/practice1/seoul 같은 주소로 연결된다. all은 배열 밖이라 고정 폴더 all/page.js로 간다. key는 목록을 다시 그릴 때 같은 도시를 구분한다.
  활용: 상품 목록, 도시 목록처럼 항목마다 상세 주소가 있을 때 쓴다.
*/

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
