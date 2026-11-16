/*
  복습: 아이디와 이메일이 이미 쓰였는지 입력이 멈춘 뒤에 묻기
  핵심: 규칙을 통과하고 0.5초 동안 값이 그대로면 authApi.checkDuplicate를 부른다.
  이유: 글자마다 서버에 물으면 요청이 너무 많다. 아직 치는 중이면 이전 답을 지금 값의 답으로 쓰지 않는다.
  실행: settled가 value와 같을 때만 쿼리가 켜진다. 답이 와도 둘이 다르면 undefined를 돌려준다.
  활용: 가입 칸 아래에 중복 문장을 보여줄 때 쓴다.
*/

// ~/instagram-next/app/(auth)/_components/useDuplicateCheck.js
import { useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '@/hooks/useDebouncedValue.js';
import { authApi } from '@/services/api.js';

// 규칙을 통과한 값이면 서버에 «누가 이미 쓰고 있나» 를 묻는다 ㅡ 입력이 0.5초 멈춘 뒤에만.
export function useDuplicateCheck(type, value, valid) {
  const settled = useDebouncedValue(value, 500);
  const { data } = useQuery({
    queryKey: ["check-duplicate", type, settled],
    queryFn: () => authApi.checkDuplicate(type, settled),
    enabled: valid && settled === value,
  });
  
  // 아직 치는 중이면 물어본 값과 지금 값이 달라서, 답이 있어도 지금 값의 답이 아니다.
  return settled === value ? data : undefined;
}