// ~/instagram-next/app/(auth)/signup/page.js
// (auth)는 주소에 안 붙는 그룹이다. 이 파일의 default export가 /signup 화면이 된다.
// 이 페이지는 서버 컴포넌트다. 입력·검증·가입 요청은 클라이언트인 SignupForm이 맡는다.
import Link from 'next/link';
import layoutStyles from '../_components/AuthLayout.module.scss';
import styles from '../_components/SignupPage.module.scss';
import AuthCard from '../_components/AuthCard.jsx';
import SignupForm from '../_components/SignupForm.jsx';

// 탭 제목. 루트 template의 %s에 들어가 「가입하기 • Instagram」이 된다.
export const metadata = {
  title: '가입하기',  
};

export default function SignupPage() {
  return (
    // 폼 칸. 너비는 AuthLayout의 .authFormContainer(최대 350px)가 정한다.
    <div className={layoutStyles.authFormContainer}>
      {/* showLogo가 true면 카드 상단에 인스타그램 로고를 그린다. */}
      <AuthCard showLogo={true}>
        {/* .signupText — 회색 가운데 안내 문장 */}
        <p className={styles.signupText}>
          친구들의 사진과 동영상을 보려면 가입하세요.   
        </p>
        {/* 칸, 중복 확인, 가입 버튼은 SignupForm 안에 있다. */}
        <SignupForm />
        </AuthCard>  

        {/* .loginCard가 이 카드의 문장과 링크 색·굵기를 정한다.
            Link는 /login 화면으로 보낸다. */}
        <AuthCard className={styles.loginCard}>
          <p>
            계정이 있으신가요? <Link href='/login'>로그인</Link>
          </p>  
        </AuthCard>
    </div>
  );  
}