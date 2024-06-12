'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { getCookie } from 'cookies-next'

const pages = [
  {
    page: '일기',
    href: '/board/diary',
  },
  {
    page: '게시판',
    href: '/board?category=free',
  },
  {
    page: '마이 페이지',
    href: '/mypage/info',
  },
]

function Header() {
  const [isLogin, setIsLogin] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsLogin(getCookie('accessToken') ? true : false)
    setIsMounted(true)
  }, [getCookie('accessToken')])

  if (!isMounted) {
    return null // 로딩 중에는 아무것도 보여주지 않음
  }

  useEffect(() => {
    setIsLogin(getCookie('accessToken') ? true : false)
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // 로딩 중에는 아무것도 보여주지 않음
  }
  return (
    <nav className="w-full top-0 left-0 bg-white border-gray-200 px-4 lg:px-6 py-2.5">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="/" className="flex items-center">
          <Image
            src="/images/logo_transparent.png"
            alt="Arcadia Logo"
            width="70"
            height="70"
          />
          <span className="font-tenada self-center text-3xl font-semibold whitespace-nowrap">
            Arcadia
          </span>
        </a>
        <div className="flex items-center lg:order-1">
          {pages.map((page, index) => (
            <a key={index} href={page.href} className="nav-link">
              {page.page}
            </a>
          ))}
          <a href={isLogin ? '/logout' : '/login'} className="nav-link">
            {isLogin ? '로그아웃' : '로그인'}
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Header
