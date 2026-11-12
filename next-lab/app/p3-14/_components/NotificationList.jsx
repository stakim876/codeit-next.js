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