import Tap from '@/components/Tap.jsx'
import '@/styles/globals.css'
import CardData from '@/components/CardData.jsx'
import Post from '@/components/Post.jsx'

export default function Home() {
  const data = CardData()
  let response_data = {
    // 게시글 테스트 데이터
    diaryId: 1,
    writer: '홍길동',
    title: '일기란 무엇인가',
    content:
      '<h2>오늘의 일기</h2>\n<p>오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기오늘의 일기날이 좋았다.</p>',
    dirViews: '100', //조회수
  }
  return (
    <div className="bg-white ">
      <Tap />
      <div className="mx-10 font-tenada">
        <Post theme="snow" props={response_data} />
      </div>
    </div>
  )
}
