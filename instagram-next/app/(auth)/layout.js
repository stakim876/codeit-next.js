// ~/instagram-next/app/(auth)/layout.js

// (auth)는 주소에 붙지 않는 묶음. 로그인 페이지가 children으로 들어온다.
import styles from './_components/AuthLayout.module.scss';

// 로그인 공통 레이아웃. 이미지와 폼을 화면 가운데에 나란히 둔다.
export default function AuthLayout({ children }) {
  // authLayout이 가로·세로 가운데 정렬을 담당한다. 페이지 내용은 children 자리에 들어간다.
  return <main className={styles.authLayout}>{children}</main>;
}
