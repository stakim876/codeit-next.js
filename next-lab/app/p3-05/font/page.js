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
