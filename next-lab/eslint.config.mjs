/*
  복습: 실습 앱이 어떤 파일을 검사할지 정하기
  핵심: ESLint 설정은 규칙을 모은 목록이다. nextVitals는 Next가 권하는 화면 성능 규칙을 펼쳐 넣고, globalIgnores는 그 규칙이 닿지 않을 경로를 뺀다.
  이유: .next, out, build는 개발 서버와 빌드가 만든 결과다. 그 안을 검사하면 내가 쓴 코드가 아니라 생성 파일의 경고가 섞인다.
  실행: package.json의 lint가 이 파일을 읽는다. 무시 목록에 있는 경로는 규칙 계산 전에 빠진다. 그 밖 소스만 Next 기본 규칙을 받는다.
  활용: 배포 산출물, 자동 생성 타입은 검사에서 빼고, 사람이 고치는 소스만 규칙을 적용할 때 쓴다.
*/

// ~/next-lab/eslint.config.mjs
// 실습 앱의 검사 설정. package.json의 lint가 이 파일을 읽는다.
// Next가 만든 빌드 결과는 검사하지 않는다.
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals, // Next 기본 규칙
  // 아래 경로는 검사 대상에서 뺀다.
  globalIgnores([
    ".next/**", // 개발 서버가 만든 파일
    "out/**", // 정적 내보내기 결과
    "build/**", // 빌드 결과
    "next-env.d.ts", // Next가 만든 타입 선언
  ]),
]);

export default eslintConfig;
