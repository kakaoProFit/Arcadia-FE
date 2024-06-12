import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'

export async function middleware(request) {
  const response = NextResponse.next()

  const refresh = request.cookies.get('refreshToken')?.value
  const access = request.cookies.get('accessToken')?.value
  console.log('cookies get 확인 : ', request.cookies.getAll())

  if (!refresh) {
    return NextResponse.redirect(new URL('/login', request.url))
  } else {
    // access가 없는 경우
    if (!access) {
      const userId = jwtDecode(refresh).userId
      const res = await fetch(
        `https://spring.arcadiaprofit.shop/auth/refresh/${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: refresh }),
        },
      )
      if (!res.ok) {
        throw new Error('refresh api fetch error')
      }
      const data = await res.json()
      console.log('check access data ', data)
      response.cookies.set({
        name: 'accessToken',
        value: data.accessToken,
        maxAge: jwtDecode(data.accessToken).exp - Math.floor(Date.now() / 1000),
      })
      response.cookies.set({
        name: 'refreshToken',
        value: data.refreshToken,
        maxAge:
          jwtDecode(data.refreshToken).exp - Math.floor(Date.now() / 1000),
      })
      console.log('cookies set 확인 : ', response.cookies.getAll())
      return response
    }
  }
}

export const config = {
  matcher: [
    '/mypage/:path*',
    '/board/write',
    '/board/diary/modify',
    '/board/diary/analyze/:path',
  ],
}
