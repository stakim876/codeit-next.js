// ~/instagram-next/data/posts.js
// 지금으로부터 몇 분 전의 시각을 만들어요 - 파트2 서버가 보내던 모양의 글자로.
const minutesBefore = (minutes) =>
  new Date(Date.now() - minutes * 60 * 1000).toISOString();

export const posts = [
  {
    id:1,
    username: 'jahoon',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
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
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
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
  profileImage:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
  postImage: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=600&h=600&q=80',
  postAlt: '농구코트',
  content: '주말마다 여기 옵니다.',
  createdAt: minutesBefore(180),
  likeCount: 76,
  commentCount: 2,
  },
];