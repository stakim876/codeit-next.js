// ~/instagram-next/app/actions.js
// 좋아요를 서버의 글 데이터에서 바꾸고, 바뀐 개수가 화면에 다시 나오게 한다.
// 'use server'가 있으면 이 함수들은 서버에서 실행되고, 브라우저에서 부를 수 있다.
"use server";

import { revalidatePath } from "next/cache";
import { posts } from "@/data/posts.js";

// posts에서 id가 같은 글을 찾는다. 없으면 에러를 던진다.
function findPost(postId) {
  const post = posts.find((item) => item.id === postId);

  if (post === undefined) {
    throw new Error(`${postId}번 게시물은 없어요`);
  }

  return post;
}

// 아직 좋아요가 아니면 표시하고 개수를 1 올린다.
export async function likePost(postId) {
  const post = findPost(postId);

  if (!post.liked) {
    post.liked = true;
    post.likeCount += 1;
  }

  // 서버 데이터가 바뀌었으니 현재 페이지를 다시 받아 온다.
  revalidatePath("/");
}

// 좋아요가 있으면 해제하고 개수를 1 내린다.
export async function unlikePost(postId) {
  const post = findPost(postId);

  if (post.liked) {
    post.liked = false;
    post.likeCount -= 1;
  }

  revalidatePath("/");
}
