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
