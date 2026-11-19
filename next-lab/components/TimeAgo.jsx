/*
  복습: 분 단위 숫자를 사람이 읽는 시간으로 바꾸기
  핵심: minutes가 60보다 작으면 분으로, 아니면 60으로 나눈 몫을 시간으로 보여 준다. Math.floor는 소수점을 버린다.
  이유: 180을 그대로 보여 주면 사용자는 3시간인지 계산해야 한다. 경계값을 한 컴포넌트에 두면 호출하는 쪽은 분 숫자만 넘기면 된다.
  실행: 59는 59분 전, 60은 1시간 전, 180은 3시간 전이다. 24시간을 넘어도 일 단위로 바뀌지 않고 시간만 커진다. 90분은 1시간 전으로 30분이 버려진다.
  활용: 게시 시각, 마지막 접속처럼 상대 시간을 짧게 보여줄 때 쓴다.
*/

// ~/next-lab/components/TimeAgo.jsx
const TimeAgo = ({ minutes }) => {
  if (minutes < 60) {
    return <span>{minutes}분 전</span>;
  }

  return <span>{Math.floor(minutes / 60)}시간 전</span>;
};

export default TimeAgo;
