// ~/instagram-next/app/(auth)/login/page.js
// /login. 왼쪽 휴대폰 이미지, 로그인 폼, 아래의 가입 안내를 그린다.
import layoutStyles from '../_components/AuthLayout.module.scss';
import styles from '../_components/LoginPage.module.scss';
import AuthCard from '../_components/AuthCard.jsx';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '../_components/LoginForm.jsx';
import { Suspense } from 'react';

export const metadata = {
  title: '로그인',
};

export default function LoginPage() {
  return (
    <>
      <div className={layoutStyles.authImage}>
        <Image
          src='/phones.png'
          alt='Instagram 앱 스크린샷'
          width={842}
          height={1234}
          // style={{ height: 'auto' }}
          sizes='24vw'
          loading="eager" // 첫 화면에 바로 보여야 해서 늦게 불러오지 않는다.
        />
      </div>

      <div className={layoutStyles.authFormContainer}>
        <AuthCard showLogo={true}>
          <Suspense>
            <LoginForm />
          </Suspense>
        </AuthCard>

        <AuthCard className={styles.signupCard}>
          {/* Link가 a를 그린다. 안내를 a로 한 번 더 감싸면 링크가 겹친다. */}
          <p>
            계정이 없으신가요? <Link href='/signup'>가입하기</Link>
          </p>
        </AuthCard>  
      </div>
    </>
  );
}