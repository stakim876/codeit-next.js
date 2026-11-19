// ~/instagram-next/app/(auth)/_components/useDuplicateCheck.js
import { useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '@/hooks/useDebouncedValue.js';
import { authApi } from '@/services/api.js';

// 규칙을 통과한 값이면 서버에 «누가 이미 쓰고 있나» 를 묻는다 ㅡ 입력이 0.5초 멈춘 뒤에만.
export function useDuplicateCheck(type, value, valid) {
  // 0.5초 동안 안 바뀐 값. 쿼리와 아래 return이 같은 이름 settled를 읽어야 한다.
  const settled = useDebouncedValue(value, 500);
  const { data } = useQuery({ 
    queryKey: ["check-duplicate", type, settled],
    queryFn: () => authApi.checkDuplicate(type, settled),
    // 규칙에 맞고, 디바운스가 끝난 값과 지금 입력이 같을 때만 서버에 묻는다.
    enabled: valid && settled === value,
  });
  
  // 아직 치는 중이면 물어본 값과 지금 값이 달라서, 답이 있어도 지금 값의 답이 아니다. 
  return settled === value ? data : undefined;
}