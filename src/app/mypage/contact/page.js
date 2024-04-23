// 상담 신청서 조회 페이지
import dynamic from 'next/dynamic'
import Stack from '@mui/material/Stack'

// react-quill을 동적으로 임포트
const ReadTextEditor = dynamic(
  () => import('@/components/textEditor/readTextEditor.js'),
  {
    ssr: false,
  },
)

function Contact() {
  let response_data = '<h2>Hello World</h2>'

  const handleGetConsultingSpecification = () => {
    fetch('/mypage/${UserId}/Consulting', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json() // JSON 형태의 응답  -> 이거 추후에 백엔드에서 넘어오는거 보고 수정 필요할듯
        } else {
          console.error('실패')
        }
      })
      .then((data) => {
        response_data = data
      })
      .catch((error) => {
        console.error('오류 발생', error)
      })
  }

  return (
    <div>
      <div style={{ marginLeft: '15%' }}>
        <h2>마이 페이지</h2>
      </div>
      <div style={{ marginLeft: '15%' }}>
        <p>탭 컨포넌트 들어갈 자리</p>
      </div>
      <Stack direction="column" alignItems="center" spacing={2}>
        <ReadTextEditor theme="snow" props={response_data} />
      </Stack>
    </div>
  )
}

export default Contact
