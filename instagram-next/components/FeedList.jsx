/*
  복습: 글 목록을 두 개씩 이어서 받기
  핵심: postApi.getPage가 로그인한 사람의 id와 limit을 보내고, 다음 페이지부터는 cursor를 더한다.
  이유: 첫 페이지에 cursor=null을 실으면 서버가 그 글자를 커서로 읽는다. 커서는 두 번째 요청부터 넣는다.
  실행: me가 오기 전에는 요청하지 않는다. 맨 아래 칸이 보이면 다음 페이지를 요청하고, 카드에는 그 사람 번호를 viewerId로 넘긴다.
  활용: 피드를 스크롤할 때마다 다음 글을 붙일 때 쓴다.
*/

// ~/instagram-next/components/FeedList.jsx
// 글 목록을 두 개씩 이어서 받는다. 맨 아래가 보이면 다음 페이지를 요청한다.
// 쿼리와 스크롤 감지는 브라우저에서만 되므로 클라이언트 컴포넌트다.
'use client';

import { useRef, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styles from './FeedList.module.scss';
import stateStyles from './StatusMessage.module.scss';
import FeedItem from './FeedItem.jsx';
import FeedSkeleton from './FeedSkeleton.jsx';

import { postApi } from '@/services/api.js';
import { useMe } from '@/hooks/useMe.js';

// 한 번에 받아 오는 글 수.
const PER_PAGE = 2;

// pageParam이 있으면 그 글 다음부터, 없으면 첫 페이지를 받는다.
function getPostPage(userId, pageParam) {
  const params = { userId, limit: PER_PAGE };

  // 첫 페이지에는 커서가 없다. null을 그대로 넣으면 주소에 cursor=null이라는 글자가 실린다.
  if (pageParam !== null) {
    params.cursor = pageParam;
  }

  return postApi.getPage(params);
}

const FeedList = () => {
  const { data: me } = useMe();

  const {
    data,
    isPending,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', me?.id],
    queryFn: ({ pageParam }) => getPostPage(me.id, pageParam),
    // 누가 보는지 알기 전에는 보내지 않는다.
    enabled: me !== undefined,
    initialPageParam: null, // 첫 요청에는 cursor가 없다.
    // 다음 커서는 마지막 글의 id. hasNext가 없으면 null이라 요청을 멈춘다.
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.items[lastPage.items.length - 1].id : null,

    // 1. 탭 이동시 무분별한 재요청 차단
    staleTime: 10 * 60 * 1000, // 10분간 fresh 유지
    refetchOnWindowFocus: false, // 창 포커스 이동시 자동 refetch 비활성화

    maxPages: 5, // 아무리 많이 스크롤해도 메모리에는 5페이지까지만 저장해
  });

  // 목록 맨 아래 칸. 이 칸이 화면에 들어오면 다음 페이지를 받는다.
  const loaderRef = useRef(null);

  useEffect(() => {
    // 다음 페이지가 없거나 이미 받는 중이면 감시하지 않는다.
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    const target = loaderRef.current;
    if (target === null) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(target);

    // 조건이 바뀌면 이전 감시를 끊는다.
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 첫 페이지를 기다리는 동안은 글 모양의 빈 칸 두 개를 보여 준다.
  if (isPending) {
    return (
      <div className={styles.loader}>
        <FeedSkeleton />
        <FeedSkeleton />
      </div>
    );
  }

  // 한 번도 성공한 데이터가 없으면 목록 대신 실패 문구를 보여 준다.
  if (data === undefined) {
    return (
      <p className={stateStyles.errorText}>게시물을 불러오지 못했습니다.</p>
    );
  }

  // pages는 요청마다 쌓인 페이지. 그 안의 items를 한 목록으로 편다.
  const posts = data.pages.flatMap((page) => page.items);

  return (
    <>
      {/* 이미 받은 글은 두고, 다음 요청만 실패했을 때 위에 알린다. */}
      {error && (
        <p className={stateStyles.errorText}>게시물을 새로 받지 못했습니다.</p>
      )}
      <div className={styles.feedList}>
        {/* key는 글을 구분하는 id. 첫 사진만 바로 불러오려고 isFirst는 첫 글만 true다. */}
        {posts.map((post, index) => (
          <FeedItem
            key={post.id}
            postId={post.id}
            username={post.username}
            profileImage={post.profileImage}
            imageUrls={post.imageUrls}
            postAlt={post.postAlt}
            content={post.content}
            createdAt={post.createdAt}
            likeCount={post.likeCount}
            liked={post.liked}
            commentCount={post.commentCount}
            isFirst={index === 0}
            viewerId={me.id}
          />
        ))}
      </div>

      {/* 이 칸이 보이면 다음 페이지를 받고, 받는 동안 빈 칸을 보여 준다. */}
      <div
        ref={loaderRef}
        className={styles.loader}>
        {isFetchingNextPage && (
          <>
            <FeedSkeleton />
            <FeedSkeleton />
          </>
        )}
      </div>
    </>
  );
};

export default FeedList;
1;
