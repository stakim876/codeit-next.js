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
