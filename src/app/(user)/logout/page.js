'use client'

import { useEffect } from 'react'
import { getCookie, deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()
  useEffect(() => {
    if (getCookie('accessToken')) {
      console.log(getCookie('accessToken'))
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
      // router.push('/')
    }
  }, [])

  return null // 컴포넌트는 아무 것도 렌더링하지 않음
}
