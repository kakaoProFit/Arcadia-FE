// 일기 조회(자세히 보기) 페이지
import dynamic from 'next/dynamic'
import Stack from '@mui/material/Stack'
import Comment from '@/components/comment/comment'
import Post from '@/components/Post'

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
    content:
      '테스트2sdasdasdaasdasd테스트3<br>dasdsad테스트2sdasdasdaasdasd테스트3<br>dasdsad테스트2sdasdasdaasdasd테스트3<br>dasdsad테스트2sdasdasdaasdasd테스트3<br>dasdsad테스트2sdasdasdaasdasd테스트3<br>dasdsad테스트2sdasdasdaasdasd테스트3<br>dasdsad테스트2sdasdasdaasdasd테스트3<br>dasdsad',
    writer: '홍길동',
    hits: 100,
  }

  return data
}

async function DirInquery(props) {
  console.log('viewSlug: ', props.params.viewSlug) //viewSlug는 /diary/content/[viewSlug] 임. 따라서 일기 ID

  const response_data = await getDiary(props.params.viewSlug) // 일기 제목, 내용을 불러옴
  console.log('diary: ', response_data)

  const comment = [
    {
      id: 1,
      name: '우울증유저',
      comment: '잘 보고 갑니다.',
    },
    {
      id: 2,
      name: '헤헤',
      comment: '좋은 글이네요.',
    },
  ]

  return (
    <div>
      <Post props={response_data} />
      {/* 일기의 ID를 넘겨, 해당 일기에 대한 comment 조회 */}
      {/* <Comment props={response_data.diary_id} /> */}
      <Comment props={comment} />
    </div>
  )
}

export default DirInquery
