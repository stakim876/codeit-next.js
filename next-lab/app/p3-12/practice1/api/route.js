/*
  복습: 10초 단위로 목록의 시작 위치를 밀기
  핵심: Date.now()를 10000으로 나눈 몫이 10초마다 1씩 늘어난다. 그 값을 단어 개수로 나눈 나머지가 이번 구간의 시작 인덱스다.
  이유: 서버에 타이머를 두지 않아도, 아무 때나 GET하면 그 시각이 속한 10초 칸의 순서를 계산할 수 있다. 같은 10초 안의 요청은 같은 순서를 본다.
  실행: 응답 전에 0.5초를 기다린다. turn이 0이면 한강 노을이 1위, 1이면 크루아상이 1위다. slice로 앞부분을 뒤로 붙여 회전한다. checkedAt은 응답 시각이다.
  활용: 시간 창에 따라 결과가 바뀌는 랭킹 API에 쓴다.
*/

// ~/next-lab/app/p3-12/practice1/api/route.js
// /p3-12/practice1/api. 10초마다 맨 앞 검색어를 뒤로 보낸다.
const keywords = [
  '한강 노을',
  '크루아상',
  '농구 코트',
  '캠핑 의자',
  '필름 카메라',
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 지금 시각을 10초 칸으로 나눠, 그 칸마다 순서를 한 칸씩 돌린다.
  const turn = Math.floor(Date.now() / 10000) % keywords.length;

  return Response.json({
    checkedAt: new Date().toLocaleTimeString('ko-KR'),
    keywords: [...keywords.slice(turn), ...keywords.slice(0, turn)],
  });
}
