'use client'
import { setCookie, getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

function RenewalToken() {
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

      await setCookie('accessToken', resData.accessToken, {
        maxAge:
          jwtDecode(resData.accessToken).exp - Math.floor(Date.now() / 1000),
      })

      await setCookie('refreshToken', resData.refreshToken, {
        maxAge:
          jwtDecode(resData.refreshToken).exp - Math.floor(Date.now() / 1000),
      })

      // 이후에 리다이렉트
    } catch (error) {
      console.error('Error during fetch:', error)
    }
  }
}

function getUid() {
  // 지금 현재 로그인 한 유저의 id를 받아옴
  if (!getCookie('accessToken')) throw new Error('No accessToken')
  else if (getCookie('refreshToken')) {
    RenewalToken()
  } else {
    window.location.href = '/login'
  }
  return jwtDecode(getCookie('accessToken')).userId
}

export { RenewalToken, getUid }
