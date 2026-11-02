// ~/instagram-next/app/api/profiles/[username]/route.js
// /api/profiles/minji 처럼 주소의 username으로 프로필 하나를 찾는다.
import { profiles } from '@/data/profiles.js';

// params는 Promise라 await한 뒤에 username을 꺼낸다.
export async function GET(request, { params }) {
  const { username } = await params;
  const profile = profiles.find((item) => item.username === username);

  if (profile === undefined) {
    // 없는 사람은 404와 메시지를 보낸다.
    return Response.json({ message: '그런 사람은 없어요' }, { status: 404 });
  }

  return Response.json(profile);
}
