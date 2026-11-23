/*
  복습: 로그인, 게시물, 회원 검색 요청을 한 파일의 세 묶음으로 나누기
  핵심: request는 이 파일 안에만 둔다. 화면은 authApi, postApi, memberApi만 부른다.
  이유: 주소와 실패 처리를 컴포넌트마다 다시 적지 않게 한다. 실패는 ApiError가 상태 코드와 문장을 같이 들고 간다.
  실행: login, signup, logout은 POST다. me는 GET이다. checkDuplicate, getPage, search는 쿼리 문자열이다. 좋아요는 PUT /likes/me, 취소는 DELETE다. 사람 번호는 주소에 넣지 않는다. 주소는 /api/v2다. 성공하면 { data }에서 값만 꺼내고, 실패하면 error.message와 error.code를 던진다.
  활용: LoginForm, SignupForm, useDuplicateCheck, FeedList, SearchPanel, useLikePost가 이 함수만 쓰게 바꿀 때 쓴다.
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

// 우리 서버에 보내는 요청은 모두 이 함수를 지나간다. 
async function request(path, { method, params, body } = {}) {
  // 쿼리 문자열은 URLSearchParams 로 만든다 ㅡ 값에 든 & # + 도 글자 그대로 서버에 간다.
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
    // 서버가 보낸 문장이 있으면 그것을, 없으면 상태 코드로 만든 문장을 던진다. 에러 코드도 함께 싣는다.
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

