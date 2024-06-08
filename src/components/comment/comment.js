'use client'

import * as React from 'react'
import { useRef, useEffect, useState } from 'react'
import { getUid, getAccessToken } from '@/services/CookieManage'
import RefreshIcon from '@mui/icons-material/Refresh'

function Comment({ props, boardId }) {
  const [comments, setComments] = useState(props) // 댓글 상태 관리

  async function postComment(data) {
    console.log('fetching')
    try {
      const response = await fetch(
        `https://spring.arcadiaprofit.shop/comments/write/${boardId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
          },
          body: JSON.stringify(data),
        },
      )
      const newComment = await response.json()

      // 댓글 목록 갱신
      setComments((prevComments) => [...prevComments, newComment])
    } catch (error) {
      console.error('Error during fetch:', error)
    }
  }

  async function deleteComment(commentId) {
    try {
      const response = await fetch(
        `https://spring.arcadiaprofit.shop/comments/${commentId}/delete`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      )
    } catch (error) {
      console.error('Error during fetch:', error)
    }
  }

  console.log('boardId', boardId)

  const commentRef = useRef(null)

  const handleFocus = () => {
    // 기본값으로 '댓글을 입력하세요...'라는 문구를 넣고, 사용자가 댓글 창을 클릭하면 이 글씨가 지워짐.
    if (commentRef.current.value === '댓글을 입력하세요...') {
      commentRef.current.value = ''
    }
  }

  const handleBlur = () => {
    // 댓글창에서 focus가 벗어나면, 다시 문구가 나옴.
    if (commentRef.current.value === '') {
      commentRef.current.value = '댓글을 입력하세요...'
    }
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    if (commentRef.current.value === '댓글을 입력하세요...') {
      return // "댓글을 입력하세요..."일 때는 저장 버튼 클릭 무시
    }

    let currentUser = getUid()

    const newComment = commentRef.current.value

    commentRef.current.value = '댓글을 입력하세요...'

    const data = {
      userNickname: currentUser,
      body: newComment,
    }

    postComment(data)
  }

  function addComment(comment) {
    console.log('comment', comment)
    return (
      <form>
        <div className="p-6 text-base bg-white rounded-lg">
          <footer className="flex justify-between items-center mb-2">
            <input type="hidden" name="commentId" value={comment.id} />
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src="/images/user1.jpg"
                  alt="user"
                />
                {comment.userNickname}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time dateTime="2022-02-08" title="February 8th, 2022">
                  Feb. 8, 2022
                </time>
              </p>
            </div>
          </footer>
          <p className="text-gray-500">{comment.body}</p>
          <div className="flex items-center mt-4 space-x-4">
            <button
              type="button"
              className="flex items-center text-sm text-black-500 hover:underline font-medium"
              onClick={() => deleteComment(comment.id)}
            >
              삭제
            </button>
            <button
              type="button"
              className="flex items-center text-sm text-black-500 hover:underline font-medium"
            >
              수정
            </button>
          </div>
        </div>
      </form>
    )
  }

  return (
    <section className="bg-white">
      <div className="mx-auto w-10/12 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            댓글 ({comments.length})
            <RefreshIcon
              className="cursor-pointer"
              onClick={() => setComments([])}
              sx={{ fontSize: '40px' }}
            />
          </h2>
        </div>
        <form className="mb-6" onSubmit={handleCommentSubmit}>
          {/* 댓글 입력창 */}
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
            <label className="sr-only">Your comment</label>
            <textarea
              id="comment"
              rows="6"
              ref={commentRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
              defaultValue="댓글을 입력하세요..."
              required
            />
          </div>
          <button
            type="submit"
            className="font-tenada text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          >
            댓글 작성
          </button>
        </form>
        {comments.map((comment, key) => (
          <div key={key}>{addComment(comment)}</div>
        ))}
      </div>
    </section>
  )
}

export default Comment
