// 일기 작성 페이지
import dynamic from 'next/dynamic'

const TextEditor = dynamic(
  () => import('@/components/textEditor/textEditor.js'),
  {
    ssr: false,
  },
)

// const baseUrl = '/diary/list/DirCreate' //일기 등록할 때 버튼에 쓰일 url
// const formUrl = '/diary/form/DirCreate' //일기 form 형식으로 작성할 때 url
const baseUrl = 'https://api.arcadiaprofit.shop/diary/DirCreate'
const formUrl = ' https://spring.arcadiaprofit.shop/diary/formCreate'
const submitUrl = '/diary/content/psyAnlz' // 등록 후에 분석 페이지로 이동
// const anonPost = false // 일기를 익명으로 할건지 아닌지 판별. 기본값은 false
const writeForm = false // 일기의 작성 폼. 기본으로는 false
const isDiaryMode = 'isDiaryMode' // text editor가 여러군데서 쓰이기 때문에 일기일 경우 '제목' 적는 부분이 필요함. 그걸 하기 위한 변수

export default function DiaryWritePage() {
  // writeForm -> [board, question, diary]
  return (
    <div>
      <p className="flex justify-center text-4xl">글 작성</p>
      <TextEditor
        baseUrl={baseUrl}
        submitUrl={submitUrl}
        category="diary"
        // anonPost={anonPost}
        writeForm={writeForm}
        formUrl={formUrl}
        isDiaryMode={isDiaryMode}
      />
    </div>
  )
}
