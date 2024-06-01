'use client'

import { useEffect } from 'react'
import { getCookie, deleteCookie } from 'cookies-next'

export default function Logout() {
  useEffect(() => {
    if (getCookie('accessToken')) {
      console.log(getCookie('accessToken'))
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
      window.location.href = '/'
    }
  }, [])

  return null // 컴포넌트는 아무 것도 렌더링하지 않음
}
