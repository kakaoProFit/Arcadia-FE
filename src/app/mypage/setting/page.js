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
  formData.append('file', file)

  fetch(
    'https:/spring.arcadiaprofit.shop/profileimage/upload?user_id=1', // ${user_id}
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

function saveProfileInfo(profileInfo) {
  fetch(
    `https:/spring.arcadiaprofit.shop/users/update/1`, // ${userId}
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileInfo),
      cache: 'no-store',
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('프로필 저장 실패')
      }
      console.log('프로필 저장 성공')
    })
    .catch((error) => {
      console.error('프로필 저장 에러', error)
    })
}

export default function SettingPage() {
  if (
    getCookie('accessToken') === undefined &&
    getCookie('refreshToken') !== undefined
  ) {
    RenewalToken()
  }

  const [isLoading, setIsLoading] = useState(true)
  const [editedUserInfo, setEditedUserInfo] = useState({ ...getProfileInfo() }) // 원래 있던 user 정보 우선 입력. 추후 정보 수정을 위한 상태
  const [selectedImage, setSelectedImage] = useState(getProfileImage()) // 선택된 이미지를 관리
  const [isEditingNickName, setIsEditingNickName] = useState(false)
  const inputRef = useRef(null) // ref 생성
  const nicknameInputRef = useRef(null)

  useEffect(() => {
    getProfileInfo().then((data) => {
      // 비동기로 받아오고 난 후, 값 다시 업데이트
      setEditedUserInfo(data)
      setIsLoading(false)
    })
    getProfileImage().then((data) => {
      setSelectedImage(data)
      setIsLoading(false)
    })

    console.log('check')
  }, [])

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
      setIsEditingNickName(false)
    }
  }

  const handleNicknameChange = (e) => {
    setEditedUserInfo({ ...editedUserInfo, fullName: e.target.value })
  }

  const handleImageClick = () => {
    inputRef.current.click() // 파일 선택 창 열기
  }

  const handleSubmit = (e) => {
    // e.preventDefault()
    saveProfileInfo(editedUserInfo)
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
                style={{ width: '500px', height: 'auto', objectFit: 'cover' }} // 프로필 사진의 크기를 고정
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
                        value={editedUserInfo.fullName}
                        onChange={handleNicknameChange}
                        onKeyDown={handleNicknameKeyDown}
                      />
                    ) : (
                      <input
                        className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                        id="grid-text-1"
                        type="text"
                        value={editedUserInfo.fullName}
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
                      value={editedUserInfo.phone}
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
                      onClick={handleSubmit}
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
