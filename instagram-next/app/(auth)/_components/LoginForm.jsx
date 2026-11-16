/*
  복습: 로그인 칸을 클라이언트 폼으로 떼고, 가입에서 넘어온 이름을 채우기
  핵심: 입력과 요청은 이 파일만 맡는다. useSearchParams가 주소의 ?username= 을 첫 값으로 넣는다.
  이유: 검색 값을 읽는 컴포넌트라 페이지 파일은 이 폼을 Suspense로 감싼다. 두 칸이 비거나 요청 중이면 버튼을 꺼 둔다.
  실행: /login 에서 로그인하면 request('/auth/login')이 나간다. 성공하면 / 로 가고, 실패 문장은 버튼 위에 남는다. 다시 치면 reset이 그 문장을 지운다.
  활용: 가입 직후 로그인 칸에 방금 만든 아이디를 미리 넣고, 비밀번호만 받게 할 때 쓴다.
*/

// ~/instagram-next/app/(auth)/_components/LoginForm.jsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import styles from './LoginPage.module.scss';
import { request } from '@/services/api.js';

async function login(form) {
  return request('/auth/login', { method: 'POST', body: form });
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    // 가입하고 넘어왔으면 주소의 ?username= 으로 첫 값을 채운다.
    username: searchParams.get('username') ?? '',
    password: '',
  });

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: login,
    // 로그인이 끝나면 피드로 간다.
    onSuccess: () => router.push('/'),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    // 다시 치기 시작하면 앞에서 실패한 문장을 지운다.
    reset();
  };

  const handleSubmit = (event) => {
    // 가입 화면처럼, 브라우저가 폼을 주소에 실어 보내는 기본 동작부터 막는다.
    event.preventDefault();
    mutate(form);
  };

  // 두 칸이 모두 차야 누를 수 있다 — 로그인 화면은 규칙을 검사하지 않는다.
  const isDisabled = !form.username || !form.password || isPending;

  return (
    <form
      className={styles.authForm}
      onSubmit={handleSubmit}
      noValidate>
      <div className={styles.formField}>
        <input
          type='text'
          name='username'
          placeholder='전화번호, 사용자 이름 또는 이메일'
          required
          value={form.username}
          onChange={handleChange}
          disabled={isPending}
        />
      </div>
      <div className={styles.formField}>
        <input
          type='password'
          name='password'
          placeholder='비밀번호'
          required
          value={form.password}
          onChange={handleChange}
          disabled={isPending}
        />
      </div>

      {error && <div className={styles.errorMessage}>{error.message}</div>}
      <button
        type='submit'
        className={styles.authButton}
        disabled={isDisabled}>
        {isPending ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
}