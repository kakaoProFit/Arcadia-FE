import React from 'react'
import Image from 'next/image'

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
  {
    page: '로그인',
    href: '/login',
  },
]

function Header() {

  return (
          <nav class="w-full top-0 left-0 bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <a href="#" class="flex items-center">
                    <Image src="/images/logo_transparent.png" alt="Arcadia Logo" width="70" height="70" />
                    <span class="font-tenada self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Arcadia</span>
                </a>
                  <div class="flex items-center lg:order-1">
                    {pages.map((page, index) => (
                      <a key={index} href={page.href} className="nav-link">{page.page}</a>
                    ))}
                </div>
            </div>
        </nav>
  )
}

export default Header
