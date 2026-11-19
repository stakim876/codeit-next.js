/*
  복습: 브라우저 버튼이 서버 함수를 호출하기
  핵심: 'use server' 파일의 export는 서버 액션이다. 클라이언트는 그 함수를 직접 실행하지 않고, 서버에 호출을 보낸다. refresh()는 그 뒤 서버 컴포넌트가 메모리의 새 목록을 다시 읽게 한다.
  이유: 찜 목록은 서버 메모리에 있다. 브라우저에서 배열을 고치면 헤더의 권수는 그대로다. 서버에서 고치고 화면을 새로 받아야 개수가 맞다.
  실행: wish는 id가 없을 때만 push한다. 이미 있으면 길이가 그대로다. unwish는 indexOf가 -1이면 splice하지 않는다. 둘 다 끝나면 refresh()다.
  활용: 찜, 장바구니 추가처럼 폼이나 버튼이 서버 데이터를 바꿀 때 쓴다.
*/

'use server'

import { refresh } from "next/cache";
import { wishlist } from "./_data/wishlist.js";

export async function wish(id) {

  if (!wishlist.includes(id)) {
    wishlist.push(id);
  }
  refresh();
}

export async function unwish(id) {

  const index = wishlist.indexOf(id);

  if (index !== -1) {
    wishlist.splice(index, 1);
  }
  refresh();
}
