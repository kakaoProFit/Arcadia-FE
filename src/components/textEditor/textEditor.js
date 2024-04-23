// 이 컴포넌트 쓰려면 <TextEditorNoSSR url={baseUrl}/> 이런식으로 해당 페이지에서 post 요청 보낼 url넘겨줘야함.
// 참고 파일 필요하면 /diary/(ContentView)/write/page.js 에서 사용하는 거 참고.

'use client'

import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import axios from 'axios'

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
      { background: [] },
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
  

  .ql-toolbar {
    background-color: white; /* 툴바 배경색을 흰색으로 설정 */
  }

  .ql-editor {
    min-height: 400px;
    font-size: 16px;
    background-color: white; /* 편집 영역 배경색을 흰색으로 설정 */
  }
`
const questions = [
  '오늘의 전체적인 기분은 어땠나요?',
  '오늘 하루를 시간순으로 들려주세요.',
  '오늘 내가 기분 좋았던 순간, 내가 좀 괜찮았다는 순간을 알려주세요.',
]

const TextEditor = (props) => {
  // props에는 baseUrl, submitUrl, (anonPost: 생략가능) 의 데이터가 넘어옴
  const quillRef = useRef()
  const maxCharacters = 500 //입력 최대 글자수
  const router = useRouter()

  const [isAnonPost, setIsAnonPost] = useState(props.anonPost) // 사용자가 익명 여부 선택하는 것을 관리할 state
  const [isWriteForm, setIsWriteForm] = useState(false) // 사용자가 일기 폼 여부 선택. 매칭 신청서일 때도 사용하기 때문에 props.writeForm은 사용 불가

  const [displayCounting, setDisplayCounting] = useState('0') // 글자 수를 화면에 보이기 위한 변수
  const [writingContent, setWritingContent] = useState('')

  // Form일 경우, TextField의 상태를 관리할 useState
  const [formFields, setFormFields] = useState(['', '', ''])

  const toggleAnonymous = () => {
    console.log('익명 여부: ', !isAnonPost)
    setIsAnonPost(!isAnonPost) // 사용자가 익명 여부 선택함에 따른 state 저장
  }

  const toggleWriteForm = () => {
    console.log('작성 폼 여부: ', !isWriteForm)
    setIsWriteForm(!isWriteForm) // 사용자가 익명 여부 선택함에 따른 state 저장
  }

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
    console.log('baseUrl: ', props.baseUrl) //각 페이지에서 이 컴포넌트를 쓸 때 url도 넘겨줘야함. 그럼 해당 url로 post요청 가능
    console.log('submitUrl: ', props.submitUrl) // post 요청 후에 해당 글의 자세히 보기 페이지로 이동

    router.push(props.submitUrl) // 아직 백엔드 연결 안됐으니, 테스트로 라우팅 바로 가능하도록 함. 추후 제거

    axios
      .post(
        props.baseUrl,
        {
          // 등록 요청
          content: writingContent, // 작성 내용과 익명 여부 전달
          isAnonPost: isAnonPost,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          console.log('전송 성공!')
          router.push(props.submitUrl)
        } else {
          console.error('전송 실패')
        }
      })
      .catch((error) => {
        console.error('오류 발생', error)
      })
  }

  const handleFormChange = (index, value) => {
    const newFieldValues = [...formFields]
    newFieldValues[index] = value
    setFormFields(newFieldValues)
  }

  const handleFormSubmit = () => {
    // Form 형태에서 등록 버튼을 눌렀을 때 실행되는 함수
    // 각 TextField의 값들을 가져와서 서버에 전송
    const postData = {
      question1: formFields[0],
      question2: formFields[1],
      question3: formFields[2],
    }
    console.log('postData: ', postData)

    // POST 요청 보내기
    axios
      .post(props.formUrl, postData)
      .then((response) => {
        console.log('성공')
      })
      .catch((error) => {
        console.log('실패')
      })
  }

  return (
    <>
      <StyledTextEditor>
        {props.anonPost !== undefined && ( // anonPost라는 props가 있을때만 익명 스위치 표시. (=일기)
          <FormControlLabel
            control={<Switch checked={isAnonPost} onChange={toggleAnonymous} />}
            label="익명"
          />
        )}
        {props.writeForm !== undefined && ( // writeForm이라는 props가 있을때만 폼 스위치 표시. (=일기)
          <FormControlLabel
            control={
              <Switch checked={isWriteForm} onChange={toggleWriteForm} />
            }
            label="작성 폼"
          />
        )}

        {/* 작성 폼이 아닌 경우, 텍스트 편집기 보여주기 */}
        {isWriteForm == false ? (
          <>
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
          </>
        ) : (
          <>
            {/* 반응형을 위해 Grid사용 */}
            <Grid
              container
              spacing={2}
              sx={{ marginTop: '30px', marginBottom: '40px' }}
            >
              {formFields.map((field, index) => (
                <Grid item xs={12} key={index}>
                  <h3>{questions[index]}</h3>
                  <TextField
                    multiline
                    rows={2}
                    fullWidth
                    onChange={(e) => handleFormChange(index, e.target.value)}
                  />
                </Grid>
              ))}
              <Button
                variant="contained"
                color="success"
                onClick={handleFormSubmit}
                sx={{ marginTop: '20px', marginLeft: '15px' }}
              >
                등록
              </Button>
            </Grid>
          </>
        )}
      </StyledTextEditor>
    </>
  )
}

export default TextEditor
