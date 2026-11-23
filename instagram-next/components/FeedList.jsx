/*
  복습: 글 목록을 두 개씩 이어서 받기
  핵심: postApi.getPage는 limit만 보내고, 다음 페이지부터는 cursor를 더한다. 누가 보는지는 서버가 로그인 정보로 정한다.
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

// pageParam이 있으면 그 글 다음부터, 없으면 첫 페이지를 받는다. 사람 번호는 보내지 않는다.
function getPostPage(pageParam) {
 const params = { limit: PER_PAGE };
 
 // 첫 페이지에는 커서가 없다 ㅡ null 을 그대로 넣으면 주소에 cursor=null 이라는 글자가 실린다.
 if (pageParam !== null) {
  params.cursor = pageParam;
 }

 return postApi.getPage(params);
}

const FeedList = () => {

  // 로그인한 사람. 이 번호는 목록 캐시 키에만 쓰고, 요청에는 실리지 않는다.
  const { data: me } = useMe();
  const {
    data, 
    isPending,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
     // 누가 보느냐에 따라 liked 가 달라진다 — 서버는 로그인 정보로 정하고, 화면은 보는 사람의 번호를 키에 넣는다.
    queryKey: ['posts', me?.id],
    queryFn: ({ pageParam }) => getPostPage(pageParam),
    // 누가 보는지 알기 전에는 보내지 않는다.
    enabled: me !== undefined,
    initialPageParam: null, // 첫 요청에는 cursor가 없다.
    // 서버가 준 커서를 그대로 돌려준다 — 끝이면 null 이 와서 다음 페이지가 없다.
    getNextPageParam: (lastPage) => lastPage.nextCursor,

    // 아래를 켜면 10분간 다시 받지 않고, 창으로 돌아와도 다시 받지 않으며, 메모리에는 5페이지만 남긴다.
    // staleTime: 10 * 60 * 1000, // 10분간 fresh 유지
    // refetchOnwindowFocus: false, // 창 포커스 이동시 자동 refetch 비활성화 

    // maxPages: 5, // 아무리 많이 스크롤해도 메모리에는 5페이지까지만 저장해 
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

    // 맨 아래 칸이 보이면 다음 페이지를 요청한다.
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(target);

    // 조건이 바뀌거나 화면을 떠나면 감시를 끊는다.
    return () => observer.disconnect();
}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

// 첫 목록을 받는 동안은 뼈대 두 줄을 보여 준다.
if (isPending) {
  return (
   <div className={styles.loader}> 
    <FeedSkeleton />
    <FeedSkeleton />
  </div>  
  );
}

// 목록 자체가 없으면 실패 문구만 보여 준다.
if (data === undefined) {
  return (
    <p className={stateStyles.errorText}>게시물을 불러오지 못했습니다.</p>
  );
}

// 페이지마다 들어 있는 글을 한 배열로 편다.
const posts = data.pages.flatMap((page) => page.items);


return (
  <>
    {/* 다음 페이지가 실패해도, 이미 받아 둔 글은 그대로 둔다. */}
    {error && (
      <p className={stateStyles.errorText}>게시물을 새로 받지 못했습니다.</p>
    )}
    <div className={styles.feedList}>
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
          isFirst={index === 0} // 첫 글만 사진을 바로 불러온다.
          viewerId={me.id} // 좋아요 캐시 키에 쓰는 보는 사람의 번호.
        />  
      ))}
    </div>

    {/* 이 칸이 보이면 다음 페이지를 받고, 받는 동안 뼈대를 붙인다. */}
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
