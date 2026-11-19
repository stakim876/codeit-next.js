/*
  복습: 서버가 성공한 뒤에만 프로필 캐시를 버리기
  핵심: following이 true면 PUT, false면 DELETE다. 인자로는 지금 값의 반대를 넘긴다. 성공하면 profile 키를 무효화하고, 실패하면 캐시를 건드리지 않는다.
  이유: 클릭 즉시 숫자를 바꾸면 서버가 거절해도 화면만 팔로잉이 된다. 이 실습은 응답을 기다린 뒤 서버 프로필을 다시 읽어 맞춘다.
  실행: data가 없으면 null이라 버튼이 없다. 있으면 팔로우 또는 팔로잉이고, isPending이면 보내는 중… 이다. 실패하면 빨간 안내가 생기고 숫자와 글자는 이전 캐시다.
  활용: 낙관적 갱신 없이, 성공 후에만 관련 조회를 다시 하는 버튼에 쓴다.
*/

// ~/next-lab/app/p3-15/practicel/FollowButton.jsx
'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfile } from './useProfile.js';

async function changeFollow(following) {
  const response = await fetch('/p3-15/practice1/api/follow', {
    method: following ? 'PUT' : 'DELETE', // true면 팔로우, false면 취소 
  });
  
  if (!response.ok) {
    throw new Error(`팔로우를 바꾸지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function FollowButton() {
  const { data } = useProfile(); // ['profile'] 캐시
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: changeFollow,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] }); // 성공하면 프로필을 다시 받음  
    },
    onError: (error) => {
      console.error(error); // 실패는 캐시를 안 건드림  
    },
  });

  if (data === undefined) {
    return null; // 프로필이 아직 없으면 버튼 없음
  }

  let label = data.following ? '팔로잉' : '팔로우'; // 지금 상태

  if (isPending) {
    label = '보내는 중…';
  }

  return (
    <div className='mt-4'>
      <button  
        type='button'
        className='rounded border px-2'
        onClick={() => mutate(!data.following)} // 반대 상태로 요청
        disabled={isPending}>
        {label}    
        </button>
        {error && (
          <p className='mt-2 text-red-500'>
            팔로우를 바꾸지 못했어요. 잠시 뒤에 다시 눌러 주세요.
          </p>  
        )}
    </div>
  );
}
