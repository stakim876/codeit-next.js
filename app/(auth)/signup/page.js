// ~/instagram-next/app/(auth)/signup/page.js
// /signup. 가입 카드와, 계정이 있을 때 로그인으로 가는 카드를 그린다.
import Link from 'next/link';
import layoutStyles from '../_components/AuthLayout.module.scss';
// signupText와 loginCard는 이 scss에 있다. 다른 파일을 가져오면 클래스 이름이 비어서 스타일이 빠진다.
import styles from '../_components/SignupPage.module.scss';
import AuthCard from '../_components/AuthCard.jsx';
import SignupForm from '../_components/SignupForm.jsx';

export const metadata = {
  title: '가입하기', // 탭 제목. 루트 레이아웃 template의 %s에 들어간다.
};

export default function SignupPage() {
  return (
    <div className={layoutStyles.authFormContainer}>
      <AuthCard showLogo={true}>
        <p className={styles.signupText}>
          친구들의 사진과 동영상을 보려면 가입하세요.
        </p>
        <SignupForm />
      </AuthCard>

      <AuthCard className={styles.loginCard}>
        {/* Link가 이미 a를 그린다. 안내 문장은 p로 감싸고, 이동 주소는 href에 적는다. */}
        <p>
          계정이 있으신가요? <Link href='/login'>로그인</Link>
        </p>
      </AuthCard>
    </div>
  );  
}