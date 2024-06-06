'use client'

import 'react-quill/dist/quill.bubble.css'
import ReactQuill from 'react-quill'
import FavoriteIcon from '@mui/icons-material/Favorite'

function addAnswer(data) {
  return (
    <div className="my-3 shadow-sm border-l p-3">
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
      </div>
    </div>
  )
}

function formatCreatedAt(createdAtArray) {
  // createdAt 배열에서 연, 월, 일을 추출
  const [year, month, day] = createdAtArray.slice(0, 3)
  // Date 객체 생성
  const createdAtDate = new Date(year, month - 1, day)
  // YYYY-MM-DD 형식으로 변환
  const formattedCreatedAt = createdAtDate.toISOString().slice(0, 10)
  return formattedCreatedAt
}

const Post = ({ props }) => {
  const date = new Date()
  return (
    <div className="container my-24 mx-auto md:px-6 w-8/12">
      <section className="mb-32">
        <div className="mb-6 flex items-center">
          <img
            src="/images/user1.jpg"
            className="mr-2 h-8 rounded-full"
            alt="avatar"
          />
          <div>
            <span>{formatCreatedAt(props.createdAt)} by </span>
            <a href="#!">{props.writer}</a>
          </div>
        </div>

        <h1 className="mb-6 text-3xl font-bold">
          {props.title}
          <button className="bg-white hover:bg-gray-400 mx-5 py-1 px-1 rounded inline-flex items-center">
            <FavoriteIcon color="secondary" sx={{ fontSize: 25 }} />
          </button>
        </h1>
        <p>
          <span className="mr-2">조회수: {props.dirViews}</span>
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
