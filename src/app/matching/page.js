// 매칭 신청서 등록 페이지

import Stack from '@mui/material/Stack'
import dynamic from 'next/dynamic'

const TextEditorNoSSR = dynamic(
  () => import('@/components/textEditor/textEditor.js'),
  {
    ssr: false,
  },
)

const baseUrl = '/mypage/${UserId}/Consulting' // 매칭 신청서 등록할 때 버튼에 쓰일 url
const submitUrl = '/mypage/matching' // 신청서 작성 완료 후 등록하면 조회 페이지로 자동 이동

function Matching() {
  return (
    <>
      <Stack direction="column" alignItems="center" spacing={2}>
        <TextEditorNoSSR baseUrl={baseUrl} submitUrl={submitUrl} />
      </Stack>
    </>
  )
}

export default Matching
