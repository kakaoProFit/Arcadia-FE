import { Grid } from '@mui/material'
import DiaryCard from '@/components/card/card'
import DiaryPagination from '@/components/pagination/pagination'
import { CARD_DUMMY_DATA } from '@/constants/CardDummy'

export default function DiaryListPage({ searchParams }) {

  // 현재 url 매개 변수를 받아옴.
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  //더미 데이터
  // API 호출로 데이터 받아서 뿌릴 예정
  const CARD = CARD_DUMMY_DATA

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
        {CARD.map((it, index) => (
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
