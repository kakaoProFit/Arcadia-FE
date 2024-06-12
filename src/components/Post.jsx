'use client'

import 'react-quill/dist/quill.bubble.css'
import ReactQuill from 'react-quill'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useRouter } from 'next/navigation'

const Post = ({ props }) => {
  const router = useRouter()
  console.log('props: ', props)
  function addAnswer(data) {
    return (
      <div className="relative my-3 shadow-sm border-l p-3">
        {data.isAdopted ? (
          <span className="bg-blue-100 p-4 text-blue-800 text-xs font-medium rounded-full absolute top-0 right-0 mt-2 ml-2">
            채택됨
          </span>
        ) : null}
        <div className="flex items-center mb-3">
          <a href="#!" className="flex items-center mt-2">
            <img
              src={data.avatar}
              className="mr-2 h-10 rounded-full"
              alt="avatar"
            />
            <span className="text-2xl">{data.writer}</span>
          </a>
        </div>
        <div className="relative" style={{ height: '100%' }}>
          <ReactQuill
            theme="bubble"
            value={data.content}
            readOnly={true}
            style={{ height: '200%', fontSize: '30px' }}
          />
          <div className="flex justify-end items-end h-full">
            <span className="mb-2 mr-2">{data.date}</span>
          </div>
          {props.possibleAdopt ? (
            <button className="bg-blue-500 text-white hover:bg-gray-400 mx-5 py-2 px-2 rounded inline-flex items-center">
              채택하기
            </button>
          ) : null}
        </div>
      </div>
    )
  }

  function formatCreatedAt(createdAtArray) {
    console.log('createdAtArray: ', createdAtArray)
    // createdAt 배열에서 연, 월, 일을 추출
    const [year, month, day] = createdAtArray.slice(0, 3)
    // Date 객체 생성
    const createdAtDate = new Date(year, month - 1, day)
    // YYYY-MM-DD 형식으로 변환
    const formattedCreatedAt = createdAtDate.toISOString().slice(0, 10)
    return formattedCreatedAt
  }

  const date = new Date()
  return (
    <div className="container my-24 mx-auto md:px-6 w-8/12">
      <section className="mb-32">
        <div className="relative mb-6 flex items-center">
          <img
            src="/images/user1.jpg"
            className="mr-2 h-8 rounded-full"
            alt="avatar"
          />
          <div>
            <span>{formatCreatedAt(props.createdAt)} by </span>
            <a href="#!">{props.userNickname}</a>
            {/* null 값을 로딩중이라고 보여주면 될듯 */}
            {props.loadedAnalysis ? (
              <span className="absolute top-0 right-0 mt-2 ml-2">
                <button
                  type="button"
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() => router.push('/board/diary/analyze/1')}
                >
                  일기 분석서로 이동
                </button>
              </span>
            ) : null}
          </div>
        </div>

        <h1 className="mb-6 text-3xl font-bold">
          {props.title}
          <button className="bg-white hover:bg-gray-400 mx-5 py-1 px-1 rounded inline-flex items-center">
            <FavoriteIcon color="secondary" sx={{ fontSize: 25 }} />
          </button>
        </h1>
        <p>
          <span className="mr-2">조회수: {props.viewCount}</span>
          <span className="mr-2">추천수: {props.likeCnt}</span>
        </p>
        <div className="my-3 shadow-lg border-sm">
          <ReactQuill
            theme="bubble"
            value={props.body}
            readOnly={true}
            style={{ height: '100%', fontSize: '30px' }}
          />
        </div>
      </section>
      {props.category === 'question' ? (
        <div className="my-3">
          <hr className="my-6" />
          <h1 className="m-3 text-3xl font-bold">답변</h1>
          {props.answerList.map((answer) => addAnswer(answer))}
        </div>
      ) : null}
    </div>
  )
}

export default Post
