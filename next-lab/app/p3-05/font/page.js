/*
  복습: 한 문장에만 웹폰트 입히기
  핵심: next/font/google은 빌드 때 글꼴 파일을 받아 className을 만든다. 그 className을 붙인 요소와 자손만 그 글꼴을 쓴다.
  이유: body 전체에 붙이면 비교가 안 된다. 같은 문장을 두 번 두고 아래 문장에만 클래스를 주면 기본 글꼴과 차이를 바로 본다.
  실행: 첫 p는 상속된 글꼴이다. 둘째 p는 notoSansKr.className이 붙어 Noto Sans KR로 그린다. subsets가 latin이라 내려받는 범위는 라틴 문자다. 한글은 그 파일에 없으면 브라우저 기본 한글로 남는다.
  활용: 제목만 브랜드 글꼴을 쓰고 본문은 시스템 글꼴로 둘 때 쓴다.
*/

// ~/next-lab/app/p3-05/font/page.js
// /p3-05/font. 같은 문장을 기본 글꼴과 Noto Sans KR로 나란히 보여 준다.
import { Noto_Sans_KR } from 'next/font/google';

// 구글 글꼴을 받아 className으로 붙인다.
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
});

export default function FontPage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>글꼴을 바꿔봐요</h2>
      <p className='mt-4'>퇴근길에 한강이 너무 예뻤어요</p>
      {/* className이 있는 문장만 이 글꼴로 그린다. */}
      <p
        className={`mt-4 ${notoSansKr.className}`}>
        퇴근길에 한강이 너무 예뻤어요
      </p>
    </main>
  );
}
