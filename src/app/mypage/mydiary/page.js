'use client'

import { Grid } from '@mui/material'
import DiaryCard from '@/components/card/card'
import DiaryPagination from '@/components/pagination/pagination'
import { CARD_DUMMY_DATA } from '@/constants/CardDummy'
import { Suspense } from 'react'
// import Loading from './loading'
import RectangleSkeleton from '@/components/loading-skeleton/rectangle-skeleton'

export default async function MyPageDiary({ searchParams }) {
  // 현재 url 매개 변수를 받아옴.
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  //더미 데이터
  // API 호출로 데이터 받아서 뿌릴 예정
  const CARD = CARD_DUMMY_DATA

  // 해당 사용자 또는 불러온 일기 개수
  let itemCount = 50

  // 이후 로그인 토큰 확인해서 로그인 여부, 사용자 이름 props로 전달해야 함.
  // 이런 형식에서는 카드에다가 suspense 달아도 의미가 없는 것 같음.
  // fetching에 대해서 suspense 처리를 해주고 싶으면 카드를 담는 녀석까지 싹 빼고 거기서 await으로 fetching을 하고 이 page.js에서 query랑 currentpage전달
  // 이게 레퍼런스 방식임.
  return (
    <>
      {/* <Suspense key={currentPage+query} fallback={<Loading />}> */}
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
      {/* </Suspense> */}
      <Suspense fallback={<RectangleSkeleton />}>
        <DiaryPagination diaryCount={itemCount} />
      </Suspense>
    </>
  )
}
