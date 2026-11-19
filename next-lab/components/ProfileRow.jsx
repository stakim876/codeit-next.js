/*
  복습: 사진과 이름, 지난 시간을 한 줄로 조합하기
  핵심: ProfileRow는 받은 값을 그리기만 한다. 몇 분인지를 문장으로 바꾸는 일은 TimeAgo에 넘긴다.
  이유: 시간 계산을 이 파일에 적으면 댓글, 스토리처럼 같은 문장이 필요한 곳이 생길 때마다 조건이 복제된다. 한 줄 레이아웃과 시간 문장의 책임이 갈린다.
  실행: username은 굵은 글, profileImage는 둥근 img의 src, minutes는 TimeAgo로 내려간다. 이 파일은 useState가 없어 서버 컴포넌트로도 호출된다.
  활용: 피드 작성자, 댓글 작성자처럼 같은 가로 줄을 반복할 때 쓴다.
*/

// ~/next-lab/components/ProfileRow.jsx
import TimeAgo from './TimeAgo.jsx';

const ProfileRow = ({ username, profileImage, minutes }) => {
  return (
    <div className='flex items-center gap-3'>
      <img
        src={profileImage}
        alt={`${username}의 프로필`}
        className='w-10 h-10 rounded-full'
      />
      <div>
        <p className='font-semibold'>{username}</p>
        <p className='text-xs text-gray-500'>
          <TimeAgo minutes={minutes} />
        </p>
      </div>
    </div>
  );
};

export default ProfileRow;
