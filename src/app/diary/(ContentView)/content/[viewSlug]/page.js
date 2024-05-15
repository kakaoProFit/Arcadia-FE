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

async function getDiary() {
  const response = await fetch(
    'https://c2fa1327-2fa1-46f2-b030-eba4d6b65b37.mock.pstmn.io/diary/list/DirInquery',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  )

  const data = await response.json()

  return data
}

async function DirInquery(props) {
  console.log('viewSlug: ', props.params.viewSlug) //viewSlug는 /diary/content/[viewSlug] 임. 따라서 일기 ID

  const response_data = await getDiary() // 일기 제목, 내용을 불러옴
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
