/*
  복습: 좋아요는 로그인 세션으로 보내고, 화면은 응답 전에 먼저 바꾸기
  핵심: likePost와 unlikePost에는 글 번호만 넘긴다. 사람 번호는 캐시 키에만 쓴다.
  이유: 누가 눌렀는지는 서버가 로그인 정보로 정한다. 서버 답을 기다리면 하트가 늦게 움직인다.
  실행: liked가 true면 PUT /likes/me, false면 DELETE다. 캐시 키는 ['posts', userId]다. 요청 전에 그 쿼리를 멈추고, 실패하면 저장해 둔 캐시로 되돌린다.
  활용: 하트 버튼과 사진 두 번 누르기가 같은 좋아요 요청을 쓸 때 쓴다.
*/

// ~/instagram-next/hooks/useLikePost.js
// 좋아요를 서버에 보내고, 응답 전에 피드 캐시의 그 글만 먼저 바꾼다.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '@/services/api.js';

// liked 는 «바꾸고 싶은» 상태 — 켜려면 누르기, 끄려면 취소. 누가 누르는지는 서버가 로그인 정보로 정한다.
function changeLike({ postId, liked }) {
  return liked ? postApi.likePost(postId) : postApi.unlikePost(postId);
}

// 받아 둔 페이지들을 돌며 게시물 하나만 바꾼 새 데이터를 만든다.
// change 는 그 게시물을 받아 바꿀 필드만 돌려주는 함수다.
function changePost(data, postId, change) {
  // 아직 받아 둔 목록이 없으면 pages가 없다. 그대로 읽으면 에러가 난다.
  if (!Array.isArray(data?.pages)) {
    return data;
  }

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: (page.items ?? []).map((post) =>
        post.id === postId ? { ...post, ...change(post) } : post,
      ),
    })),
  };
}

// userId 는 지금 보는 사람 — 목록을 받은 FeedList 가 카드에 내려 준다. 캐시 키를 맞추는 데만 쓴다.
export function useLikePost(userId) {
  const queryClient = useQueryClient();
  // 피드 목록과 같은 키 — 보는 사람의 번호까지 맞아야 같은 캐시다.
  const postsKey = ['posts', userId];

  return useMutation({
    mutationFn: changeLike,
    // 서버 응답 전에 화면을 먼저 바꾼다.
    // 진행 중인 글 조회를 끊고, 실패하면 되돌릴 캐시를 남긴다.
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: postsKey });
      const previousPosts = queryClient.getQueryData(postsKey);

      // variables.liked가 true면 개수를 1 더하고, false면 1 뺀다.
      queryClient.setQueryData(postsKey, (data) =>
        changePost(data, variables.postId, (post) => ({
          liked: variables.liked,
          likeCount: (post.likeCount ?? 0) + (variables.liked ? 1 : -1),
        })),
      );

      return { previousPosts };
    },
    onSuccess: (result, variables) => {
      // 서버가 돌려준 { liked, likeCount } 로 그 게시물만 맞춘다.
      queryClient.setQueryData(postsKey, (data) =>
        changePost(data, variables.postId, () => result),
      );
    },
    onError: async (error, variables, onMutateResult) => {
      // 남겨 둔 캐시로 화면을 되돌린다. onMutate가 끝나기 전에 실패하면 되돌릴 값이 없다.
      if (onMutateResult !== undefined) {
        queryClient.setQueryData(postsKey, onMutateResult.previousPosts);
      }
      console.error(error);
      // 실패했을 때만 서버의 지금 모습을 다시 받는다.
      await queryClient.invalidateQueries({ queryKey: postsKey });
    },
  });
}
