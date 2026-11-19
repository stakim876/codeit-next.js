/*
  복습: 주소 / 에 해당하는 첫 화면
  핵심: app/page.js는 폴더 경로가 곧 주소다. 이 파일은 경로가 없으므로 / 를 연다. default export가 그 주소에 그릴 화면이다.
  이유: 서버가 HTML 파일을 하나씩 두는 대신, 폴더 이름이 주소를 만들면 파일을 추가하는 것만으로 페이지가 생긴다.
  실행: ProfileRow에 username, 사진 경로, minutes 180을 넘긴다. 180은 분이므로 TimeAgo가 60으로 나눠 3시간 전으로 그린다. 이 페이지는 상태를 갖지 않아 서버에서 HTML로 만들 수 있다.
  활용: 사이트 첫 화면, 프로필 한 줄을 조합해 보여 주는 진입점에 쓴다.
*/

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
