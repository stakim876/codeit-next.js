// ~/next-lab/app/p3-09/practice1/page.js
// /p3-09/practice1. 이번 주 책 순위를 표로 그린다.
const ranking = [
  { rank: 1, title: '어린 왕자' },
  { rank: 2, title: '모모' },
  { rank: 3, title: '데미안' },
];

export default function RankingPage() {
  return (
    <main className='p-6'>
      <div className='text-xl font-semibold'>
        이번 주 많이 팔린 책
        <div className='text-sm font-normal'>월요일마다 바뀌어요</div>
      </div>
      <table className='mt-4'>
        <tbody>
          <tr>
            <th className='pr-6 text-left'>순위</th>
            <th className='text-left'>제목</th>
          </tr>
          {/* rank로 줄을 구분하고, 순위와 제목을 칸에 넣는다. */}
          {ranking.map((book) => (
            <tr key={book.rank}>
              <td className='pr-6'>{book.rank}</td>
              <td>{book.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
