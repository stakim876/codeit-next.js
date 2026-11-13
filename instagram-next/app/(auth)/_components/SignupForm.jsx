// ~/instagram-next/app/(auth)/_components/SignupForm.jsx
'use client';


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import styles from './SignupPage.module.scss';
import { signupSchema, PHONE } from './signupSchema.js';
import { useDuplicateCheck } from './useDuplicateCheck.js';


// 가입 버튼이 눌리면 useMutation이 이 함수를 호출한다.
// 성공하면 body를 돌려주고, 실패하면 throw해서 mutation의 error / onError로 넘긴다.
async function signup(form) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  const body = await response.json();

  // 409(이미 있음)·400(형식 거절)이면 서버가 보낸 문장을 그대로 에러로 던진다.
  // fetch는 HTTP 에러여도 reject하지 않으므로, ok가 아닐 때 직접 throw해야 한다.
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
}


// 입력칸 하나 — 칸마다 같은 마크업을 되풀이하지 않으려고 컴포넌트로 뗐다.
// error는 부모가 넘긴다. 형식 메시지이거나, 형식이 맞는데 이미 쓰인 값이라는 메시지다.
function SignupField({ type, name, placeholder, value, onChange, error }) {
  // 색은 이 렌더의 value·error만으로 정한다. 칸 전용 State는 없다.
  // 아무것도 안 친 칸은 빨간색도 초록색도 아니다.
  const typed = value !== "";
  const failed = typed && error !== undefined;
  const passed = typed && error === undefined;

  return (
    <div
      className={`${styles.formField} ${failed ? styles.error : ""} ${passed ? styles.success : ""}`}
    >
      <div className={styles.inputContainer}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
        />
        {passed &&<div className={styles.successIcon}></div>}
        {failed &&<div className={styles.errorIcon}></div>}
      </div>
      {failed &&<span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default function SignupForm() {

  const router = useRouter();
  const queryClient = useQueryClient();

  // 네 칸을 객체 하나로 둔다. 키 이름은 input의 name, 그리고 가입 API body와 같다.
  const [form, setForm] = useState({
    emailOrPhone: '',
    name: '',
    username: '',
    password: '',
  });

  // 어느 칸이 바뀌었는지는 그 칸의 name 속성으로 안다.
  // [name]: value 로 그 키만 덮어쓰고, 나머지 칸은 스프레드로 그대로 둔다.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };


  // mutate(form) → signup(form). isPending은 요청 중, error는 signup이 throw한 Error.
  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    // 가입이 끝나면 로그인 화면으로 간다.
    onSuccess: () => router.push('/login'),
    // 중복 확인을 통과한 뒤에 누가 먼저 가입했을 수 있다.
    // check-duplicate 쿼리를 무효화하면 useDuplicateCheck가 칸마다 다시 묻는다.
    onError: () =>
      queryClient.invalidateQueries({ queryKey: ['check-duplicate'] }),
  });

  const handleSubmit = (event) => {
    // 브라우저가 폼을 주소에 실어 보내는 기본 동작을 막고, 우리가 직접 보낸다.
    event.preventDefault();
    mutate(form);
  };


  // 검증 결과는 State로 저장하지 않는다. form이 바뀌어 다시 그리면 그때 규칙에 대 본다.
  // safeParse는 실패해도 던지지 않고 { success: false, error }를 돌려준다.
  const result = signupSchema.safeParse(form);
  // fieldErrors는 { emailOrPhone: ['메시지', ...], username: [...] } 꼴.
  // 칸 아래에는 각 배열의 첫 문장만 쓴다.
  const errors = result.success ? {} : z.flattenError(result.error).fieldErrors;

  // 연락처 칸은 이메일·전화가 한 입력이다. 숫자 패턴이면 phone, 아니면 email로 중복 API를 고른다.
  const contactType = PHONE.test(form.emailOrPhone.trim()) ? 'phone' : 'email';
  // 세 번째 인자가 true일 때만 서버에 묻는다.
  // 형식 에러(errors.emailOrPhone)가 있으면 중복 확인을 건너뛴다 — 틀린 형식을 조회할 필요가 없다.
  const contactCheck = useDuplicateCheck(
    contactType,
    form.emailOrPhone,
    !errors.emailOrPhone,
  );
  const usernameCheck = useDuplicateCheck(
    'username',
    form.username,
    !errors.username,
  );

  // 형식은 통과했는데 available이 false면, 그 값을 누가 이미 쓰고 있다는 서버 문장이다.
  // 아직 응답이 없으면(undefined) 메시지도 없다.
  const takenMessage = (check) =>
    check?.available === false ? check.message : undefined;

  // 제출 조건: 네 칸 형식 통과 + 연락처·사용자 이름이 서버에서 available === true.
  // 중복 응답이 오기 전(undefined)에는 버튼이 꺼져 있다.
  const canSubmit =
    result.success &&
    contactCheck?.available === true &&
    usernameCheck?.available === true;

  return (
    <form
      className={styles.authForm}
      onSubmit={handleSubmit}
      noValidate>
      <SignupField
        type='email'
        name='emailOrPhone'
        placeholder='휴대폰 번호 또는 이메일 주소'
        value={form.emailOrPhone}
        onChange={handleChange}
        // 형식 에러가 있으면 그걸 보여주고, 없을 때만 중복 메시지를 보여 준다.
        error={errors.emailOrPhone?.[0] ?? takenMessage(contactCheck)}
        checked={contactCheck !== undefined}
      />
      <SignupField
        type='text'
        name='name'
        placeholder='성명'
        value={form.name}
        onChange={handleChange}
        error={errors.name?.[0]}
      />
      <SignupField
        type='text'
        name='username'
        placeholder='사용자 이름'
        value={form.username}
        onChange={handleChange}
        error={errors.username?.[0] ?? takenMessage(usernameCheck)}
        checked={usernameCheck !== undefined}
      />
      <SignupField
        type='password'
        name='password'
        placeholder='비밀번호'
        value={form.password}
        onChange={handleChange}
        error={errors.password?.[0]}
      />

      <p className={styles.privacyText}>
        저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에
        업로드했을 수도 있습니다.
        <a href='#'>더 알아보기</a>
      </p>

      {/* signup()이 throw한 문장. 칸 아래 검증 메시지와는 별개로, 요청이 거절됐을 때만 나온다. */}
      {error && <span className={styles.errorMessage}>{error.message}</span>}

      <button
        type='submit'
        className={styles.authButton}
        // 형식·중복이 모두 통과하기 전, 또는 가입 요청이 나가는 동안에는 다시 누를 수 없다.
        disabled={!canSubmit || isPending}>
        가입
      </button>
    </form>
  );
}