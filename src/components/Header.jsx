'use client'

import React from 'react'
import Image from 'next/image'
import { getCookie } from 'cookies-next'
const pages = [
  {
    page: '일기',
    href: '/diary',
  },
  {
    page: '게시판',
    href: '/board',
  },
  {
    page: '마이 페이지',
    href: '/mypage',
  },
]

function Header() {
  // if (getCookie('accessToken') === undefined && getCookie('refreshToken') != undefined) {
  //   window.location.href = '/renewal'
  // }
  // if (getCookie('accessToken') === undefined && getCookie('refreshToken') === undefined) {
  //   window.location.href = '/login'
  // }

  return (
    <nav className="w-full top-0 left-0 bg-white border-gray-200 px-4 lg:px-6 py-2.5">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="#" className="flex items-center">
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
          <a
            href={getCookie('accessToken') ? '/logout' : '/login'}
            className="nav-link"
          >
            {getCookie('accessToken') ? '로그아웃' : '로그인'}
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Header
