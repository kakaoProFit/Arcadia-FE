'use client'
// 근데 전체적으로 어디서 router를 돌려야할지 감이 안오는데?
import { Box, Tabs, Tab } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { green } from '@mui/material/colors'

export default function DiaryListTab() {
  const pathname = usePathname()
  // 탭 props 생성
  let tabProps = []

  // 각 라우팅에 맞는 탭을 생성
  if (
    pathname === '/diary/mydiary' ||
    pathname === '/diary/weekly-report' ||
    pathname === '/diary/monthly-report'
  ) {
    tabProps = [
      { label: '나의 일기', href: '/diary/mydiary' },
      { label: '주간 분석서', href: '/diary/weekly-report' },
      { label: '월간 분석서', href: '/diary/monthly-report' },
    ]
  } else if (
    pathname === '/diary/community' ||
    pathname === '/diary/friends-diary'
  ) {
    tabProps = [
      { label: '공유 일기', href: '/diary/community' },
      { label: '친구 일기', href: '/diary/friends-diary' },
    ]
  } else if (
    pathname === '/mypage/diary' ||
    pathname === '/mypage/contact' ||
    pathname === '/mypage/myInfo' // ||
    // pathname === '/mypage/setting'
  ) {
    tabProps = [
      { label: '일기 조회', href: '/mypage/diary' },
      { label: '상담 신청서 조회', href: '/mypage/contact' },
      { label: '내 정보', href: '/mypage/myInfo' },
      // { label: '설정', href: '/mypage/setting' },
    ]
  }

  // 걀극 하드코딩으로 tab 움직임을 설정함.
  let tabNum = 0
  if (
    pathname === '/diary/mydiary' ||
    pathname === '/diary/community' ||
    pathname === '/mypage/diary'
  ) {
    tabNum = 0
  } else if (
    pathname === '/diary/weekly-report' ||
    pathname === '/diary/friends-diary' ||
    pathname === '/mypage/contact'
  ) {
    tabNum = 1
  } else if (
    pathname === '/diary/monthly-report' ||
    pathname === '/mypage/myInfo'
  ) {
    tabNum = 2
  }
  // else if (pathname === '/mypage/setting') {
  //   tabNum = 3
  // }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tabNum}
        aria-label="nav tabs"
        role="navigation"
        textColor="secondary"
        indicatorColor="secondary"
      >
        {tabProps.map((it, index) => (
          <Tab
            component={Link}
            key={index}
            label={it.label}
            href={`${it.href}`}
          />
        ))}
      </Tabs>
    </Box>
  )
}
