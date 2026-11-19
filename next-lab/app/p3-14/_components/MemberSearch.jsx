/*
  복습: 글자가 있을 때만 요청하고, 검색어마다 캐시를 나누기
  핵심: queryKey에 keyword가 들어가면 글자가 바뀔 때마다 다른 캐시다. enabled가 false면 queryFn을 호출하지 않아 isPending이어도 요청은 없다.
  이유: 빈 칸에서 요청하면 keyword null 조회가 나간다. 빈 칸 안내는 서버 결과가 아니라 입력값으로 먼저 그린다. 같은 글자를 다시 치면 60초 안의 캐시를 바로 보여 준다.
  실행: 빈 칸은 찾을 사람의 이름을 입력해 보세요다. 글자가 있으면 찾는 중, 실패면 error.message, 빈 배열이면 검색 결과가 없어요, 있으면 username과 name이다.
  활용: 자동완성처럼 입력이 비면 요청을 멈추고, 검색어별로 결과를 잠시 보관할 때 쓴다.
*/

// ~/next-lab/app/p3-14/_components/MemberSearch.jsx
// 메모. 글자를 칠 때마다 keyword가 바뀌고 queryKey도 ['members', keyword]로 바뀐다.
// enabled가 false(빈 칸)면 요청 자체를 안 한다. 안내 문구는 아래 if에서 직접 그린다.
// 값이 있으면 API를 치고, 그 검색어 결과는 60초 동안 신선하다.
// 같은 글자를 다시 치면 캐시를 바로 보여 준다.
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

async function searchMembers(keyword) {
  const response = await fetch(`/p3-14/api/members?keyword=${keyword}`);

  if (!response.ok) {
    throw new Error(`사람을 찾지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function MemberSearch() {
  const [keyword, setKeyword] = useState("");

  const { data, isPending, error } = useQuery({
    queryKey: ["members", keyword],
    queryFn: () => searchMembers(keyword),
    enabled: keyword !== "",
    staleTime: 60 * 1000,
  });

  let result;

  if (keyword === "") {
    result = <p className="mt-4">찾을 사람의 이름을 입력해 보세요</p>;
  } else if (isPending) {
    result = <p className="mt-4">찾는 중...</p>;
  } else if (error) {
    result = <p className="mt-4">{error.message}</p>;
  } else if (data.length === 0) {
    result = <p className="mt-4">검색 결과가 없어요</p>;
  } else {
    result = (
      <ul className="mt-4 list-disc pl-6">
        {data.map((member) => (
          <li key={member.username}>
            {member.username} ({member.name})
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="mt-4">
      <input
        className="rounded border px-2"
        placeholder="사용자 이름"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      {result}
    </section>
  );
}
