'use client'

import React from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

const Home = ({ searchParams }) => {
  const router = useRouter()
  const data = searchParams
  function socialLogin(data) {
    if (!data.access_token || !data.refresh_token) {
      return (
        <div>
          <h1>로그인 실패</h1>
        </div>
      )
    } else {
      setCookie('accessToken', data.access_token)
      setCookie('refreshToken', data.refresh_token)
      router.push('/')
    }
  }
  socialLogin(data)
  return (
    <div>
      <h1>로그인 중...</h1>
    </div>
  )
}

export default Home
