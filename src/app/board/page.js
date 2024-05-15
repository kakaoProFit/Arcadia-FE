'use client'
import React, { useState } from 'react'
import Tap from '@/components/Tap.jsx'
import '@/styles/globals.css'
import Table from '@/components/Table.jsx'
import TableData from '@/components/TableData.jsx'
import SearchBar from '@/components/SearchBar'
import Button from '@/components/Button'
import DiaryPagination from '@/components/pagination/pagination'

export default function BoardListPage() {
  // useState 훅을 사용하여 login 상태와 상태를 변경하는 함수를 선언합니다.
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
      <Tap />
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
        <DiaryPagination />
        <button
          className="bg-white hover:bg-gray-400 mx-5 py-1 px-1 rounded inline-flex items-center"
          onClick={changeName}
        >
          조회순 정렬
        </button>
        <div className="flex flex-end justify-end">
          <Button name="작성" href="/write" />
        </div>
      </div>
    </div>
  )
}
