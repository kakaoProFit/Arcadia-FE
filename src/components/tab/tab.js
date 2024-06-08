'use client'
import Link from 'next/link'
import { board_tab_config, mypage_tab_config } from '@/constants/tab-config'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

export default function SubTab() {
  let tab_config_data = []
  const pathname = usePathname()
  let isBoard = true
  // 마이페이지와 일반 게시판에 대한 탭을 다르게 띄워주기 위한 분기처리
  if (
    pathname === '/board' ||
    pathname === '/board/diary' ||
    pathname === '/board/question' ||
    pathname === '/board/free' ||
    pathname === '/board/inform'
  ) {
    tab_config_data = board_tab_config
    isBoard = true
  } else if (
    pathname === '/mypage/doc' ||
    pathname === '/mypage/info' ||
    pathname === '/mypage/report' ||
    pathname === '/mypage/setting'
  ) {
    tab_config_data = mypage_tab_config
    isBoard = false
  }

  const title = tab_config_data.find((data) => data.href === pathname)

  return (
    <div className="bg-white mb-10 lg:px-6 py-2.5">
      <div className="mx-auto font-tenada">
        <div className="mx-10 border-b border-gray-200 dark:border-gray-700 mb-10">
          <ul
            className="flex flex-wrap -mb-px"
            id="myTab"
            data-tabs-toggle="#myTabContent"
            role="tablist"
          >
            {tab_config_data.map((item) => (
              <li key={item.id} className="mr-2" role="presentation">
                <button
                  className="text-lg inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                  id={item.id}
                >
                  <Link href={item.href}>{item.name}</Link>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {isBoard && (
          <span className="mx-20 self-center text-4xl my-10 font-semibold whitespace-nowrap">
            {title?.title}
          </span>
        )}
      </div>
    </div>
  )
}
