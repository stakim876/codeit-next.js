/*
  복습: 로그인, 게시물, 회원 검색 요청을 한 파일의 세 묶음으로 나누기
  핵심: request는 이 파일 안에만 둔다. 화면은 authApi, postApi, memberApi만 부른다.
  이유: 주소와 실패 처리를 컴포넌트마다 다시 적지 않게 한다. 실패는 ApiError가 상태 코드와 문장을 같이 들고 간다.
  실행: login과 signup은 POST JSON이다. checkDuplicate, getPage, search는 쿼리 문자열이다. 좋아요는 PUT, 취소는 DELETE다. 응답이 ok가 아니면 JSON의 message를 읽고, 글자가 아니면 상태 코드 문장을 던진다.
  활용: LoginForm, SignupForm, useDuplicateCheck, FeedList, SearchPanel, useLikePost가 이 함수만 쓰게 바꿀 때 쓴다.
*/

// ~/instagram-next/services/api.js

// 서버가 실패로 답했을 때 던지는 에러. 상태 코드와 문장을 함께 들고 다닌다.
export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// 우리 서버에 보내는 요청은 모두 이 함수를 지나간다.
async function request(path, { method, params, body } = {}) {
  // 쿼리 문자열은 URLSearchParams 로 만든다 - 값에 든 & # + 도 글자 그대로 서버에 간다.
  const query = params === undefined ? '' : `?${new URLSearchParams(params)}`;
  const options = { method };

  // 보낼 값이 있으면 JSON 글자로 바꾸고, 본문이 JSON 이라는 것을 헤더로 알린다.
  if (body !== undefined) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`/api${path}${query}`, options);

  if (!response.ok) {
    // 백엔드에 닿지 못하면 Next.js가 JSON이 아닌 글자로 답한다. 읽지 못하면 null로 둔다.
    const data = await response.json().catch(() => null);
    // 서버가 보낸 문장이 있으면 그것을, 없으면 상태 코드로 만든 문장을 던진다.
    throw new ApiError(
      response.status,
      data?.message ?? `요청을 처리하지 못했어요 (${response.status})`,
    );
  }

  return response.json();
}

// 가입, 로그인, 아이디·이메일 중복 확인. 화면은 주소를 적지 않고 이 함수만 부른다.
export const authApi = {
  login: (form) => request('/auth/login', { method: 'POST', body: form }),
  signup: (form) => request('/auth/signup', { method: 'POST', body: form}),
  checkDuplicate: (type, value) => 
    request('/auth/check-duplicate', { params: { type, value } }),
};

// 피드 한 페이지와 좋아요. getPage는 쿼리, 좋아요는 PUT, 취소는 DELETE다.
export const postApi = {
  getPage: (params) => request('/posts', { params }),
  likePost: (id, userId) => 
    request(`/posts/${id}/likes/${userId}`, { method: 'PUT' }),
  unlikePost: (id, userId) => 
   request(`/posts/${id}/likes/${userId}`, { method: 'DELETE' }), 
};

// 검색창에 친 글자로 회원을 찾는다.
export const memberApi = {
  search: (keyword) => request('/members/search', { params: { keyword } }),
};

