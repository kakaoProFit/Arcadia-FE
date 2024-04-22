// 일기 작성 페이지

import Stack from '@mui/material/Stack'
import dynamic from 'next/dynamic'

const TextEditor = dynamic(
  () => import('@/components/textEditor/textEditor.js'),
  {
    ssr: false,
  },
)

const baseUrl = "/diary/list/DirCreate" //일기 등록할 때 버튼에 쓰일 url
const formUrl = "/diary/form/DirCreate" //일기 form 형식으로 작성할 때 url
const submitUrl = "/diary/1" // 등록 후에 list로 이동. 첫페이지로 고정 이동
const anonPost = false // 일기를 익명으로 할건지 아닌지 판별. 기본값은 false
const writeForm = false // 일기의 작성 폼. 기본으로는 false

export default function DiaryWritePage() {
  return (
    <>
      <Stack direction="column" alignItems="center" spacing={2}>
        <h1>일기 작성</h1>
        <TextEditor baseUrl={baseUrl} submitUrl={submitUrl} anonPost={anonPost} writeForm={writeForm} formUrl={formUrl}/>
      </Stack>
    </>
  );
}
