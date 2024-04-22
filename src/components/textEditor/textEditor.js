// 이 컴포넌트 쓰려면 <TextEditorNoSSR url={baseUrl}/> 이런식으로 해당 페이지에서 post 요청 보낼 url넘겨줘야함.

'use client'

import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

const modules = {
  // Quill의 동작과 기능을 사용자 정의. 화면에 tool이 보이게 함.
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

const formats = [
  // 모든 format은 Quill 편집기에서 활성화되고 허용. 직접 기능이 동작하게 함.
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
]

const StyledTextEditor = styled.div`
  width: 70%;
  margin: 0 auto;
  height: fit-content;

  .ql-editor {
    min-height: 400px;
    font-size: 16px;
  }
`

const TextEditor = (url) => {
  // value: 사용자가 입력한 내용, onChage: value를 변경하기 위한 함수
  const quillRef = useRef()
  const maxCharacters = 500 //입력 최대 글자수
  const router = useRouter()

  const [displayCounting, setDisplayCounting] = useState('0') // 글자 수를 화면에 보이기 위한 변수
  const [writingContent, setWritingContent] = useState('')

  const handleChange = (content, delta, source, editor) => {
    const newText = content
    const quillEditor = quillRef.current.getEditor()
    const counting = quillEditor.getText() // Quill 에디터의 내용을 가져옴

    setWritingContent(writingContent)
    setDisplayCounting(counting)

    if (counting.length <= maxCharacters) {
      setWritingContent(newText) // 변경된 텍스트를 상위 컴포넌트로 전달
    } else {
      // 최대 글자수를 초과한 경우에는 이전 텍스트를 유지, 추가 입력 제한
      const limitedText = counting.slice(0, maxCharacters)
      // Quill Editor의 내용을 이전 내용으로 되돌림
      quillEditor.setText(limitedText)
    }
  }

  // 등록 버튼을 클릭했을 때 실행될 함수
  const handleSubmit = () => {
    console.log(writingContent) //작성된 내용물
    console.log("baseUrl: ", url.baseUrl) //각 페이지에서 이 컴포넌트를 쓸 때 url도 넘겨줘야함. 그럼 해당 url로 post요청 가능
    console.log("submitUrl: ", url.submitUrl) // post 요청 후에 해당 글의 자세히 보기 페이지로 이동

    router.push(url.submitUrl) // 아직 백엔드 연결 안됐으니, 테스트로 라우팅 바로 가능하도록 함. 추후 제거

    fetch(url.baseUrl, { // 등록 요청
      method: 'POST',
      body: JSON.stringify({ content: writingContent }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('전송 성공!')
          router.push(url.submitUrl)
        } else {
          console.error('전송 실패')
        }
      })
      .catch((error) => {
        console.error('오류 발생', error)
      })
  }

  return (
    <StyledTextEditor>
      <ReactQuill
        ref={quillRef}
        modules={modules}
        formats={formats}
        theme="snow"
        onChange={handleChange}
      />
      <p>
        {/* quill은 기본적으로 1글자를 차지하고 있음. 그래서 -1 해서 카운트 함. */}
        {displayCounting.length - 1}/{maxCharacters}
      </p>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        등록
      </Button>
    </StyledTextEditor>
  )
}

export default TextEditor
