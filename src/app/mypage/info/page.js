// 내 정보 페이지

import Stack from '@mui/material/Stack'
import * as React from 'react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const MyInfoTable = dynamic(
  () => import('@/components/myInfoTable/myInfoTable'),
  {
    ssr: false,
  },
)

function MyInfo() {
  return (
    <div>
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        style={{ marginTop: '20px' }}
      >
        <Suspense fallback={<p>TEST LOADING</p>}>
          <MyInfoTable />
        </Suspense>
      </Stack>
    </div>
  )
}

export default MyInfo
