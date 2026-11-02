// ~/instagram-next/app/(auth)/layout.js
// (auth) 구간 공통 레이아웃. 이 아래 페이지(로그인 등)가 children으로 들어온다.
import styles from './_components/AuthLayout.module.scss';

export default function AuthLayout({ children }) {
  // children을 가로·세로 가운데로 두는 main. 로그인 페이지의 이미지와 폼이 이 안에 나란히 놓인다.
  return <main className={styles.authLayout}>{children}</main>;  
}
