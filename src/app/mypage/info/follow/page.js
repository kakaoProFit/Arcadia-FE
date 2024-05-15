import Following from '@/components/Following'

const data = [
  {
    avatar: '/images/user1.jpg',
    user: 'Aespa',
    follow: true,
  },
  {
    avatar: '/images/user2.jpg',
    user: 'Ive',
    follow: true,
  },
  {
    avatar: '/images/user3.jpg',
    user: 'Big Bang',
    follow: true,
  },
  {
    avatar: '/images/user4.jpg',
    user: 'Seventeen',
    follow: true,
  },
  {
    avatar: '/images/user5.jpg',
    user: 'TWS',
    follow: false,
  },
  {
    avatar: '/images/user6.jpg',
    user: 'Rise',
    follow: true,
  },
  {
    avatar: '/images/user7.jpg',
    user: 'JYP',
    follow: false,
  },
]
// 날 팔로우하는 사람들 목록을 보여주는 페이지
export default function Follow() {
  return (
    <div className="bg-white">
      <Following datas={data} />
    </div>
  )
}
