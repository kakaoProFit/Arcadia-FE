'use client'

import 'react-quill/dist/quill.bubble.css'
import ReactQuill from 'react-quill'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Post = ({ props }) => {
  const date = new Date()
  return (
    <div className="container my-24 mx-auto md:px-6 w-8/12">
      <section className="mb-32">
        {/* <img
          src="/images/user2.jpg"
          className="mb-6 w-full rounded-lg shadow-lg"
          alt="image"
        /> */}

        <div className="mb-6 flex items-center">
          <img
            src="/images/user1.jpg"
            className="mr-2 h-8 rounded-full"
            alt="avatar"
          />
          <div>
            <span>
              <u>{date.toLocaleDateString()}</u> by{' '}
            </span>
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
          <span className="mr-2">추천수: {props.dirViews}</span>
        </p>
        <p className="my-3 shadow-lg border-sm">
          <ReactQuill
            theme="bubble"
            value={props.content}
            readOnly={true}
            style={{ height: '100%', fontSize: '30px' }}
          />
        </p>
        <hr className="my-6" />
        <h1 className="m-3 text-3xl font-bold">답변 리스트</h1>
        <p className="my-3 shadow-sm border-l">
          <h1 className="mx-3 mt-9 mt- text-3xl font-bold">답변 1</h1>
          <div className="m-3 flex items-center">
            <img
              src="/images/user1.jpg"
              className="mr-2 h-8 rounded-full"
              alt="avatar"
            />
            <div>
              <span>
                <u>{date.toLocaleDateString()}</u> by{' '}
              </span>
              <a href="#!">{props.writer}</a>
            </div>
          </div>
          <ReactQuill
            theme="bubble"
            value={props.content}
            readOnly={true}
            style={{ height: '100%', fontSize: '30px' }}
          />
        </p>
      </section>
    </div>
  )
}

export default Post
