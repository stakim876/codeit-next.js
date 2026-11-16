/*
  복습: 예전 세 글을 피드 모양으로 돌려주기
  핵심: 한강, 크루아상, 농구 코트 글을 items와 hasNext로 준다. limit과 cursor로 다음 글만 자른다.
  이유: 게시물 데이터베이스가 이 PC에 없으면 피드는 빈 칸으로 남는다. 이 경로가 있으면 예전 사진이 그대로 나온다.
  실행: FeedList가 GET /api/posts?limit=2를 보낸다. cursor가 있으면 그 id 다음부터 자른다.
  활용: 서버 없이 피드 사진과 무한 스크롤 모양을 확인할 때 쓴다.
*/

// ~/instagram-next/app/api/posts/route.js

const posts = [
  {
    id: 1,
    username: 'seungtae',
    profileImage: '/profiles/seungtae-small.jpg',
    imageUrls: [
      '/posts/han-river-sunset.jpg',
      '/images/slide-river-bridge.jpg',
      '/images/slide-river-park.jpg',
    ],
    postAlt: '노을 진 한강',
    content: '퇴근길에 한강이 너무 예뻤어요',
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    likeCount: 130,
    liked: false,
    commentCount: 3,
  },
  {
    id: 2,
    username: 'minji',
    profileImage: '/profiles/minji.jpg',
    imageUrls: ['/posts/croissant.jpg', '/images/slide-croissant-plate.jpg'],
    postAlt: '갓 구운 크루아상',
    content: '오늘 아침에 구운 크루아상',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    likeCount: 512,
    liked: false,
    commentCount: 4,
  },
  {
    id: 3,
    username: 'seungwoo',
    profileImage: '/profiles/seungwoo.jpg',
    imageUrls: ['/posts/basketball-court.jpg'],
    postAlt: '농구 코트',
    content: '주말마다 여기 옵니다',
    createdAt: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    likeCount: 76,
    liked: false,
    commentCount: 2,
  },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit')) || posts.length;
  const cursor = Number(searchParams.get('cursor')) || null;
  const start = cursor ? posts.findIndex((post) => post.id === cursor) + 1 : 0;
  const items = posts.slice(start, start + limit);

  return Response.json({
    items,
    hasNext: start + limit < posts.length,
  });
}
