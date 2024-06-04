'use client'
export function getProfileImage() {
  // const response = fetch(
  //   '/diary', // 이거 추후 프로필사진 s3 url로 바꿔야함. 지금은 테스트용으로 일기 분석서 이미지 가져옴
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     cache: 'no-store',
  //   },
  // )

  // const data = response.json()
  const data =
    'https://arcadiaimage.s3.ap-northeast-2.amazonaws.com/663952185e1c8a8b1bec4ecf.png'

  return data
}

export function getProfileInfo() {
  // const response = fetch('/mypage', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })

  // const data = response.json()
  const data = {
    name: '홍길동',
    nickName: '홍박사',
    phoneNumber: '010-1234-5678',
    email: 'honggildong@naver.com',
    postCount: Math.floor(Math.random() * 1001),
    followerCount: Math.floor(Math.random() * 1001),
    followingCount: Math.floor(Math.random() * 1001),
    description:
      '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
    userVerified: false,
  }

  return data
}
