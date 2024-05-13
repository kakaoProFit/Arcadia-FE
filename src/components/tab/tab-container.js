'use client'
import { Grid, Stack, Typography, Button } from '@mui/material'
import DiaryListTab from './tab'
import SearchTextField from '../search/search'
import DiaryDatePicker from '../date-picker/date-picker'
import { usePathname, useRouter } from 'next/navigation'
import DiaryCardArray from '../content-array/content-array'
import CreateIcon from '@mui/icons-material/Create'

export default function TabContainer() {
  const router = useRouter()

  let pathCheck = true
  const pathname = usePathname()
  if (
    pathname === '/diary/monthly-report' ||
    pathname === '/diary/weekly-report' ||
    pathname === '/mypage/contact' ||
    pathname === '/mypage/myInfo'
  ) {
    pathCheck = false
  } else pathCheck = true

  let tabProps = []

  // 각 라우팅에 맞는 탭을 생성
  if (
    pathname === '/diary/mydiary' ||
    pathname === '/diary/weekly-report' ||
    pathname === '/diary/monthly-report'
  ) {
    tabProps = [
      { label: '나의 일기', href: '/diary/mydiary', title: '일기' },
      {
        label: '주간 분석서',
        href: '/diary/weekly-report',
        title: '분석서 조회',
      },
      {
        label: '월간 분석서',
        href: '/diary/monthly-report',
        title: '분석서 조회',
      },
    ]
  } else if (
    pathname === '/diary/community' ||
    pathname === '/diary/friends-diary'
  ) {
    tabProps = [
      { label: '공유 일기', href: '/diary/community', title: '게시판' },
      { label: '친구 일기', href: '/diary/friends-diary', title: '게시판' },
    ]
  } else if (
    pathname === '/mypage/mydiary' ||
    pathname === '/mypage/contact' ||
    pathname === '/mypage/myInfo'
  ) {
    tabProps = [
      { label: '일기 조회', href: '/mypage/mydiary', title: '마이 페이지' },
      {
        label: '상담 신청서 조회',
        href: '/mypage/contact',
        title: '마이 페이지',
      },
      { label: '내 정보', href: '/mypage/myInfo', title: '마이 페이지' },
    ]
  }

  // 걀극 하드코딩으로 tab 움직임을 설정함.
  let tabNum = 0
  if (
    pathname === '/diary/mydiary' ||
    pathname === '/diary/community' ||
    pathname === '/mypage/my-diary'
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

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ ml: 11, mr: 17, mt: 6, mb: 3 }}
      >
        <Typography variant="h3">{tabProps[tabNum]?.title}</Typography>
        {/* {pathCheck && (
          <Button
            variant="contained"
            color="inherit"
            size="small"
            sx={{ height: 40 }}
            startIcon={<CreateIcon />}
            onClick={() => router.push('/diary/write')}
          >
            <Typography variant="button">
              일상을 적고 내 마음을 확인하기!
            </Typography>
          </Button>
        )} */}
      </Stack>
      <Grid container spacing={2} sx={{ mx: 10 }}>
        <Grid item xs={8}>
          <DiaryListTab tabNum={tabNum} tabProps={tabProps} />
        </Grid>
        {/* {pathCheck && (
          <Grid item xs={4}>
            <SearchTextField />
          </Grid>
        )} */}
      </Grid>
      {/* {pathCheck && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={3}
          sx={{ mr: 17, mb: 5 }}
        >
          <DiaryCardArray />
          <DiaryDatePicker />
        </Stack>
      )} */}
    </>
  )
}
