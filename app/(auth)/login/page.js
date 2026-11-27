/*
  복습: 로그인 폼과 «또는» 아래에 구글 로그인 링크를 두기
  핵심: 소셜 로그인은 SocialLogin 하나다. provider로 구글, 카카오, 네이버를 고른다.
  이유: 링크가 주소의 ?next= 를 읽는다. 그 값은 요청이 와야 알 수 있으므로 폼처럼 Suspense로 감싼다.
  실행: /login 에서 로그인 버튼 아래 Google로 로그인, 카카오로 로그인, 네이버로 로그인이 순서대로 나온다.
  활용: 같은 링크를 제공자만 바꿔 여러 개 그릴 때 쓴다.
*/

// ~/instagram-next/app/(auth)/login/page.js
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import layoutStyles from "../_components/AuthLayout.module.scss";
import styles from "../_components/LoginPage.module.scss";
import AuthCard from "../_components/AuthCard.jsx";
import LoginForm from "../_components/LoginForm.jsx";
import Separator from "../_components/Separator.jsx";
import SocialLogin from "../_components/SocialLogin.jsx";

export const metadata = {
  title: "로그인",
};

export default function LoginPage() {
  return (
    <>
     <div className={layoutStyles.authImage}>
      <Image 
        src="/phones.png"
        alt="Instagram 앱 스크린샷"
        width={842}
        height={1234}
        sizes="24vw"
        style={{ height: "auto" }}
        loading="eager"
      />  
     </div>

     <div className={layoutStyles.authFormContainer}>
      <AuthCard showLogo={true}>
        {/* 주소의 ?username= 은 요청이 와야 알 수 있다 — 폼만 Suspense 로 감싼다. */}
        <Suspense>
          <LoginForm />
        </Suspense>

        <Separator />

        {/* 소셜 로그인 링크도 주소의 ?next= 를 읽는다 — 폼처럼 Suspense 로 감싼다. */}
        <Suspense>
          <SocialLogin provider="google" />
          <SocialLogin provider="kakao" />
          <SocialLogin provider="naver" />
        </Suspense>
      </AuthCard>    

      <AuthCard className={styles.signupCard}>
         <p>
          계정이 없으신가요? <Link href="/signup">가입하기</Link>
         </p>
      </AuthCard>
     </div>
    </>
  ); 
}