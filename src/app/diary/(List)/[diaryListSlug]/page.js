import { Grid } from '@mui/material'
import DiaryCard from '@/components/card/card'
import DiaryPagination from '@/components/pagination/pagination'

export default function DiaryListPage({ searchParams }) {
  // 라우팅 가이드라인
  // 목록 조회 : diary/[diaryListSlug]
  // 일기 nav는 default로 diary/mydiary, 게시판 nav는 default로 diary/community 로 이동
  // 내용 조회 페이지는 diary/[diaryListSlug]/[diaryContentSlug]

  // 현재 url 매개 변수를 받아옴.
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  //더미 데이터
  // API 호출로 데이터 받아서 뿌릴 예정
  const CARD_DUMMY_DATA = [
    {
      title: '보람찬 하루',
      nickname: '원우형',
      cardImage: '',
      avatarImage: '',
      isPublic: false,
      updateDate: '2024-04-17',
      hits: 76,
      summary:
        '오늘 하루 전체적으로 보람찼다. 이유는 오늘 벚꽃이 아름답기 때문이었다.',
    },
    {
      title: '보람찬 하루',
      nickname: '원우형',
      cardImage: '',
      avatarImage: '',
      isPublic: false,
      updateDate: '2024-04-17',
      hits: 76,
      summary: '오늘 하루 전체적으로 보람찼다. 이유는 ...',
    },
    {
      title: '보람찬 하루',
      nickname: '원우형',
      cardImage: '',
      avatarImage: '',
      isPublic: false,
      updateDate: '2024-04-17',
      hits: 76,
      summary: '오늘 하루 전체적으로 보람찼다. 이유는 ...',
    },
    {
      title: '보람찬 하루',
      nickname: '원우형',
      cardImage: '',
      avatarImage: '',
      isPublic: false,
      updateDate: '2024-04-17',
      hits: 76,
      summary: '오늘 하루 전체적으로 보람찼다. 이유는 ...',
    },
    {
      title: '보람찬 하루',
      nickname: '원우형',
      cardImage: '',
      avatarImage: '',
      isPublic: false,
      updateDate: '2024-04-17',
      hits: 76,
      summary: '오늘 하루 전체적으로 보람찼다. 이유는 ...',
    },
  ]

  // 해당 사용자 또는 불러온 일기 개수
  let itemCount = 50

  // 이후 로그인 토큰 확인해서 로그인 여부, 사용자 이름 props로 전달해야 함.
  return (
    <>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{
          mb: 5,
        }}
      >
        {CARD_DUMMY_DATA.map((it, index) => (
          // 기존에는 사이즈마다 다르게 했으나 pagination 구현하면서 일단은 개수 제한을 그냥 둠
          // <Grid item xs={12} sm={6} md={3} lg={2} key={index}>
          <Grid item xs={2} key={index}>
            <DiaryCard
              key={index}
              title={it.title}
              nickname={it.nickname}
              cardImage={it.cardImage}
              avatarImage={it.avatarImage}
              isPublic={it.isPublic}
              updateDate={it.updateDate}
              hits={it.updateDate}
              summary={it.summary}
            />
          </Grid>
        ))}
      </Grid>
      <DiaryPagination diaryCount={itemCount} />
    </>
  )
}
