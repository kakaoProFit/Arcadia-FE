// 내 정보 페이지

import Stack from '@mui/material/Stack'
import * as React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import InfoGrid from '@/components/myInfoTable/infoGrid'

/*
      { <Stack
        direction="column"
        alignItems="center"
        spacing={2} 
        style={{ marginTop: '20px' }}
      >
        {userInfo ? ( // userInfo가 존재하면 MyInfoTable을 렌더링
          <MyInfoTable userInfo={userInfo} image="/images/user_default.png" /> // profileImage.image_s3_url 로 하면 s3에 저장된 일기 분석서 이미지 나오는거 확인함. mock서버 횟수제한때문에 일단 로컬 이미지로 돌려놨음.
        ) : (
          <p>Loading...</p> // userInfo가 없을 때는 로딩 표시
        )}
      </Stack> }
*/

const tmp = [
  {
    id: 1,
    src: '/images/user1.jpg',
  },
  {
    id: 2,
    src: '/images/user2.jpg',
  },
  {
    id: 3,
    src: '/images/user3.jpg',
  },
  {
    id: 4,
    src: '/images/user4.jpg',
  },
  {
    id: 5,
    src: '/images/user4.jpg',
  },
  {
    id: 6,
    src: '/images/user4.jpg',
  },
  {
    id: 7,
    src: '/images/user4.jpg',
  },
  {
    id: 8,
    src: '/images/user4.jpg',
  },
  {
    id: 9,
    src: '/images/user4.jpg',
  },
  {
    id: 10,
    src: '/images/user4.jpg',
  },
]
const MyInfoTable = dynamic(
  () => import('@/components/myInfoTable/myInfoTable'),
  {
    ssr: false,
  },
)

const testData = {
  userNickname: '홍길동',
  userName: '이름입니다',
  userEmail: 'honggildong@naver.com',
  userGender: 'Male',
  userPhone: '010-1111-1111',
  userVerified: true,
}

const testUser = {
  userId: 1532,
  name: '홍길동',
  email: 'honggildong@naver.com',
  postCount: Math.floor(Math.random() * 1001),
  followerCount: Math.floor(Math.random() * 1001),
  followingCount: Math.floor(Math.random() * 1001),
  description:
    '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
  image: '/images/user_default.png',
  userVerified: false,
}

async function getProfileImage() {
  const response = await fetch(
    'https://c2fa1327-2fa1-46f2-b030-eba4d6b65b37.mock.pstmn.io/diary', // 이거 추후 프로필사진 s3 url로 바꿔야함. 지금은 테스트용으로 일기 분석서 이미지 가져옴
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  )

  const data = await response.json()

  return data
}

async function MyInfo() {
  let userInfo = testData
  const profileImage = await getProfileImage()

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
    <div className="my-3">
      <InfoGrid data={testUser} />
    </div>
  )
}

export default MyInfo
