import DiaryPagination from '@/components/pagination/pagination'
import { Suspense } from 'react'
import RectangleSkeleton from '@/components/loading-skeleton/rectangle-skeleton'
import CardSkeleton from '@/components/loading-skeleton/card-skeleton'
import CardContainer from '@/components/card/card-container'
// import TabContainer from '@/components/tab/tab-container'

export default async function DiaryListPage({ searchParams }) {
  // 현재 url 매개 변수를 받아옴.
  const query = searchParams?.query || '원우형'
  const currentPage = Number(searchParams?.page) || 1

  // 해당 사용자 또는 불러온 일기 개수 -> api 호출로 확인하자. 사용자 이름에 대해서 count()들어간 부분을 만들어달라는 느낌으로 ㄱㄱ?
  let itemCount = 50
  return (
    <>
      <Suspense key={currentPage + query} fallback={<CardSkeleton />}>
        <CardContainer currentPage={currentPage} query={query} />
      </Suspense>
      <Suspense fallback={<RectangleSkeleton />}>
        <DiaryPagination diaryCount={itemCount} />
      </Suspense>
    </>
  )
}
