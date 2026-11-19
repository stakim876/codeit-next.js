/*
  복습: 찜 쌍을 상품 목록에 붙여 응답하기
  핵심: products는 이름과 찜 개수, wishes는 누가 어떤 상품을 찜했는지다. userId가 그 쌍과 맞으면 wished가 true다.
  이유: 찜 개수는 모든 사용자에게 같고, 내가 찜했는지만 요청한 사람에 따라 다르다. 응답을 만들 때 둘을 합치면 클라이언트가 표를 다시 찾지 않는다.
  실행: 1초 뒤 세 상품을 준다. userId 1은 3번 필름 카메라 스트랩만 내가 찜함, userId 2는 1번 토트백만 true다. userId가 없으면 Number(null)은 0이라 어떤 쌍과도 맞지 않아 wished는 전부 false다.
  활용: 좋아요 여부와 좋아요 수를 한 목록 응답에 넣는 API에 쓴다.
*/

// ~/next-lab/app/p3-17/practice1/api/route.js
import { products, wishes } from '../_data/products.js';

export async function GET(request) {
  const userId = Number(request.nextUrl.searchParams.get('userId'));
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 보는 사람이 찜한 상품이면 wished 가 true 다. userId 가 없으면 0 이라 아무것도 안 맞는다.
  const items = products.map((product) => ({
    ...product,
    wished: wishes.some(
      (wish) => wish.productId === product.id && wish.userId === userId,
    ),
  }));

  return Response.json(items);
}
