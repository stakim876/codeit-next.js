// ~/instagram-next/utils/formatDate.js
// posts의 createdAt(ISO 문자열)을 서울 시간 「10월 15일」로 바꿈.
export function formatDate(createdAt) {
  return new Date(createdAt).toLocaleDateString('ko-KR', {
    month: 'long', // 「10월」
    day: 'numeric', // 「15일」
    timeZone: 'Asia/Seoul', // 한국 날짜 기준으로 계산
  });
}