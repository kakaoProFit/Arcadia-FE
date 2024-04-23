// 일기 조회(자세히 보기) 페이지
import dynamic from 'next/dynamic'
import Stack from '@mui/material/Stack'
import Comment from '@/components/comment/comment'

// react-quill을 동적으로 임포트
const ReadDirInquery = dynamic(
  () => import('@/components/readDiary/readDirInquery.js'),
  {
    ssr: false,
  },
)

function DirInquery(props) { 
  console.log('viewSlug: ', props.params.viewSlug) //viewSlug는 /diary/content/[viewSlug] 임. 따라서 일기 ID

  let response_data = {
    // 게시글 테스트 데이터
    diaryId: 1,
    writer: '홍길동',
    title: '일기란 무엇인가',
    content: '<h2>오늘의 일기</h2>\n<p>날이 좋았다.</p>',
    dirViews: '100', //조회수
  }

  const handleGetSpecification = () => {
    fetch('/diary/list/DirInquery', {
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
        <h2>일기 조회</h2>
      </div>
      <Stack direction="column" alignItems="center" spacing={2}>
        <ReadDirInquery theme="snow" props={response_data} />
        {/* 일기의 ID를 넘겨, 해당 일기에 대한 comment 조회 */}
        <Comment props={response_data.diaryId} />
      </Stack>
    </div>
  )
}

export default DirInquery
