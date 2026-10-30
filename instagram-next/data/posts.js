// ~/instagram-next/data/posts.js
// 지금으로부터 minutes분 전 시각을 ISO 문자열로 만듦.
// Date.now()에서 분 × 60초 × 1000ms를 빼고, toISOString()으로 글자 시각을 뽑음.
// 나중에 formatDate가 이 글자를 「10월 30일」처럼 바꿈.
const minutesBefore = (minutes) =>
  new Date(Date.now() - minutes * 60 * 1000).toISOString();

// 홈 피드가 그릴 게시글 목록. page.js가 가져와 map으로 FeedItem에 넘김.
export const posts = [
  {
    id:1,
    username: 'seungtae',
    profileImage: '/profiles/seungtae-small.jpg',
    postImage: 'https://images.unsplash.com/photo-1635555926145-5d26759d62ef?auto=format&fit=crop&w=600&h=600&q=80',
    postAlt: '노을 진 한강',
    content: '퇴근길에 한강이 너무 예뻐요',
    createdAt: minutesBefore(12),
    likeCount: 130,
    commentCount: 3,
  },
  {
  id: 2,
  username: 'minji',
  profileImage: '/profiles/minji.jpg',
   postImage:  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&h=600&q=80',
  postAlt: '갓 구운 크루아상',
  content: '오늘 아침에 구운 크루아상',
  createdAt: minutesBefore(45),
  likeCount: 512,
  commentCount: 4,
  },
  {
  id: 3,
  username: 'seungwoo',
  profileImage: '/profiles/seungwoo.jpg',
  postImage: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=600&h=600&q=80',
  postAlt: '농구코트',
  content: '주말마다 여기 옵니다.',
  createdAt: minutesBefore(180),
  likeCount: 76,
  commentCount: 2,
  },
];