// 일기 수정 페이지
'use client'

import Stack from '@mui/material/Stack'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation' // 이 기능때문에 use client해야함
import { Suspense, useEffect } from 'react'

const ModifyEditor = dynamic(
  () => import('@/components/readDiary/modifyEditor.js'),
  {
    ssr: false,
  },
)

const baseUrl =
  'https://c2fa1327-2fa1-46f2-b030-eba4d6b65b37.mock.pstmn.io/diary/edit'
const submitUrl = '/diary/content/psyAnlz' // 등록 후에 분석 페이지로 이동
const isDiaryMode = 'isDiaryMode' // text editor가 여러군데서 쓰이기 때문에 일기일 경우 '제목' 적는 부분이 필요함. 그걸 하기 위한 변수

export default function DiaryWritePage() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <h1>일기 수정</h1>

          <ModifyEditor
            baseUrl={baseUrl}
            submitUrl={submitUrl}
            isDiaryMode={isDiaryMode}
          />
        </Stack>
      </Suspense>
    </>
  )
}
