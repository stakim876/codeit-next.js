// ~/instagram-next/utils/formatDate.js
// 서버가 보낸 시각을 「10월 15일」 같은 날짜로 바꿔요.
export function formatDate(createdAt) {
  return new Date(createdAt).toLocaleDateString('ko-KR', {
    month: 'long', // 「10월」
    day: 'numeric', // 「15일」
    timeZone: 'Asia/Seoul', // 한국 날짜 기준으로 계산
  });
}