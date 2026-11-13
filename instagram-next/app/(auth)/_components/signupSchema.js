// ~/instagram-next/app/(auth)/_components/signupSchema.js
import { z } from 'zod';

// 공백 없이 로컬@도메인.끝 형태인지만 본다. refine 안에서만 쓰고 밖으로 내보내지 않는다.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 010으로 시작한다. 가운데와 뒤의 하이픈은 있어도 되고 없어도 된다.
// SignupForm은 PHONE.test로 연락처를 phone / email 중복 확인 중 어디로 보낼지 가른다.
export const PHONE = /^010-?\d{4}-?\d{4}$/;

// 서버의 schemas/authScheme.js 와 같은 규칙이다 ㅡ 보내기 전에 화면에서 먼저 알려 주려고 한 벌 더 둔다.
// 키 이름은 form state, input name, 가입 API body와 같다.
// 한 칸의 검사는 위에서 아래로 이어지고, 화면은 그 칸에서 처음 실패한 문장만 보여 준다.
export const signupSchema = z.object({
  // trim()이 앞뒤 공백을 자른 뒤의 값으로 다음 검사가 이어진다.
  // 이메일이나 휴대폰 번호 중 하나면 통과한다. 빈 칸도 여기서 같은 문장으로 거절된다.
  emailOrPhone: z
    .string()
    .trim()
    .refine((value) => EMAIL.test(value) || PHONE.test(value), {
      error: '이메일 주소나 휴대폰 번호를 적어 주세요',  
    }), 
  // 공백만 있는 이름은 trim 뒤 빈 문자열이 되어 min(1)에 걸린다.
  name: z.string().trim().min(1, { error: '성명을 적어 주세요' }),
  // 앞뒤 공백을 자르지 않는다. 공백은 30자에 포함되고, 아래 정규식에서도 거절된다.
  // 비어 있으면 min, 31자 이상이면 max, 허용 밖 글자면 regex 문장이 먼저 나온다.
  username: z 
    .string()
    .min(1, { error: '사용자 이름을 적어 주세요' })
    .max(30, { error: '사용자 이름은 30자까지 쓸 수 있어요' })
    .regex(/^[a-zA-Z0-9._]+$/, {
      error: '사용자 이름은 영문, 숫자, 밑줄(_), 마침표(.)만 쓸 수 있어요',  
    }),
 // 길이만 본다. 8자 미만이면 빈 칸도 같은 문장으로 거절된다.
 password: z.string().min(8, { error: '비밀번호는 8자 이상이어야 해요' }),       
});