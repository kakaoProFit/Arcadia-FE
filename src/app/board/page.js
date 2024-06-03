import React, { Suspense } from 'react'
import '@/styles/globals.css'
import Table from '@/components/Table.jsx'
import TableData from '@/components/TableData.jsx'
import Button from '@/components/Button'
import DiaryPagination from '@/components/pagination/pagination'
import RectangleSkeleton from '@/components/loading-skeleton/rectangle-skeleton'
import SearchWrapper from '@/components/search/migration-search'
import BoardDatePicker from '@/components/date-picker/date-picker'

export default function BoardListPage({ searchParams }) {
  // useState 훅을 사용하여 login 상태와 상태를 변경하는 함수를 선언합니다.
  // state 변수를 return에서 사용하는데 uesEffect를 사용하지 않아서 아래 오류가 발생하는 걸로 예측됨.
  // Error: Text content does not match server-rendered HTML.
  const datas = TableData()

  const query = searchParams?.query
  const queryType = searchParams?.queryType // default queryType : 제목
  const currentPage = Number(searchParams?.page) || 1
  const sortType = searchParams?.sortType || '작성일자순'
  const startDate = searchParams?.startDate // 없으면 null
  const endDate = searchParams?.endDate
  const category = searchParams?.category
  const totalPageCount = Number(searchParams?.pageCount) || 1
  // const sizePerPage = 12

  // console.log("change searchParams, ", searchParams)
  // const params = new URLSearchParams()
  // console.log("check params, ", params)
  // for (const [key, value] of params.entries()) console.log(`check ${key}, ${value}`)
  // const d_data = fetch(`https://spring.arcadiaprofit.shop/board/list/${category}`, {
  //   method: 'GET',
  //   cache: 'no-store',
  // }).then((res) => console.log("check", res))

  return (
    <div className="bg-white">
      <div className="mx-20 font-tenada">
        {/* <span className="mx-5 self-center text-3xl my-10 font-semibold whitespace-nowrap">
          자유 게시판
        </span> */}
        <div className="flex flex-end justify-end">
          <Suspense fallback={<RectangleSkeleton width={500} height={40} />}>
            <SearchWrapper />
          </Suspense>
        </div>
        <div className="flex flex-end justify-end mt-3">
          <Suspense fallback={<RectangleSkeleton width={500} height={40} />}>
            {/* 이 녀석 다시 배치되어야함. */}
            <BoardDatePicker />
          </Suspense>
        </div>
        <div className="my-10 relative overflow-x-auto">
          <Suspense fallback={<RectangleSkeleton width={1440} height={1100} />}>
            <Table
              data={datas}
              // count={sizePerPage}
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
          {/* 원래는 props를 전달해주어야 숫자도 같이 나옴 */}
          <DiaryPagination
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
