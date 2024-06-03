'use client'

import Modal from '@/components/Modal'
import RectangleSkeleton from '@/components/loading-skeleton/rectangle-skeleton'
import { getProfileImage, getProfileInfo } from '@/services/profile-data'
import { useState, useEffect, useRef } from 'react'
import { RenewalToken, checkRenewalToken } from '@/services/CookieManage'
import { getCookie } from 'cookies-next'

function submitProfile(file) {
  // 이미지를 백엔드 서버로 전송

  // 이미지를 업로드할 FormData 객체 생성
  const formData = new FormData()
  formData.append('text', 'hello')
  formData.append('image', file)
  console.log('file: ', file)

  fetch(
    'https://c2fa1327-2fa1-46f2-b030-eba4d6b65b37.mock.pstmn.io/submitProfile',
    {
      method: 'POST',
      body: formData,
      cache: 'no-store',
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('이미지 업로드 실패')
      }
      console.log('이미지 업로드 성공')
    })
    .catch((error) => {
      console.error('이미지 업로드 에러', error)
    })
}

function updateNickname(nickName) {
  console.log('업데이트 될 닉네임 확인: ', nickName)
  fetch(
    'https://c2fa1327-2fa1-46f2-b030-eba4d6b65b37.mock.pstmn.io/mypage/edit',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: nickName,
      cache: 'no-store',
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('수정에 실패했습니다.')
      }
      return response.json()
    })
    .then((data) => {
      console.log('수정 성공', data)
    })
    .catch((error) => {
      console.error('에러', error)
    })
}

export default function SettingPage() {
  if (
    getCookie('accessToken') === undefined &&
    getCookie('refreshToken') !== undefined
  ) {
    RenewalToken()
  }

  // let profileImage = ''
  // let profileInfo = {
  //   name: '',
  //   nickName: '',
  //   email: '',
  //   postCount: Math.floor(Math.random() * 1001),
  //   followerCount: Math.floor(Math.random() * 1001),
  //   followingCount: Math.floor(Math.random() * 1001),
  //   description: '',
  //   userVerified: false,
  // }

  const [isLoading, setIsLoading] = useState(true)
  const [editedUserInfo, setEditedUserInfo] = useState({ ...getProfileInfo() }) // 원래 있던 user 정보 우선 입력. 추후 정보 수정을 위한 상태
  const [selectedImage, setSelectedImage] = useState(getProfileImage()) // 선택된 이미지를 관리
  const [isEditingNickName, setIsEditingNickName] = useState(false)
  const inputRef = useRef(null) // ref 생성
  const nicknameInputRef = useRef(null)

  useEffect(() => {
    // const profileImageTemp = getProfileImage()
    // const profileInfoTemp = getProfileInfo()

    // setSelectedImage(profileImageTemp)
    // setEditedUserInfo(profileInfoTemp)

    setIsLoading(false)

    // console.log('profileImage1111: ', profileImageTemp)
    // console.log('profileInfo1111: ', profileInfoTemp)
    console.log('check')
  }, [])

  useEffect(() => {
    if (isEditingNickName) {
      nicknameInputRef.current.focus()
    }
  }, [isEditingNickName])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
      submitProfile(file)
    }
  }

  const handleNicknameKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      updateNickname(editedUserInfo.nickName)
      setIsEditingNickName(false)
    }
  }

  const handleNicknameChange = (e) => {
    setEditedUserInfo({ ...editedUserInfo, nickName: e.target.value })
  }

  const handleImageClick = () => {
    inputRef.current.click() // 파일 선택 창 열기
  }

  if (isLoading) {
    return (
      <div>
        <RectangleSkeleton />
      </div>
    )
  }

  return (
    <div className="bg-white">
      <span className="mx-5 self-center text-6xl my-10 font-semibold">
        계정 설정
      </span>
      <div className="bg-white min-h-screen pt-2 font-tenada my-16">
        <div className="container mx-auto">
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
            <form className="mt-6 pt-4">
              <img
                src={selectedImage}
                className="lg:max-w-[90%] w-full h-full object-contain block mb-10 mx-auto"
                alt="login-image"
              />
              <button
                type="button"
                className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500 mb-5 "
                onClick={handleImageClick}
              >
                프로필 사진 변경
              </button>
              {/* 파일 선택 창 */}
              <input
                type="file"
                ref={inputRef}
                style={{ display: 'none' }}
                accept="image/png, image/jpeg" // PNG 및 JPG 파일만 허용
                onChange={(e) => {
                  handleImageChange(e)
                }}
              />
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    forhtml="grid-text-1"
                  >
                    이메일 주소
                  </label>
                  <input
                    className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                    id="grid-text-1"
                    type="text"
                    // placeholder="사용자 이메일 받아오기"
                    value={editedUserInfo.email}
                    disabled
                  />
                </div>
                <div className="w-full px-3 mb-6 flex">
                  <div className="w-full mr-5">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      forhtml="grid-text-1"
                    >
                      닉네임
                    </label>
                    {isEditingNickName ? (
                      <input
                        ref={nicknameInputRef}
                        className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                        id="grid-text-1"
                        type="text"
                        value={editedUserInfo.nickName}
                        onChange={handleNicknameChange}
                        onKeyDown={handleNicknameKeyDown}
                      />
                    ) : (
                      <input
                        className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                        id="grid-text-1"
                        type="text"
                        value={editedUserInfo.nickName}
                        disabled
                      />
                    )}
                  </div>
                  <div className="w-3/12">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      forhtml="grid-text-1"
                    >
                      닉네임 변경
                    </label>
                    <button
                      type="button"
                      className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                      onClick={() => setIsEditingNickName(!isEditingNickName)}
                    >
                      닉네임 변경
                    </button>
                  </div>
                </div>
                <div className="w-full px-3 mb-6 flex">
                  <div className="w-full mr-5">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      forhtml="grid-text-1"
                    >
                      휴대폰 번호
                    </label>
                    <input
                      className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                      id="grid-text-1"
                      type="text"
                      value={editedUserInfo.phoneNumber}
                      placeholder="사용자 번호 받아오기"
                      disabled
                    />
                  </div>
                  <div className="w-3/12">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      forhtml="grid-text-1"
                    >
                      휴대폰 인증
                    </label>
                    <button
                      type="button"
                      className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                    >
                      휴대폰 인증
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-full px-3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    비밀번호
                  </label>
                  <button
                    type="button"
                    className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                  >
                    비밀번호 변경
                  </button>
                </div>
                <div className="w-full md:w-full px-3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    전문가 인증
                  </label>
                  <button
                    type="button"
                    className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                  >
                    전문가 인증
                  </button>
                </div>
                <div className="personal w-full pt-4">
                  <div className="w-full md:w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      소개
                    </label>
                    <textarea
                      className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                      value={editedUserInfo.description}
                      required
                      onChange={(e) => {
                        setEditedUserInfo({
                          ...editedUserInfo,
                          description: e.target.value,
                        })
                      }}
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                      type="submit"
                    >
                      저장
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <hr className="my-5" />
          <div className="text-center">
            <button
              data-modal-target="user-resign"
              data-modal-toggle="user-resign"
              className="text-black bg-red-700 border border-red-300 w-4/12 text-base text-white px-4 py-3 rounded-md outline-blue-500"
              type="submit"
            >
              회원 탈퇴
            </button>
          </div>
          <Modal
            modalId="user-resign"
            modalTitle="회원 탈퇴"
            modalContent="정말로 탈퇴하시겠습니까?"
            modalType={false}
          />
        </div>
      </div>
    </div>
  )
}
