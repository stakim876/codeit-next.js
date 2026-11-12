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
