'use client'
import Link from 'next/link'
import { board_tab_config, mypage_tab_config } from '@/constants/tab-config'
import { usePathname } from 'next/navigation'

export default function SubTab() {
  // let tab_config_data=mypage_tab_config;
  let tab_config_data = []
  const pathname = usePathname()
  // 마이페이지와 일반 게시판에 대한 탭을 다르게 띄워주기 위한 분기처리

  // 이런 방식으로 안하면 matcher라는 미들웨어를 도입하면 가능하긴 함.
  // 근데 다른 것도 그런식으로 묶여서 문제가 생길 수도 있지 않을까
  // tab container랑 똑같이 하면 되는 듯..
  if (
    pathname === '/board' ||
    pathname === '/board/diary' ||
    pathname === '/board/question' ||
    pathname === '/board/free' ||
    pathname === '/board/inform'
  ) {
    tab_config_data = board_tab_config
  } else if (
    pathname === '/mypage' ||
    pathname === '/mypage/doc' ||
    pathname === '/mypage/info' ||
    pathname === '/mypage/weekly-report' ||
    pathname === '/mypage/monthly-report' ||
    pathname === '/mypage/setting'
  ) {
    tab_config_data = mypage_tab_config
  }

  return (
    <div className="bg-white mb-10 lg:px-6 py-2.5">
      <div className="mx-auto font-tenada">
        <div className="mx-10 border-b border-gray-200 dark:border-gray-700 mb-4">
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
      </div>
    </div>
  )
}
