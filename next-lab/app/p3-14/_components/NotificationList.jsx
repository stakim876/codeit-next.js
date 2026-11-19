/*
  복습: 새로 받기 실패해도 이전에 받은 목록은 남기기
  핵심: isPending일 때만 목록 없이 return한다. 그 뒤의 error는 위 문구로만 보여주고 data는 계속 그린다. 캐시가 한 번도 없으면 throwOnError가 페이지를 error.js로 보낸다.
  이유: 갱신 실패와 첫 로딩 실패는 다르다. 이미 보여 주던 알림까지 지우면 서버가 잠깐 죽어도 목록이 빈다.
  실행: 다시 시도는 refetch()다. 읽음은 한 건 PATCH이고 성공하면 notifications 키를 무효화해 배지 select도 다시 계산된다. 누르는 동안 그 id만 보내는 중… 이다.
  활용: 이전 데이터를 유지한 채 재시도 버튼을 다는 목록에 쓴다.
*/

// ~/next-lab/app/p3-14/_components/NotificationList.jsx
// 메모. select 없이 호출해서 data는 알림 배열이다.
// isPending이면 그릴 목록이 없으니 '불러오는 중'만 보여주고 return.
// 그 다음엔 error가 있어도 return하지 않는다. 위는 실패 문구, 아래는 이전 data.
// '다시 시도'는 refetch(). '읽음'은 mutation이고, 성공하면 invalidateQueries.
// 같은 키를 다시 받으므로 배지 개수도 같이 바뀐다.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from './useNotifications.js';

async function readNotification(id) {
  const response = await fetch(`/p3-14/api/notifications/${id}/read`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error(`알림을 읽음으로 바꾸지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function NotificationList() {
  const { data, isPending, isFetching, error, refetch } = useNotifications();
  const queryClient = useQueryClient();
  const readOne = useMutation({
    mutationFn: readNotification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  if (isPending) {
    return <p className='mt-4'>불러오는 중…</p>;
  }

  return (
    <>
      {error && (
        <p className='mt-4 text-red-500'>
          알림을 새로 받지 못했어요. 아래는 그전에 받은 알림이에요.
          <button
            type='button'
            className='ml-2 rounded border px-2'
            onClick={() => refetch()}
            disabled={isFetching}>
            {isFetching ? '받는 중…' : '다시 시도'}
          </button>
        </p>
      )}
      <ul className='mt-4 space-y-2'>
        {data.map((item) => (
          <li
            key={item.id}
            className={item.isRead ? 'text-gray-400' : ''}>
            {item.text}
            {!item.isRead && (
              <button
                type='button'
                className='ml-2 rounded border px-2'
                onClick={() => readOne.mutate(item.id)}
                disabled={readOne.isPending}>
                {readOne.isPending && readOne.variables === item.id
                  ? '보내는 중…'
                  : '읽음'}
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}