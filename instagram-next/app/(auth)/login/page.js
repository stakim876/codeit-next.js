/*
  복습: 로그인 화면은 배치만 하고, 폼은 Suspense 안에 두기
  핵심: 이 파일은 서버 컴포넌트다. 휴대폰 이미지와 카드만 배치하고, 입력은 LoginForm에 맡긴다.
  이유: LoginForm이 useSearchParams를 쓴다. Suspense로 감싸지 않으면 Next가 검색 값 때문에 이 페이지 전체를 클라이언트 렌더로 미룬다.
  실행: /login 에서 왼쪽은 휴대폰 이미지, 오른쪽 위 카드는 로그인 폼, 아래 카드는 /signup 링크다.
  활용: 주소 값을 읽는 조각만 경계 안에 두고, 나머지 화면은 서버에서 보낼 때 쓴다.
*/

// ~/instagram-next/app/(auth)/login/page.js
// App Router는 이 파일의 default export를 /login 화면으로 쓴다.
import layoutStyles from '../_components/AuthLayout.module.scss';
import styles from '../_components/LoginPage.module.scss';
import AuthCard from '../_components/AuthCard.jsx';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '../_components/LoginForm.jsx';
import { Suspense } from 'react';

// 탭 제목. 루트 template의 %s에 들어가 「로그인 • Instagram」이 된다.
export const metadata = {
  title: '로그인',
};

export default function LoginPage() {
  return (
    // 부모 레이아웃 안에 형제 둘(왼쪽 이미지, 오른쪽 폼)만 두므로 fragment로 묶는다.
    <>
     {/* 왼쪽: 인스타그램 앱이 보이는 휴대폰 이미지.
         첫 화면에 바로 보이므로 eager로 받고, sizes는 가로의 약 24%만 쓴다고 알린다. */}
     <div className={layoutStyles.authImage}>
       <Image
         src='/phones.png'
         alt='Instagram 앱 스크린샷'
         width={842}
         height={1234}
         // style={{ height: 'auto' }}
         sizes='24vw'
         loading="eager"
         />
     </div>

     {/* 오른쪽: 로고 카드 안에 로그인 폼 */}
     <div className={layoutStyles.authFormContainer}>
       {/* showLogo가 true면 카드 상단에 인스타그램 로고를 그린다 */}
       <AuthCard showLogo={true}>
         <Suspense>
           <LoginForm />
         </Suspense>
       </AuthCard>

       <AuthCard className={styles.signupCard}>
         <p>
           계정이 없으신가요? <Link href='/signup'>가입하기</Link>
         </p>
       </AuthCard>
     </div>
    </>
  );
}
