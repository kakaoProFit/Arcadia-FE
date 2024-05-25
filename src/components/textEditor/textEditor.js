// 이 컴포넌트 쓰려면 <TextEditorNoSSR url={baseUrl}/> 이런식으로 해당 페이지에서 post 요청 보낼 url넘겨줘야함.
// 참고 파일 필요하면 /diary/(ContentView)/write/page.js 에서 사용하는 거 참고.

'use client'

import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

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

const TextEditor = (props) => {
  // props에는 baseUrl, submitUrl, (anonPost: 생략가능) 의 데이터가 넘어옴
  const quillRef = useRef()
  const maxCharacters = 500 //입력 최대 글자수
  const router = useRouter()

  // const [isAnonPost, setIsAnonPost] = useState(props.anonPost) // 사용자가 익명 여부 선택하는 것을 관리할 state
  const [isWriteForm, setIsWriteForm] = useState(false) // 사용자가 일기 폼 여부 선택. 매칭 신청서일 때도 사용하기 때문에 props.writeForm은 사용 불가

  const [displayCounting, setDisplayCounting] = useState('0') // 글자 수를 화면에 보이기 위한 변수
  const [writingContent, setWritingContent] = useState('')

  // 일기 제목을 저장할 state
  const [title, setTitle] = useState('')

  // Form일 경우, TextField의 상태를 관리할 useState
  const [formFields, setFormFields] = useState(['', '', ''])

  // const toggleAnonymous = () => {
  //   setIsAnonPost(!isAnonPost) // 사용자가 익명 여부 선택함에 따른 state 저장
  // }

  const toggleWriteForm = () => {
    setIsWriteForm(!isWriteForm) // 사용자가 익명 여부 선택함에 따른 state 저장
  }

  // 제목을 변경하는 함수
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
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

  const handleFormChange = (index, value) => {
    const newFieldValues = [...formFields]
    newFieldValues[index] = value
    setFormFields(newFieldValues)
  }

  const handleFormSubmit = () => {
    // Form 형태에서 등록 버튼을 눌렀을 때 실행되는 함수
    // 각 TextField의 값들을 가져와서 서버에 전송
    const postData = formFields[0] + ' ' + formFields[1] + ' ' + formFields[2] //question 1,2,3에 대한 값들
    console.log('postData: ', postData)

    // POST 요청 보내기
    fetch(props.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // 작성 내용과 익명 여부 전달. 이거는 form으로 작성한거라 title이 없음.
        member_id: 1,
        diary: postData,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        console.log('전송 성공!')
        console.log('감정 분석 결과 ', JSON.stringify(data))
        localStorage.setItem('content', postData)
        localStorage.setItem('analyze', JSON.stringify(data))
        router.push(props.submitUrl)
      })
      .catch((error) => {
        console.log('실패')
        console.error('There was a problem with the fetch operation:', error)
      })

    fetch('http://61.109.216.248:8000/keyphrase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // 작성 내용과 익명 여부 전달. 이거는 form으로 작성한거라 title이 없음.
        member_id: 1,
        diary: postData,
        // isAnonPost: isAnonPost,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('전송 실패')
        }
      })
      .then((data) => {
        console.log('키워드 분석 결과 ', JSON.stringify(data))
        localStorage.setItem('keyword', JSON.stringify(data))
        // router.push(props.submitUrl);
      })
      .catch((error) => {
        console.error('오류 발생', error)
      })
  }

  return (
    <>
      {props.isDiaryMode == 'isDiaryMode' && ( // diary mode(일기)일 때 제목 적는 field 나옴.
        <div className="flex justify-center w-full">
          <input
            className="my-3 text-black bg-white border border-gray-300 w-full text-lg px-4 py-3 rounded-md outline-blue-500"
            type="text"
            id="title"
            name="title"
            style={{ width: '50%' }}
            placeholder="제목을 입력하세요"
            onChange={handleTitleChange}
          />
        </div>
      )}
      <StyledTextEditor>
        {props.writeForm !== undefined && ( // writeForm이라는 props가 있을때만 폼 스위치 표시. (=일기)
          <div>
            <label class="inline-flex items-center mb-5 cursor-pointer">
              <input
                type="checkbox"
                value=""
                class="sr-only peer"
                checked={isWriteForm}
                onChange={toggleWriteForm}
              />
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900">Toggle</span>
            </label>
          </div>
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
            <p className="mt-2">
              {/* quill은 기본적으로 1글자를 차지하고 있음. 그래서 -1 해서 카운트 함. */}
              {displayCounting.length - 1}/{maxCharacters}
            </p>
            <button
              className="font-tenada text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
              onClick={handleSubmit}
            >
              등록
            </button>
          </>
        ) : (
          <>
            {/* 반응형을 위해 Grid사용 */}
            <div>
              {formFields.map((field, index) => (
                <div key="index" className="flex flex-col">
                  <label
                    for="message"
                    class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                  >
                    {questions[index]}
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    onChange={(e) => handleFormChange(index, e.target.value)}
                    className="my-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                    placeholder="..."
                  />
                </div>
              ))}
              <button
                className="font-tenada text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                onClick={handleFormSubmit}
              >
                등록
              </button>
            </div>
          </>
        )}
      </StyledTextEditor>
    </>
  )
}

export default TextEditor
