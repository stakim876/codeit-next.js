/*
  복습: Access 토큰이 만료되면 새 토큰을 받고 원래 요청을 한 번 다시 보내기
  핵심: TOKEN_EXPIRED면 POST /auth/reissue를 한 번만 보내고, 기다리던 요청은 그 결과를 같이 쓴 뒤 원래 요청을 한 번 다시 보낸다.
  이유: 같은 Refresh 토큰을 두 번 쓰면 서버가 이미 쓴 토큰으로 보고 로그인 기록을 지운다. 화면은 재발급을 직접 부르지 않는다.
  실행: 실패 코드가 TOKEN_EXPIRED이고 retried가 아니면 reissue를 기다린다. 그다음 같은 method, params, body로 retried true를 넣어 한 번만 다시 보낸다. 주소는 /api/v2/auth/reissue다.
  활용: 피드, 하트, 검색이 토큰 기한 때문에 끊기지 않게 할 때 쓴다.
*/

// ~/instagram-next/services/api.js

// 서버가 실패로 답했을 때 던지는 에러 ㅡ 서버의 HttpError 처럼 상태 코드를 함께 들고 다닌다.
export class ApiError extends Error {
  constructor(status, message, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

// 지금 진행 중인 새 토큰 받기 ㅡ 요청 여럿이 한꺼번에 TOKEN_EXPIRED 를 받아도 하나만 보내고 다 같이 기다린다.
// 같은 Refresh 토큰이 두 번 가면 서버는 이미 쓴 토큰이 다시 왔다고 보고 로그인 기록을 지운다.
let reissuing = null;

function reissue() {
  if (reissuing === null) {
    reissuing = request("/auth/reissue", { method: "POST" }).finally(() => {
      reissuing = null;
    });
  }

  return reissuing;
}

// 우리 서버에 보내는 요청은 모두 이 함수를 지나간다.
async function request(path, { method, params, body, retried = false } = {}) {
  // 쿼리 문자열은 URLSearchParams 로 만든다. ㅡ 값에 든 & # + 도 글자 그대로 서버에 간다.
  const query = params === undefined ? '' : `?${new URLSearchParams(params)}`;
  const options = { method };

  // 보낼 값이 있으면 JSON 글자로 바꾸고, 본문이 JSON 이라는 것을 헤더로 알린다.
  if (body !== undefined) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(body);
  }

  // 새 주소(/api/v2)로 보낸다 ㅡ 성공한 응답은 봉투({ data })에 담겨 온다.
  const response = await fetch(`/api/v2${path}${query}`, options);

  if (!response.ok) {
    // 백엔드에 닿지 못하면 Next.js 서버가 JSON 이 아닌 글자로 답한다 ㅡ 읽지 못하면 null 로 둔다.
    const failed = await response.json().catch(() => null);
    const error = failed?.error;

    // Access 토큰의 기한만 지났으면 새 토큰을 받고, 원래 요청을 한 번만 다시 보낸다.
    if (error?.code === 'TOKEN_EXPIRED' && !retried) {
      await reissue();
      return request(path, { method, params, body, retried: true });
    }

    // 서버가 보낸 문장이 있으면 그것을, 없으면 상태 코드로 만든 문장을 던진다. 에러 코드로 함께 심는다.
    throw new ApiError(
      response.status,
      error?.message ?? `요청을 처리하지 못했어요 (${response.status})`,
      error?.code,
    );
  }

  // 봉투에서 값만 꺼내 돌려준다 ㅡ 화면 쪽 코드는 봉투를 몰라도 된다.
  const { data } = await response.json();
  return data;
}

// 가입, 로그인, 아이디·이메일 중복 확인. 화면은 주소를 적지 않고 이 함수만 부른다.
export const authApi = {
  login: (form) => request('/auth/login', { method: 'POST', body: form }),
  signup: (form) => request('/auth/signup', { method: 'POST', body: form }),
  checkDuplicate: (type, value) => 
    request('/auth/check-duplicate', { params: { type, value } }),
  me: () => request('/auth/me'),
  logout: () => request('/auth/logout', { method: 'POST' }),
};

// 피드 한 페이지와 좋아요. getPage는 쿼리, 좋아요는 PUT, 취소는 DELETE다.
// 누가 눌렀는지는 주소의 me로 서버가 로그인 정보에서 정한다.
export const postApi = {
  getPage: (params) => request('/posts', { params }),
  likePost: (id) => 
    request(`/posts/${id}/likes/me`, { method: 'PUT' }),
  unlikePost: (id) => 
    request(`/posts/${id}/likes/me`, { method: 'DELETE' }),
};

// 검색창에 친 글자로 회원을 찾는다.
export const memberApi = {
  search: (keyword) => request('/members/search', { params: { keyword } }),
};
