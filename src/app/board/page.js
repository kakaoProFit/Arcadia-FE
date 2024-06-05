import React, { Suspense } from 'react'
import '@/styles/globals.css'
import Table from '@/components/Table.jsx'
import Button from '@/components/Button'
import BoardPagination from '@/components/pagination/pagination'
import RectangleSkeleton from '@/components/loading-skeleton/rectangle-skeleton'
import SearchWrapper from '@/components/search/migration-search'
import BoardDatePicker from '@/components/date-picker/date-picker'

export default function BoardListPage({ searchParams }) {
  const query = searchParams?.query
  const queryType = searchParams?.queryType // default queryType : 제목
  const currentPage = Number(searchParams?.page) || 1
  const sortType = searchParams?.sortType // 없으면 null
  const startDate = searchParams?.startDate
  const endDate = searchParams?.endDate
  const category = searchParams?.category
  const totalPageCount = Number(searchParams?.pageCount) || 1
  console.log('searchParams, ', searchParams)

  return (
    <div className="bg-white">
      <div className="mx-20 font-tenada">
        <div className="flex flex-end justify-end">
          <Suspense fallback={<RectangleSkeleton width={500} height={40} />}>
            <SearchWrapper />
          </Suspense>
        </div>
        <div className="flex flex-end justify-end mt-3">
          <Suspense fallback={<RectangleSkeleton width={500} height={40} />}>
            <BoardDatePicker />
          </Suspense>
        </div>
        <div className="my-10 relative overflow-x-auto">
          <Suspense fallback={<RectangleSkeleton width={1440} height={1100} />}>
            <Table
              query={query}
              queryType={queryType}
              page={currentPage}
              sortType={sortType}
              startDate={startDate}
              endDate={endDate}
              category={category}
            />
          </Suspense>
        </div>
        <Suspense fallback={<RectangleSkeleton width={300} height={50} />}>
          <BoardPagination
            totalPageCount={totalPageCount}
            currentPage={currentPage}
          />
        </Suspense>
        <div className="flex flex-end justify-end">
          {/* 여기도 수정 필요함. write 페이지를 바깥에 빼고 통합 페이지로 할거면 */}
          <Button name="작성" href="/board/diary/write" />
        </div>
      </div>
    </div>
  )
}
