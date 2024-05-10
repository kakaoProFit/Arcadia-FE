'use client'
import React, { useState } from 'react'
import Tap from '@/components/Tap.jsx'
import '@/styles/globals.css'
import Table from '@/components/Table.jsx'
import TableData from '@/components/TableData.jsx'

export default function Home() {
  // useState 훅을 사용하여 login 상태와 상태를 변경하는 함수를 선언합니다.
  const [login, setLogin] = useState(true)

  // 로그인 상태를 변경하는 함수입니다.
  function toggleLogin() {
    setLogin((prevLogin) => !prevLogin)
  }

  return (
    <div className="bg-white ">
      <Tap />
      <div className="mx-20 font-tenada">
        <span className="mx-5 self-center text-3xl my-10 font-semibold whitespace-nowrap dark:text-white">
          게시판 이름
        </span>
        <button
          className="bg-white hover:bg-gray-400 mx-5 py-1 px-1 rounded inline-flex items-center"
          onClick={toggleLogin}
        >
          {login ? '테스트 :: 로그인 설정' : '테스트 :: 로그인 해제'}
        </button>
        <div className="my-10 relative overflow-x-auto">
          <Table data={TableData()} count={12} login={login} />
        </div>
      </div>
    </div>
  )
}
