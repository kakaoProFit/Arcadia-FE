'use client'
import * as React from 'react'
import { useState, useEffect } from 'react'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'

function MyInfoTable({ userInfo, image }) {
  const [editedUserInfo, setEditedUserInfo] = useState({ ...userInfo }) // 원래 있던 user 정보 우선 입력. 추후 정보 수정을 위한 상태 변수
  const [editMode, setEditMode] = useState(Array(5).fill(false)) // 각 행의 수정 모드를 저장하는 배열
  const [isEditMode, setIsEditMode] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false) // 팝업을 보여줄지 여부를 관리하는 상태 추가

  const handleEdit = () => {
    setEditMode(Array(5).fill(true)) // 모든 요소를 true로 설정하여 수정 모드로 변경
    setIsEditMode(true) // 수정 모드에 들어온 것을 확인 -> 저장 버튼으로 변경
  }

  useEffect(() => {
    if (!editMode) {
      setEditedUserInfo({ ...userInfo }) // 수정 모드 해제 시 원래 정보로 복구
    }
  }, [editMode, userInfo])

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
          throw new Error('저장에 실패했습니다.')
        }
        return response.json()
      })
      .then((data) => {
        console.log('저장 성공', data)
        setEditMode(Array(5).fill(false))
        setIsEditMode(false) // 수정 모드 해제
      })
      .catch((error) => {
        console.error('에러', error)
      })
  }

  const handleDeleteAccount = () => {
    // 회원탈퇴
    fetch(`/user/resign/${userId}`, {
      // user ID 어떻게 다룰거지? -> 아직 미정
      method: 'POST',
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
                  <img
                    src={image}
                    alt="image"
                    className="w-7/12 h-7/12 mx-auto"
                  />
                  {userInfo.userVerified && (
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
            onClick={handleDeleteAccount}
          >
            회원 탈퇴
          </button>
        </div>
        {showSuccessModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <p>회원 탈퇴에 성공하였습니다.</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
                onClick={() => {
                  {
                    /* 이부분 추후 메인페이지 url로 교체하기 */
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
