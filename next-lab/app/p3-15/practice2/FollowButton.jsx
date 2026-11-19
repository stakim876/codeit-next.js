/*
  복습: 요청 전에 캐시를 고치고, 실패하면 그 이전으로 되돌리기
  핵심: onMutate는 요청 전에 실행된다. 이전 프로필을 저장한 뒤 setQueryData로 following과 숫자를 먼저 바꾼다. onError는 저장해 둔 이전 값으로 덮어쓴다. onSuccess의 invalidate는 서버 GET으로 확정한다.
  이유: 화면을 먼저 바꾸면 실패했을 때 되돌릴 복사본이 필요하다. getQueryData로 그 복사본을 컨텍스트에 넣어 onError의 세 번째 인자로 받는다.
  실행: 클릭은 반대 boolean을 mutate에 넘긴다. 버튼 글자는 data.following을 바로 읽으므로 캐시가 바뀌면 팔로잉과 팔로우가 즉시 바뀐다. 서버 PUT 안의 throw를 살리면 onError가 이전 프로필로 되돌리고 빨간 문구가 나온다.
  활용: 좋아요, 팔로우처럼 롤백이 있는 낙관적 갱신에 쓴다.
*/

// ~/next-lab/app/p3-15/practice2/FollowButton.jsx
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProfile } from './useProfile.js';

async function changeFollow(following) {
  const response = await fetch('/p3-15/practice2/api/follow', {
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
    onMutate: (following) => {
      const previousProfile = queryClient.getQueryData(['profile']); // 실패하면 되돌릴 프로필

      queryClient.setQueryData(['profile'], (profile) => ({
        ...profile,
        following, // 응답 전에 버튼 글자부터 바꿈
        followerCount: profile.followerCount + (following ? 1 : -1), // 숫자도 먼저 증감
      }));

      return { previousProfile };
    },
    onError: (error, following, onMutateResult) => {
      queryClient.setQueryData(['profile'], onMutateResult.previousProfile); // 실패하면 이전 프로필로
      console.error(error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] }); // 성공하면 서버 값으로 다시 맞춤
    },
  });

  if (data === undefined) {
    return null; // 프로필이 아직 없으면 버튼 없음
  }

  return (
    <div className='mt-4'>
      <button
        type='button'
        className='rounded border px-2'
        onClick={() => mutate(!data.following)} // 반대 상태로 요청
        disabled={isPending}>
        {data.following ? '팔로잉' : '팔로우'} {/* 캐시가 먼저 바뀌므로 글자도 바로 바뀜 */}
      </button>
      {error && (
        <p className='mt-2 text-red-500'>
          팔로우를 바꾸지 못했어요. 잠시 뒤에 다시 눌러 주세요.
        </p>
      )}
    </div>
  );
}
