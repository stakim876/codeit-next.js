// ~instagram-next/app/(auth)/login/page.js
// App Router는 이 파일의 default export를 /login 화면으로 쓴다.
import layoutStyles from '../_components/AuthLayout.module.scss';
import styles from '../_components/LoginPage.module.scss';
import AuthCard from '../_components/AuthCard.jsx';

export default function LoginPage() {
  return (
    // 부모 레이아웃 안에 형제 둘(왼쪽 이미지, 오른쪽 폼)만 두므로 fragment로 묶는다.
    <>
     {/* 왼쪽: 인스타그램 앱이 보이는 휴대폰 이미지 */}
     <div className={layoutStyles.authImage}>
       <img
         src='/phones.png'
         alt='Instagram 앱 스크린샷' 
      />
    </div>

    {/* 오른쪽: 로고 카드 안에 로그인 폼 */}
    <div className={layoutStyles.authFormContainer}>
      {/* showLogo가 true면 카드 상단에 인스타그램 로고를 그린다 */}
      <AuthCard showLogo={true}>
        {/* noValidate: 브라우저 기본 검증 팝업을 끄고, 이후 직접 검증할 여지를 둔다 */}
        <form
          className={styles.authForm}
          noValidate>
          <div className={styles.formField}>
            <input
              type='text'
              name='username'
              placeholder='전화번호, 사용자 이름 또는 이메일'
              required
            />
          </div>
          <div className={styles.formField}>
            <input
              type='password'
              name='password'
              placeholder='비밀번호'
              required
            />
          </div>
          {/* type="submit"이라 이 버튼이 폼 제출을 일으킨다 */}
          <button
            type='submit'
            className={styles.authButton}   
            disabled>
            로그인
          </button>
        </form>
      </AuthCard>
    </div>
   </>                           
  );  
}
