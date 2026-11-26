import { cacheLife } from "next/cache";

// ~/instagram-next/data/profiles.js
export const profiles = [
  {
    username: 'seungtae',
    name: '김승태',
    profileImage: '/profiles/seungtae.jpg',
    postCount: 3,
    followerCount: 1240,
    followingCount: 312,
  },
  {
    username: 'minji',
    name: '이민지',
    profileImage: '/profiles/minji.jpg',
    postCount: 3,
    followerCount: 8520,
    followingCount: 401,
  },
  {
    username: 'seungwoo',
    name: '박승우',
    profileImage: '/profiles/seungwoo.jpg',
    postCount: 3,
    followerCount: 974,
    followingCount: 233,
  },
];


// 한 사람의 프로필을 돌려줘요. 데이터베이스에서 읽는 것처럼 2초 기다려요.
export async function getProfile(username) {
  'use cache';
  cacheLife('hours');

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return profiles.find((item) => item.username === username);
}
