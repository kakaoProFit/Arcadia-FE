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

function Comment(props) {
  console.log('diary ID: ', props.props) //일기의 ID 확인

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
