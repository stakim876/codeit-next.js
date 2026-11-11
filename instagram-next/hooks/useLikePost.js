// ~/instagram-next/hooks/useLikePost.js
// 좋아요를 서버에 보내고, 응답 전에 피드 캐시의 그 글만 먼저 바꾼다.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MY_USER_ID } from '@/utils/me.js';
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

// liked가 true면 좋아요, false면 취소를 게시물 서버에 보낸다.
async function changeLike({ postId, liked }) {
  const response = await fetch(`/api/posts/${postId}/likes/${MY_USER_ID}`, {
    method: liked ? 'PUT' : 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`좋아요를 바꾸지 못했어요 (${response.status})`);
  }

  return response.json();
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