/*
  복습: 좋아요를 서버에 보내기 전에 피드의 그 글만 먼저 바꾸기
  핵심: 켜려면 postApi.likePost, 끄려면 postApi.unlikePost다. 화면은 응답 전에 하트와 개수를 바꾼다.
  이유: 서버 답을 기다리면 하트가 늦게 움직인다. 실패하면 저장해 둔 캐시로 되돌린다.
  실행: liked가 true면 PUT, false면 DELETE다. 요청 전에 posts 쿼리를 멈추고 이전 데이터를 남긴다.
  활용: 하트 버튼과 사진 두 번 누르기가 같은 좋아요 요청을 쓸 때 쓴다.
*/

// ~/instagram-next/hooks/useLikePost.js
// 좋아요를 서버에 보내고, 응답 전에 피드 캐시의 그 글만 먼저 바꾼다.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MY_USER_ID } from '@/utils/me.js';
import { postApi } from '@/services/api.js';
// 받아 둔 페이지들을 돌며 게시물 하나만 바꾼 새 데이터를 만든다.
// change 는 그 게시물을 받아 바꿀 필드만 돌려주는 함수다.
function changePost(data, postId, change) {
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.map((post) =>
        post.id === postId ? { ...post, ...change(post) } : post,
      ),
    })),
  };
}

// liked는 바꾸고 싶은 상태. 켜려면 누르기, 끄려면 취소.
function changeLike({ postId, liked }) {
  return liked
    ? postApi.likePost(postId, MY_USER_ID)
    : postApi.unlikePost(postId, MY_USER_ID);
}

export function useLikePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: changeLike,
    // 서버 응답 전에 화면을 먼저 바꾼다.
    // 진행 중인 글 조회를 끊고, 실패하면 되돌릴 캐시를 남긴다.
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData(['posts']);
      
      // variables.liked가 true면 개수를 1 더하고, false면 1 뺀다.
      queryClient.setQueryData(['posts'], (data) => 
        changePost(data, variables.postId, (post) => ({
          liked: variables.liked,
          likeCount: post.likeCount + (variables.liked ? 1 : -1),  
        })),
      );
      
      return { previousPosts };
    },
    onSuccess: (result, variables) => {
      // 서버가 돌려준 {liked, likeCount } 로 그 게시물만 맞춘다.
      queryClient.setQueryData(['posts'], (data) => 
        changePost(data, variables.postId, () => result),
      );   
    },
    onError: async (error, variables, onMutateResult) => {
      // 남겨 둔 캐시로 화면을 되돌린다.
      queryClient.setQueryData(['posts'], onMutateResult.previousPosts);
      console.error(error);
      // 실패했을 때만 서버의 지금 모습을 다시 받는다.
      await queryClient.invalidateQueries({ queryKey: ['posts'] });  
    },
  });
}