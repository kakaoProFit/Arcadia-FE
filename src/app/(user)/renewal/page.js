'use client'

import { setCookie, getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from 'react'

export default function RenewalToken() {
  const [res, setRes] = useState({ accessToken: null, refreshToken: null })
  const [id, setId] = useState(null)

  useEffect(() => {
    async function renewTokenAndRedirect() {
      try {
        console.log('renew')
        const response = await fetch(
          'https://arcadia-spring.p-e.kr/auth/refresh/52',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: getCookie('refreshToken') }),
          },
        )

        const resData = await response.json()

        // 필요한 데이터를 상태로 설정
        setRes({
          accessToken: resData.accessToken,
          refreshToken: resData.refreshToken,
        })

        await setCookie('accessToken', resData.accessToken, {
          maxAge:
            jwtDecode(resData.accessToken).exp - Math.floor(Date.now() / 1000),
        })

        // 이후에 리다이렉트
        window.location.href = '/'
      } catch (error) {
        console.error('Error during fetch:', error)
      }
    }

    renewTokenAndRedirect()
  }, []) // useEffect는 처음 한 번만 실행되도록 빈 배열을 두 번째 매개변수로 전달합니다.
}
