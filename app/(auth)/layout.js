// ~/instagram-next/app/(auth)/layout.js
// (auth)는 주소에 안 붙는 그룹이다. /login과 /signup의 page가 children으로 들어온다.
// 두 화면이 이 main을 같이 쓴다.
import styles from './_components/AuthLayout.module.scss';

export default function AuthLayout({ children }) {
  // .authLayout이 이 main을 화면 가운데에 둔다.
  // 로그인 페이지의 휴대폰 이미지·폼, 가입 페이지의 카드가 children으로 이 안에 그려진다.
  return <main className={styles.authLayout}>{children}</main>;
}
