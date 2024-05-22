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

async function getDiary(props) {
  // 일기 ID를 이용하여 일기 내용 및 일기 정보들 가져오기
  // const response = await fetch(
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

async function DirInquery(props) {
  console.log('viewSlug: ', props.params.viewSlug) //viewSlug는 /diary/content/[viewSlug] 임. 따라서 일기 ID

  const response_data = await getDiary(props.params.viewSlug) // 일기 제목, 내용을 불러옴
  console.log('diary: ', response_data)

  return (
    <div>
      <div style={{ marginLeft: '15%' }}>
        <h2>일기 조회</h2>
      </div>
      <Stack direction="column" alignItems="center" spacing={2}>
        <ReadDirInquery theme="snow" props={response_data} />
        {/* 일기의 ID를 넘겨, 해당 일기에 대한 comment 조회 */}
        <Comment props={response_data.diary_id} />
      </Stack>
    </div>
  )
}

export default DirInquery
