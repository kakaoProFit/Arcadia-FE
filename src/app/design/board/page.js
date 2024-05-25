'use client'
import React, { useState } from 'react'
import Tap from '@/components/Tap.jsx'
import '@/styles/globals.css'
import Post from '@/components/Post.jsx'

const data = {
  writer: '김민수',
  title: '테스트',
  content: '테스트',
  dirViews: 0,
}

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
      <Post props={data} />
    </div>
  )
}
