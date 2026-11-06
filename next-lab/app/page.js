// ~/next-lab/app/page.js
// /. 이름, 프로필 사진, 지난 시간을 한 줄로 그린다.
import ProfileRow from '@/components/ProfileRow.jsx';

export default function Home() {
  return (
    <main>
      {/* minutes는 분. 180이면 화면에 3시간 전으로 나온다. */}
      <ProfileRow
        username='seungtae'
        profileImage='/profiles/seungtae-small.jpg'
        minutes={180}
      />
    </main>
  );
}
