'use client'

import { useState, useEffect } from 'react'
import { getCookie, deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { getUid } from '@/services/CookieManage'

export default function Logout() {
  const [id, setId] = useState('')
  const router = useRouter()
  useEffect(() => {
    async function logout() {
      setId(getUid())
      const res = await fetch(
        `https://spring.arcadiaprofit.shop/auth/logout/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (res.status === 200) {
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        router.push('/')
      }
    }
    if (getCookie('accessToken')) {
      logout()
    } else {
      router.push('/')
    }
  }, [])

  return null // 컴포넌트는 아무 것도 렌더링하지 않음
}
