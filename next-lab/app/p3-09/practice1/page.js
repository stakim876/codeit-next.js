/*
  복습: 배열을 표의 줄로 펼치기
  핵심: 서버 컴포넌트는 데이터를 파일 안에서 읽고 map으로 요소 배열을 만든다. key는 React가 같은 책을 다시 찾을 때 쓰는 안정적인 값이다.
  이유: 줄을 세 번 복사하면 순위가 바뀔 때 HTML을 직접 고쳐야 한다. 데이터와 그리는 틀을 나누면 배열만 바뀐다.
  실행: ranking 세 권이 순위, 제목 칸으로 그려진다. key는 rank다. 이 파일은 클릭이나 서버 갱신이 없어 빌드 결과에 남을 수 있다.
  활용: 랭킹, 주문 목록처럼 행 개수가 데이터 길이와 같은 표에 쓴다.
*/

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
