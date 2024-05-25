'use client'
import React, { Suspense, useState } from 'react'
import '@/styles/globals.css'
import Table from '@/components/Table.jsx'
import TableData from '@/components/TableData.jsx'
import SearchBar from '@/components/SearchBar'
import Button from '@/components/Button'
import DiaryPagination from '@/components/pagination/pagination'
import RectangleSkeleton from '@/components/loading-skeleton/rectangle-skeleton'

export default function BoardListPage() {
  const [datas, setDatas] = useState(TableData())

  function testRender() {}
  return (
    <div className="bg-white">
      <div className="mx-20 font-tenada">
        <span className="mx-5 self-center text-3xl my-10 font-semibold whitespace-nowrap">
          자유 게시판
        </span>
        <div className="flex flex-end justify-end">
          <SearchBar />
        </div>
        <div className="my-10 relative overflow-x-auto">
          <Table data={datas} count={12} />
        </div>
        <Suspense fallback={<RectangleSkeleton />}>
          {/* 원래는 props를 전달해주어야 숫자도 같이 나옴 */}
          <DiaryPagination />
        </Suspense>
        <div className="flex flex-end justify-end">
          <Button name="작성" href="/board/diary/write" />
        </div>
      </div>
    </div>
  )
}
