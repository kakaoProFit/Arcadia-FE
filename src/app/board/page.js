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
  // useState 훅을 사용하여 login 상태와 상태를 변경하는 함수를 선언합니다.
  // state 변수를 return에서 사용하는데 uesEffect를 사용하지 않아서 아래 오류가 발생하는 걸로 예측됨.
  // Error: Text content does not match server-rendered HTML.
  const [login, setLogin] = useState(true)
  const [datas, setDatas] = useState(TableData())
  const [names, setNames] = useState('test')

  // 로그인 상태를 변경하는 함수입니다.
  function toggleLogin() {
    setLogin((prevLogin) => !prevLogin)
  }

  function sortLikes() {
    setDatas(datas.sort((a, b) => a.likes - b.likes))
  }
  function changeName() {
    setNames('success')
  }

  function testRender() {}
  return (
    <div className="bg-white">
      <p>{names}</p>
      <div className="mx-20 font-tenada">
        <span className="mx-5 self-center text-3xl my-10 font-semibold whitespace-nowrap">
          자유 게시판
        </span>
        <button
          className="bg-white hover:bg-gray-400 mx-5 py-1 px-1 rounded inline-flex items-center"
          onClick={toggleLogin}
        >
          {login ? '테스트 :: 로그인 설정' : '테스트 :: 로그인 해제'}
        </button>
        <div className="flex flex-end justify-end">
          <SearchBar />
        </div>
        <div className="my-10 relative overflow-x-auto">
          <Table data={datas} count={12} login={login} />
        </div>
        <Suspense fallback={<RectangleSkeleton />}>
          {/* 원래는 props를 전달해주어야 숫자도 같이 나옴 */}
          <DiaryPagination />
        </Suspense>
        <button
          className="bg-white hover:bg-gray-400 mx-5 py-1 px-1 rounded inline-flex items-center"
          onClick={changeName}
        >
          조회순 정렬
        </button>
        <div className="flex flex-end justify-end">
          <Button name="작성" href="/board/diary/write" />
        </div>
      </div>
    </div>
  )
}
