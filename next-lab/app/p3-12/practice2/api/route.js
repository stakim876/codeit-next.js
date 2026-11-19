/*
  복습: practice1과 같은 회전을 다른 주소에서 제공하기
  핵심: 10초 칸 계산은 practice1 라우트와 같다. 주소만 /p3-12/practice2/api 라서 클라이언트가 실습별로 다른 캐시와 연결된다.
  이유: 같은 경로를 쓰면 두 실습의 브라우저 캐시와 서버 동작이 한 주소에 섞인다. 수업 단계마다 주소를 나누면 비교가 된다.
  실행: 0.5초 대기 후 turn만큼 앞 단어를 뒤로 보낸 목록과 checkedAt을 JSON으로 준다. 같은 10초 안의 GET은 같은 순서를 본다.
  활용: 단계별 예제가 같은 목업 데이터, 다른 주소를 갖게 할 때 쓴다.
*/

// ~/next-lab/app/p3-12/practice2/api/route.js
// /p3-12/practice2/api. 10초마다 맨 앞 검색어를 뒤로 보낸다.
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
