// 매칭 신청서 등록 페이지

import Stack from '@mui/material/Stack'
import dynamic from 'next/dynamic'

const TextEditorNoSSR = dynamic(
  () => import('@/components/textEditor/textEditor.js'),
  {
    ssr: false,
  },
)

const baseUrl = "/mypage/${UserId}/Consulting" //매칭 신청서 등록할 때 버튼에 쓰일 url

function Matching() {
  return (
    <>
      <Stack direction="column" alignItems="center" spacing={2}>
        <TextEditorNoSSR url={baseUrl}/>
      </Stack>
    </>
  )
}

export default Matching
