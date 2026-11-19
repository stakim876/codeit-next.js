/*
  복습: 서버 액션이 끝나는 동안 버튼을 잠그기
  핵심: useTransition의 startTransition은 비동기 작업을 전환으로 감싼다. isPending이 true인 동안 버튼은 disabled라 같은 요청이 겹치지 않는다.
  이유: 응답 전에 여러 번 누르면 wish와 unwish가 순서를 앞지를 수 있다. 진행 중에는 입력을 막고, 끝나면 서버가 넘긴 wished로 글자가 다시 그려진다.
  실행: wished가 true면 클릭 시 unwish(id), false면 wish(id)다. aria-busy는 진행 중임을 보조기기에 알린다. 액션과 refresh가 끝난 뒤에야 헤더 권수와 글자가 함께 바뀐다.
  활용: 저장 버튼처럼 서버 왕복이 있는 토글에 쓴다.
*/

'use client'

import { useTransition } from 'react';
import { wish, unwish } from '../actions.js';

const WishButton = ({ id, wished }) => {
  const [isPending, startTransition] = useTransition();

  const handleWishClick = () => {
    startTransition(async () => {
      if (wished) {
        await unwish(id);
      } else {
        await wish(id);
      }
    });
  };
  return (
    <button
      type='button'
      className='rounded border px-2'
      onClick={handleWishClick}
      disabled={isPending}
      aria-busy={isPending}
    >
      { wished ? "찜 취소" : "찜하기" }
    </button>
  );
};

export default WishButton;
