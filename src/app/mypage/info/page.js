// 내 정보 페이지

import Stack from '@mui/material/Stack'
import * as React from 'react'
import dynamic from 'next/dynamic'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import Image from 'next/image'

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
    <div class="my-3">
      <div class="bg-white h-auto px-48 flex">
        <img src="/images/user1.jpg" class="w-1/4 h-1/4" />
        <div class="flex md:flex-row-reverse flex-wrap">
          <div class="w-full md:w-3/4 p-4 text-center">
            <div class="text-left pl-4 pt-3">
              <span class="text-4xl text-gray-700 text-2xl mr-2">
                에스파
                <VerifiedUserIcon className="w-10 h-10 mx-2.5 text-blue-500" />
              </span>
            </div>
            <div class="text-left pl-4 pt-3">
              <span class="text-2xl text-gray-700 text-2xl mr-2">
                kinderjoy@gachon.ac.kr
              </span>
            </div>
            <div class="text-left pl-4 pt-3">
              <span class="text-2xl font-semibold text-gray-700 mr-2">
                <b>220</b> 게시글
              </span>
              <span class="text-2xl font-semibold text-gray-700 mr-2">
                <b>114</b> 팔로워
              </span>
              <span class="text-2xl font-semibold text-gray-700">
                <b>200</b> 팔로잉
              </span>
            </div>
            <div class="text-left pl-4 pt-3">
              <p class="text-xl font-medium text-black mr-2">
                #해시 #태그 #를 #넣을까 #말까 넣으면 내용은 어떻게 넣을까
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-gray-500 mt-6" />
      <div class="grid grid-cols-3 mx-10">
        {tmp.map((data, key) => (
          <div key={key} class="flex-1 text-center px-4 py-2 m-2">
            <Image className="w-full" src={data.src} width={5} height={300} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyInfo
