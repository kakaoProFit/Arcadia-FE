import * as React from 'react'
import { useRef, useEffect, useState } from 'react'
import { getUid, getAccessToken } from '@/services/CookieManage'
import { Button, Modal } from 'flowbite-react'
import { Alert } from 'flowbite-react'

function Comment({ props, boardId }) {
  const [comments, setComments] = useState(props) // 댓글 상태 관리
  const [show, setShow] = useState(false)
  const [editMode, setEditMode] = useState(false) // 수정 모드 상태 관리
  const [editingCommentId, setEditingCommentId] = useState(null) // 수정 중인 댓글의 ID

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
      return newComment
    } catch (error) {
      console.error('Error during fetch:', error)
      return null
    }
  }

  async function deleteComment(commentId) {
    setShow(false)
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
      // 댓글 목록 갱신
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId),
      )
    } catch (error) {
      console.error('Error during fetch:', error)
    }
  }

  async function updateComment(commentId, newBody) {
    try {
      const response = await fetch(
        `https://spring.arcadiaprofit.shop/comments/1/edit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
          },
          body: JSON.stringify({ body: newBody }),
        },
      )
      // 댓글 목록 갱신
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, body: newBody } : comment,
        ),
      )
      setEditMode(false) // 수정 모드 종료
      setEditingCommentId(null) // 수정 중인 댓글 ID 초기화
    } catch (error) {
      console.error('Error during fetch:', error)
    }
  }

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

  const handleCommentSubmit = async (event) => {
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

    const addedComment = await postComment(data)
    const representComment = {
      id: comments.length + 1,
      userNickname: currentUser,
      body: newComment,
      createdAt: '방금 전',
    }
    setComments((comments) => [...comments, representComment])
  }

  function toggleEditMode(commentId) {
    setEditingCommentId(commentId)
    setEditMode((prevEditMode) => !prevEditMode)
  }
  function dateToString(createdAt) {
    if (createdAt === '방금 전') return createdAt
    const [year, month, day] = createdAt.slice(0, 3)
    return `${year}년 ${month}월 ${day}일`
  }

  function addComment(comment) {
    let commentId = comment.id
    let newBody = comment.body
    console.log(comment)
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
                {comment.nickname}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time dateTime="2022-02-08" title="February 8th, 2022">
                  {dateToString(comment.createdAt)}
                </time>
              </p>
            </div>
          </footer>
          {editMode && editingCommentId === commentId ? (
            <textarea
              className="w-full px-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg bg-gray-50"
              defaultValue={comment.body}
              onChange={(e) => {
                newBody = e.target.value
                setComments((prevComments) =>
                  prevComments.map((prevComment) =>
                    prevComment.id === comment.id
                      ? { ...prevComment, body: newBody }
                      : prevComment,
                  ),
                )
              }}
            />
          ) : (
            <p className="text-gray-500">{comment.body}</p>
          )}
          {getUid() === comment.commentUserId ? (
            <div className="flex items-center mt-4 space-x-4">
              <button
                type="button"
                className="flex items-center text-sm text-black-500 hover:underline font-medium"
                onClick={() => setShow(true)}
              >
                삭제
              </button>
              {editMode && editingCommentId === commentId ? (
                <>
                  <button
                    type="button"
                    className="flex items-center text-sm text-black-500 hover:underline font-medium"
                    onClick={() => updateComment(commentId, newBody)}
                  >
                    저장
                  </button>
                  <button
                    type="button"
                    className="flex items-center text-sm text-black-500 hover:underline font-medium"
                    onClick={() => {
                      toggleEditMode(commentId)
                      // 수정 모드 취소 시, 원래 댓글 내용으로 복원
                      setComments((prevComments) =>
                        prevComments.map((prevComment) =>
                          prevComment.id === commentId
                            ? { ...prevComment, body: newBody }
                            : prevComment,
                        ),
                      )
                    }}
                  >
                    취소
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="flex items-center text-sm text-black-500 hover:underline font-medium"
                  onClick={() => toggleEditMode(commentId)}
                >
                  수정
                </button>
              )}
              <Modal
                className="font-tenada"
                show={show}
                handleClose={() => setShow(false)}
                onClose={() => setShow(false)}
              >
                <Modal.Header>댓글 삭제</Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500">
                      정말로 삭제하시겠습니까?
                    </p>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => deleteComment(commentId)}>삭제</Button>
                  <Button onClick={() => setShow(false)}>취소</Button>
                </Modal.Footer>
              </Modal>
            </div>
          ) : null}
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
