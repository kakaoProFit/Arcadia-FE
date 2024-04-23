'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import { List, ListItem } from '@mui/material'

const tempComment = [
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

function Comment(props) {
  console.log(props.props) //일기의 ID 확인

  const commentRef = useRef(null)
  const [comments, setComments] = useState([]) // 댓글 상태 관리
  const [currentUser, setCurrentUser] = useState('') // 현재 로그인 된 유저가 누군지 저장

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
    axios
      .post(`/diary/${props.props}/comment`, data) //props.props는 일기의 ID임.
      .then((response) => {
        console.log('성공')
      })
      .catch((error) => console.error('Error adding comment:', error))
  }

  useEffect(() => {
    setComments(tempComment) //테스트 데이터 넣기 - 추후 api 연동되면 이 부분 지우기.

    // 로컬 스토리지에서 현재 로그인된 사용자 정보를 가져옵니다.
    const loggedInUser = localStorage.getItem('userId')
    setCurrentUser('홍길동') // 추후에 홍길동 부분 loggedInUser로 바꾸기

    // 처음 컴포넌트가 로딩될 때 API 요청
    axios
      .get(`/diary/${props.props}/comment`)
      .then((response) => {
        // API 응답을 받아와 댓글 상태 업데이트
        setComments(response.data.comments)
      })
      .catch((error) => console.error('Error fetching comments:', error))
  }, [])

  return (
    <>
      {/* 댓글 목록 */}
      <Box
        mt={0}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100ch' },
        }}
      >
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index} alignItems="center">
              {/* 댓글 단 유저의 닉네임이 표시되는 것은 일정 크기를 정해놨음. 이거 안하면 닉네임의 길이에 따라 위치가 달라짐 */}
              <p
                style={{
                  minWidth: '15ch',
                  maxWidth: '15ch',
                  marginRight: '1ch',
                }}
              >
                <strong>{comment.userNickname}</strong>
              </p>
              <TextField
                multiline
                fullWidth
                variant="outlined"
                value={comment.comment}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    // 내용의 글자 크기를 조절
                    fontSize: '0.9rem',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            id="outlined-multiline-static"
            label="댓글"
            multiline
            rows={2}
            defaultValue="댓글을 입력하세요..."
            inputRef={commentRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Button variant="contained" onClick={handleCommentSubmit}>
            저장
          </Button>
        </div>
      </Box>
    </>
  )
}

export default Comment
