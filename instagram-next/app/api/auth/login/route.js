/*
  복습: 연습 계정으로 로그인 요청을 통과시키기
  핵심: username과 password가 seungtae, password1과 같으면 { username }을 돌려준다.
  이유: 인증 서버에는 비밀번호 칸이 없다. 이 경로가 먼저 받으면 화면의 로그인 버튼이 홈으로 갈 수 있다.
  실행: LoginForm이 POST /api/auth/login으로 칸 값을 보낸다. 둘이 다르면 401과 안내 문장을 준다.
  활용: 바깥 인증 서버가 없을 때 화면 로그인 흐름만 확인하려고 쓴다.
*/

// ~/instagram-next/app/api/auth/login/route.js
const ACCOUNTS = [{ username: 'seungtae', password: 'password1' }];

export async function POST(request) {
  const body = await request.json();
  const username = typeof body.username === 'string' ? body.username.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const account = ACCOUNTS.find(
    (item) => item.username === username && item.password === password,
  );

  if (!account) {
    return Response.json(
      { message: '입력한 정보와 일치하는 계정이 없어요' },
      { status: 401 },
    );
  }

  return Response.json({ username: account.username });
}
