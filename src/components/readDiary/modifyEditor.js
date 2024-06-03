'use client'

import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import { useRef, useState } from 'react'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation' // 이 기능때문에 use client해야함

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')

    return function forwardReactQuill({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />
    }
  },
  {
    ssr: false,
  },
)
ReactQuill.displayName = 'ReactQuill'

function getDiary(props) {
  // 일기 ID를 이용하여 일기 내용 및 일기 정보들 가져오기

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

  // const data = await response.json()
  const data = {
    member_id: 1,
    diary_id: 10,
    title: '테스트1',
    diary: '테스트2테스트3',
    writer: '홍길동',
    hits: 100,
  }

  return data
}

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
    ['image'],
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
  'image',
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

function ModifyEditor(props) {
  const searchParams = useSearchParams()
  const diaryId = searchParams.get('diaryId')
  console.log('diary ID: ', diaryId)

  const diary_data = getDiary(diaryId)
  console.log('diary data: ', diary_data)

  const quillRef = useRef(null)
  const maxCharacters = 500 //입력 최대 글자수
  const router = useRouter()

  const [displayCounting, setDisplayCounting] = useState(() => {
    const parser = new DOMParser()
    const tempWritingContent = parser.parseFromString(
      diary_data.diary,
      'text/html',
    )
    return tempWritingContent.body.textContent.length
  }) // 글자 수를 화면에 보이기 위한 변수

  const [writingContent, setWritingContent] = useState(diary_data.diary)

  // 일기 제목을 저장할 state
  const [title, setTitle] = useState(diary_data.title)

  // 제목을 변경하는 함수
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleChange = (content, delta, source, editor) => {
    const newText = content

    if (quillRef.current) {
      const quillEditor = quillRef.current.getEditor()
      const counting = quillEditor.getText() // Quill 에디터의 내용을 가져옴

      setWritingContent(writingContent)
      setDisplayCounting(counting.length - 1)

      if (counting.length <= maxCharacters) {
        setWritingContent(newText) // 변경된 텍스트를 상위 컴포넌트로 전달
      } else {
        // 최대 글자수를 초과한 경우에는 이전 텍스트를 유지, 추가 입력 제한
        const limitedText = counting.slice(0, maxCharacters)
        // Quill Editor의 내용을 이전 내용으로 되돌림
        quillEditor.setText(limitedText)
      }
    }
  }

  // 등록 버튼을 클릭했을 때 실행될 함수
  const handleSubmit = () => {
    console.log(writingContent) //작성된 내용물

    // 내용물에서 html 태그 제거. 감정분석 때문에 파싱 한거임.
    const parser = new DOMParser()
    const tempWritingContent = parser.parseFromString(
      writingContent,
      'text/html',
    )
    console.log('html태그 제거 ', tempWritingContent.body.textContent)
    const postDiary = tempWritingContent.body.textContent

    fetch(props.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        member_id: 1,
        title: title,
        diary: postDiary,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('전송 성공!')
          return response.json()
        }
        throw new Error('전송 실패')
      })
      .then((data) => {
        console.log('감정 분석 결과 ', JSON.stringify(data))
        localStorage.setItem('content', JSON.stringify(writingContent))
        localStorage.setItem('analyze', JSON.stringify(data))
        router.push(props.submitUrl)
      })
      .catch((error) => {
        console.error('오류 발생', error)
      })

    fetch('http://61.109.216.248:8000/keyphrase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        member_id: 1,
        title: title,
        diary: postDiary,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('전송 성공!')
          return response.json()
        }
        throw new Error('전송 실패')
      })
      .then((data) => {
        console.log('키워드 데이터 ', JSON.stringify(data))
        localStorage.setItem('keyword', JSON.stringify(data))
      })
      .catch((error) => {
        console.error('오류 발생', error)
      })
  }

  return (
    <>
      {props.isDiaryMode == 'isDiaryMode' && ( // diary mode(일기)일 때 제목 적는 field 나옴.
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <label htmlFor="title">제목: &nbsp;</label>
          <input
            type="text"
            id="title"
            name="title"
            style={{ width: '50%' }}
            onChange={handleTitleChange}
            value={title}
          />
        </div>
      )}
      <StyledTextEditor>
        <>
          <ReactQuill
            // ref={quillRef}
            modules={modules}
            formats={formats}
            theme="snow"
            forwardedRef={quillRef}
            value={writingContent}
            onChange={handleChange}
          />
          <p>
            {/* quill은 기본적으로 1글자를 차지하고 있음. 그래서 -1 해서 카운트 함. */}
            {displayCounting}/{maxCharacters}
          </p>
          <Button variant="outlined" color="success" onClick={handleSubmit}>
            등록
          </Button>
        </>
      </StyledTextEditor>
    </>
  )
}

export default ModifyEditor
