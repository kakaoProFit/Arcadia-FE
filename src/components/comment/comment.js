'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useRef, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { List, ListItem } from '@mui/material'

function getComment(props) {
  // 일기 아이디를 props로 받아서 서버에서 댓글 목록 가져옴
  // const response = fetch(
  //   '/diaryInquery',
  //   {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     cache: 'no-store',
  //     body: props
  //   },
  // )

  // const data = response.json()
  const data = [
    //댓글 테스트 데이터
    {
      userNickname: '우울증유저',
      comment: '잘 보고 갑니다.',
    },
    {
      userNickname: '헤헤',
      comment: '좋은 글이네요.',
    },
  ]
  return data
}

function postComment(props) {
  // 작성된 댓글을 서버로 전송
  console.log('propspropspropsprops: ', props)
  fetch(`/diary/${props}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: props,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText)
      }
    })
    .then((data) => {
      console.log('성공', data)
    })
    .catch((error) => {
      console.error(error)
    })
}

function Comment({ props }) {
  const commentRef = useRef(null)
  const [comments, setComments] = useState([]) // 댓글 상태 관리

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

  const handleCommentSubmit = () => {
    if (commentRef.current.value === '댓글을 입력하세요...') {
      return // "댓글을 입력하세요..."일 때는 저장 버튼 클릭 무시
    }

    // 현재 유저의 닉네임이 필요한데, 이거 어떻게 관리할건지 물어보기. 일단은 하드코딩으로 함. -> 아마 토큰으로 할거같은데 그럼 댓글 등록할때 작성자 닉네임이 필요한데, 이게 애매함.
    let currentUser = '끼끼끼'

    // 댓글 추가
    const newComment = commentRef.current.value
    setComments([
      ...comments,
      { userNickname: currentUser, comment: newComment },
    ])
    console.log('commentRef: ', commentRef)
    console.log('comments: ', comments)

    // 댓글 입력 창 초기화
    commentRef.current.value = '댓글을 입력하세요...'

    const data = {
      userNickname: currentUser,
      comment: newComment,
    }

    // POST 요청 보내기 - 새 댓글 저장
    postComment(data)
  }

  useEffect(() => {
    // 처음 컴포넌트가 로딩될 때 API 요청
    const commentList = getComment(props.props)
    setComments(commentList)
  }, [])

  const sjn = [
    {
      id: 1,
      name: '우울증유저',
      comment: '잘 보고 갑니다.',
    },
    {
      id: 2,
      name: '헤헤',
      comment: '좋은 글이네요.',
    },
  ]

  return (
    <section className="bg-white">
      <div className="mx-auto w-10/12 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            댓글 ({props.length})
          </h2>
        </div>
        <form className="mb-6">
          {' '}
          {/* 댓글 입력창 */}
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
            <label className="sr-only">Your comment</label>
            <textarea
              id="comment"
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
              placeholder="Write a comment..."
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
        {props.map((comment, key) => (
          <div key={key} className="p-6 text-base bg-white rounded-lg">
            {' '}
            {/* 댓글 목록 */}
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="/images/user1.jpg"
                    alt="user"
                  />
                  {comment.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time dateTime="2022-02-08" title="February 8th, 2022">
                    Feb. 8, 2022
                  </time>
                </p>
              </div>
            </footer>
            <p className="text-gray-500">{comment.comment}</p>
            <div className="flex items-center mt-4 space-x-4">
              <button
                type="button"
                className="flex items-center text-sm text-black-500 hover:underline font-medium"
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
        ))}
      </div>
    </section>
  )
}

export default Comment
