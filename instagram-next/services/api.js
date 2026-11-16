/*
  복습: 로그인 요청이 같은 함수를 지나게 하기
  핵심: request는 경로, 메서드, 본문만 받는다. 주소는 /api 뒤에 붙이고, 본문이 있으면 JSON 글자로 바꾼다.
  이유: 화면마다 fetch를 따로 쓰면 실패 문장과 헤더가 어긋난다. 상태 코드가 실패면 throw해서 useMutation의 error로 넘긴다.
  실행: LoginForm이 request('/auth/login')을 부르면 브라우저는 /api/auth/login으로 보낸다. next.config가 그 주소를 API_URL의 인증 서버로 넘긴다. 4xx면 서버 문장을 Error로 던지고, JSON이 아니면 null로 둔 뒤 상태 코드 문장을 던진다.
  활용: 로그인처럼 성공 값과 실패 문장을 한 방식으로 받고 싶을 때 쓴다.
*/

// ~/instagram-next/services/api.js

// 우리 서버에 보내는 요청은 모두 이 함수를 지나간다.
export async function request(path, { method, body } = {}) {
  const options = { method };

  // 보낼 값이 있으면 JSON 글자로 바꾸고, 본문이 JSON 이라는 것을 헤더로 알린다.
  if (body !== undefined) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`/api${path}`, options);

  if (!response.ok) {
    // 백엔드에 닿지 못하면 Next.js 서버가 JSON 이 아닌 글자로 답한다 — 읽지 못하면 null 로 둔다.
    const data = await response.json().catch(() => null);
    // 서버가 보낸 문장이 있으면 그것을, 없으면 상태 코드로 만든 문장을 던진다.
    throw new Error(
      data?.message ?? `요청을 처리하지 못했어요 (${response.status})`,
    );
  }

  return response.json();
}
