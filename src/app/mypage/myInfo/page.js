// 상담 신청서 조회 페이지

import Stack from '@mui/material/Stack'
import * as React from 'react'
import dynamic from 'next/dynamic'

const MyInfoTable = dynamic(
  () => import('@/components/myInfoTable/myInfoTable'),
  {
    ssr: false,
  },
)

const testData = {
  userNickname: '아르고1',
  userEmail: '아르고2',
  introduction: '아르고3', //이거 소개라는게 한줄소개 같은데, 용어사전에 없어서 걍 introduction으로 해놨음.
  userGender: '아르고4',
  userPhone: '아르고5',
}

function MyInfo() {
  let userInfo = testData

  const handleGetInfo = () => {
    fetch('/mypage/{UserId}', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json() // JSON 형태의 응답
        } else {
          console.error('실패')
        }
      })
      .then((data) => {
        // 가져온 데이터를 변수에 저장
        userInfo = data
      })
      .catch((error) => {
        console.error('오류 발생', error)
      })
  }

  return (
    <div>
      <div style={{ marginLeft: '15%' }}>
        <h2>내 정보</h2>
      </div>
      <div style={{ marginLeft: '15%' }}>
        <p>탭 컨포넌트 들어갈 자리</p>
      </div>
      <Stack direction="column" alignItems="center" spacing={2}>
        {userInfo ? ( // userInfo가 존재하면 MyInfoTable을 렌더링
          <MyInfoTable userInfo={userInfo} image="/images/testArgoImage.png" />
        ) : (
          <p>Loading...</p> // userInfo가 없을 때는 로딩 표시
        )}
      </Stack>
    </div>
  )
}

export default MyInfo
