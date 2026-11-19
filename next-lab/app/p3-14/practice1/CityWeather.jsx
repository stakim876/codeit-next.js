/*
  복습: 없는 도시는 재시도하지 않고, 그 외 실패는 두 번까지 다시 부르기
  핵심: queryKey에 city가 있어 도시마다 캐시가 다르다. retry 함수가 false를 반환하면 그 즉시 에러로 끝난다.
  이유: 404는 다시 불러도 그 도시 데이터가 생기지 않는다. 일시적인 500은 failureCount가 2보다 작은 동안 한 번 더 시도할 가치가 있다.
  실행: 서울과 부산은 1초 뒤 기온이 나온다. 대구는 API가 404라 retryWeather가 false를 주고, 재시도 없이 빨간 에러 문장이 나온다. 다른 도시를 누르면 그 도시의 캐시로 갈아탄다.
  활용: 잘못된 번호는 바로 끊고, 서버 장애만 짧게 재시도하는 조회에 쓴다.
*/

// ~/next-lab/app/p3-14/practice1/CityWeather.jsx
// 메모. 도시 버튼을 누르면 city가 바뀌고 queryKey ['weather', city]도 바뀐다. 도시마다 캐시가 따로다.
// 실패하면 error.status를 붙여 throw한다.
// retryWeather가 false를 주면 그 즉시 에러 문구. true면 다시 요청.
// 404는 false. 그 외는 실패 횟수가 2보다 작을 때만 true.
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const cities = [
  { id: "seoul", name: "서울" },
  { id: "busan", name: "부산" },
  { id: "daegu", name: "대구" },
];

async function getWeather(city) {
  const response = await fetch(`/p3-14/practice1/api?city=${city}`);

  if (!response.ok) {
    const error = new Error(`날씨를 불러오지 못했어요 (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

function retryWeather(failureCount, error) {
  if (error.status === 404) {
    return false;
  }

  return failureCount < 2;
}

export default function CityWeather() {
  const [city, setCity] = useState("seoul");
  const { data, isPending, error } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => getWeather(city),
    retry: retryWeather,
  });

  let result;

  if (isPending) {
    result = <p className="mt-4">불러오는 중…</p>;
  } else if (error) {
    result = <p className="mt-4 text-red-500">{error.message}</p>;
  } else {
    result = <p className="mt-4">{data.temperature}도</p>;
  }

  return (
    <section>
      <div className="flex gap-2">
        {cities.map((item) => (
          <button
            key={item.id}
            type="button"
            className={
              item.id === city
                ? "rounded border px-2 font-semibold"
                : "rounded border px-2"
            }
            onClick={() => setCity(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
      {result}
    </section>
  );
}
