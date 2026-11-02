// ~/instagram-next/app/api/posts/route.js
// 이 파일의 GET, POST가 /api/posts 요청을 받는다.
import { posts } from '@/data/posts.js';

// 목록 조회. posts 배열을 JSON으로 돌려준다.
export function GET() {
  return Response.json(posts);  
}

// 새 게시물. 본문은 JSON이고, username과 postImage가 없으면 400.
export async function POST(request) {
  const body = await request.json();
  const { username, postImage } = body;
  
  if (!username || !postImage) {
    return Response.json(
      { message: 'username과 postImage는 꼭 있어야 해요' },
      { status: 400 },  
    );
  }

  const newPost = {
    ...body,
    id: posts.length + 1, // 지금 배열 길이 다음 번호
    likeCount: 0,
    commentCount: 0,
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost); // 메모리에만 넣는다. 서버를 다시 켜면 사라진다.

  return Response.json(newPost, { status: 201 }); // 201은 새로 만들었음
}
