'use client'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useRef } from 'react'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import { getProfileImage, getProfileInfo } from '@/services/profile-data'

function submitProfile(file) {
  // 이미지를 백엔드 서버로 전송

  // 이미지를 업로드할 FormData 객체 생성
  const formData = new FormData()
  formData.append('text', 'hello')
  formData.append('image', file)

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

function MyInfoTable() {
  let profileImage = ''
  let profileInfo = {
    userNickname: '',
    userName: '',
    userEmail: '',
    userGender: '',
    userPhone: '',
    userVerified: true,
  }
  const [isLoading, setIsLoading] = useState(true)

  const [editedUserInfo, setEditedUserInfo] = useState({ ...profileInfo }) // 원래 있던 user 정보 우선 입력. 추후 정보 수정을 위한 상태
  const [editMode, setEditMode] = useState(Array(5).fill(false)) // 각 행의 수정 모드를 저장하는 배열
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedImage, setSelectedImage] = useState(profileImage) // 선택된 이미지를 관리
  const [showConfirmModal, setShowConfirmModal] = useState(false) // 회원 탈퇴 확인 팝업을 보여줄지 여부를 관리하는 상태
  const [showSuccessModal, setShowSuccessModal] = useState(false) // 회원탈퇴 후 나오는 팝업을 보여줄지 여부를 관리하는 상태

  const handleEdit = () => {
    setEditMode(Array(5).fill(true)) // 모든 요소를 true로 설정하여 수정 모드로 변경
    setIsEditMode(true) // 수정 모드에 들어온 것을 확인 -> 저장 버튼으로 변경
  }
  useEffect(
    () => {
      const profileImageTemp = getProfileImage()
      const profileInfoTemp = getProfileInfo()

      console.log('profileImageTemp: ', profileImageTemp)
      console.log('profileInfoTemp: ', profileInfoTemp)

      setSelectedImage(profileImageTemp)
      setEditedUserInfo(profileInfoTemp)

      setIsLoading(false)
    },
    [profileImage],
    [profileInfo],
  )

  useEffect(() => {
    if (!editMode) {
      setEditedUserInfo({ ...profileInfo }) // 수정 모드 해제 시 원래 정보로 복구
    }
  }, [editMode, profileInfo])

  const handleSave = () => {
    setEditMode(Array(5).fill(false)) // 수정 모드 해제
    setIsEditMode(false) // 수정 모드 해제

    fetch(
      'https://c2fa1327-2fa1-46f2-b030-eba4d6b65b37.mock.pstmn.io/mypage/edit',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUserInfo),
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
        setEditMode(Array(5).fill(false))
        setIsEditMode(false) // 수정 모드 해제
      })
      .catch((error) => {
        console.error('에러', error)
      })
  }

  const handleDeleteAccount = () => {
    // 회원탈퇴
    fetch(`https://c2fa1327-2fa1-46f2-b030-eba4d6b65b37.mock.pstmn.io/resign`, {
      // 회의후 토큰 파트 추가해야 함.
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('회원 탈퇴 성공')
          setShowSuccessModal(true) // 회원 탈퇴 성공 시 팝업 보여주기
        }
        throw new Error('회원 탈퇴 실패')
      })
      .catch((error) => {
        console.error('에러', error)
      })
  }

  const rows = [
    { label: '닉네임', key: 'userNickname' },
    { label: '이름', key: 'userName' },
    { label: 'E-mail', key: 'userEmail' },
    { label: '성별', key: 'userGender' },
    { label: '연락처', key: 'userPhone' },
  ]

  const inputRef = useRef(null) // ref 생성

  const handleImageClick = () => {
    inputRef.current.click() // 파일 선택 창 열기
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0] // 선택한 파일

    if (file) {
      const reader = new FileReader() // FileReader 객체 생성

      reader.onload = () => {
        // 파일을 읽으면 호출되는 콜백 함수
        const imageUrl = reader.result // 파일의 URL
        setSelectedImage(imageUrl) // 이미지 URL을 상태에 업데이트
        submitProfile(file)
      }

      reader.readAsDataURL(file) // 파일 읽기
    }
  }

  if (isLoading) {
    return <p>LOADING....................</p>
  }

  return (
    <div className="flex">
      <div className="mx-20 font-tenada">
        <div className="w-565 mb-3">
          <table
            className="w-490 border rounded-lg border-gray shadow-2 mb-10"
            aria-label="spanning table"
          >
            <thead>
              <tr>
                <th className="text-center border-b border-none" colSpan={3}>
                  {/* 프로필 사진 */}
                  <img
                    src={selectedImage} // 선택된 이미지 표시
                    alt="image"
                    className="w-7/12 h-7/12 mx-auto"
                    onClick={handleImageClick}
                  />

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
                  {profileInfo.userVerified && (
                    <div>
                      <VerifiedUserIcon className="w-10 h-10 text-blue-500" />
                      <p className="m-4 text-xl">전문가임</p>
                    </div>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="w-15 border-none text-center">{row.label}</td>
                  <td className="w-70 border-none text-center p-3 text-lg">
                    {editMode[index] ? (
                      <div>
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          required
                          onChange={(event) => {
                            setEditedUserInfo({
                              ...editedUserInfo,
                              [row.key]: event.target.value,
                            })
                          }}
                          value={editedUserInfo[row.key]}
                        />
                      </div>
                    ) : (
                      editedUserInfo[row.key]
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 justify-center rounded"
            onClick={isEditMode ? handleSave : handleEdit}
          >
            {isEditMode ? '저장' : '수정'}
          </button>
          <button
            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 justify-center rounded"
            onClick={() => setShowConfirmModal(true)}
          >
            회원 탈퇴
          </button>
        </div>
        {showConfirmModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <p>정말로 회원 탈퇴를 진행하시겠습니까?</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
                onClick={() => {
                  setShowConfirmModal(false)
                  handleDeleteAccount()
                }}
              >
                확인
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mt-4 rounded"
                onClick={() => setShowConfirmModal(false)}
              >
                취소
              </button>
            </div>
          </div>
        )}
        {showSuccessModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <p>회원 탈퇴에 성공하였습니다.</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
                onClick={() => {
                  {
                    /* 이부분 추후 메인페이지 url로 교체하기,  */
                  }
                  window.location.href = 'http://localhost:3000'
                }}
              >
                {' '}
                확인
              </button>
            </div>
          </div>
        )}
        <div></div>
      </div>
    </div>
  )
}

export default MyInfoTable
