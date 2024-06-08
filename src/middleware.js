import { NextRequest, NextResponse } from 'next/server'
import { RenewalToken } from './services/CookieManage'

export function middleware(request) {
  // 인증을 확인하기 위한 미들웨어
  if (!request.cookies.get('refreshToken')) {
    return NextResponse.redirect(new URL('/login', request.url))
  } else {
    if (!request.cookies.get('accessToken')) {
      // 자체적으로 fetch 이후에 set을 해줄 수 있음. 일단 동작하는지 확인하기
      // return NextResponse.rewrite(new URL('/renewal'), request.url)
      RenewalToken()
      //아님 아예 fetch는 가능하다고 하니 fetch 직접 해버리고 set을 여기서 해버리기?
    }
    return NextResponse.next()
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
