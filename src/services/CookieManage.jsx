'use client'
import { setCookie, getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

function checkAccessToken() {
  if (!getCookie('accessToken')) {
    return false
  } else return true
}

function checkRefreshToken() {
  if (!getCookie('refreshToken')) {
    return false
  } else return true
}

function RenewalToken() {
  async function renewTokenAndRedirect() {
    if (!checkAccessToken() && checkRefreshToken()) {
      const id = jwtDecode(getCookie('refreshToken')).userId
    } else {
      window.location.href = '/login'
    }

    try {
      console.log('renew')
      id = getUid()
      const response = await fetch(
        `https://arcadia-spring.p-e.kr/auth/refresh/${id}`,
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
  if (!getCookie('accessToken')) {
    return null
  } else if (getCookie('refreshToken')) {
    RenewalToken()
  } else {
    window.location.href = '/login'
  }
  return jwtDecode(getCookie('accessToken')).userId
}

function getEmail() {
  // 지금 현재 로그인 한 유저의 id를 받아옴
  if (!getCookie('accessToken')) {
    return null
  } else if (getCookie('refreshToken')) {
    RenewalToken()
  } else {
    window.location.href = '/login'
  }
  return jwtDecode(getCookie('accessToken')).email
}

function getAccessToken() {
  return getCookie('accessToken')
}

function getRefreshToken() {
  return getCookie('refreshToken')
}

export { RenewalToken, getUid, getEmail, getAccessToken, getRefreshToken }
