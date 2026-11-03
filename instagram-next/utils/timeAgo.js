// ~/instagram-next/utils/timeAgo.js
// 서버가 보낸 시각을 「12분 전」 같은 글자로 바꿔요.
export function timeAgo(createdAt) {
  // 지금과 글 시각의 차이. Date.parse는 글자 시각을 밀리초로 바꿈.
  const passed = Date.now() - Date.parse(createdAt);
  const minutes = Math.floor(passed / (60 * 1000));

  if (minutes < 1) {
    return "방금 전";
  }
  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  // 60분부터는 시간. 하루가 안 되면 여기서 끝.
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}시간 전`;
  }

  // 하루가 넘으면 일. 7일이 안 되면 주 대신 일을 보여 줌.
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days}일 전`;
  }

  return `${Math.floor(days / 7)}주 전`;
}
