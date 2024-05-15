'use client'
import Stack from '@mui/material/Stack'
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import { TableCell } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/system'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'
import MyInfoCard from '../card/myInfoCard'

import { useRef } from 'react'

const CustomTableCell = styled(TableCell)(() => ({
  borderRight: '1px solid black', // borderRight 속성 추가
  textAlign: 'center',
}))

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

function MyInfoTable({ userInfo, image }) {
  const [editedUserInfo, setEditedUserInfo] = useState({ ...userInfo }) // 원래 있던 user 정보 우선 입력. 추후 정보 수정을 위한 상태 변수
  const [editMode, setEditMode] = useState(Array(5).fill(false)) // 각 행의 수정 모드를 저장하는 배열
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedImage, setSelectedImage] = useState(image) // 선택된 이미지를 관리

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

    axios
      .put(endpoint, editedUserInfo) // 추후 endpoint url 추가.
      .then((response) => {
        console.log('저장 성공', response.data)
        setEditMode(Array(5).fill(false))
        setIsEditMode(false) // 수정 모드 해제
      })
      .catch((error) => {
        console.error('에러', error)
      })
  }

  const rows = [
    { label: '닉네임', key: 'userNickname' },
    { label: 'E-mail', key: 'userEmail' },
    { label: '소개', key: 'introduction' },
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

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5} columnSpacing={2}>
          <Grid item xs={6} md={6} sx={{ width: '565px', mb: 3 }}>
            <Stack direction="column" alignItems="center" spacing={2}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ width: 490, border: 1 }}
                  aria-label="spanning table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={3}
                        sx={{ borderBottom: '1px solid black' }}
                      >
                        {/* 프로필 사진 */}
                        <img
                          src={selectedImage} // 선택된 이미지 표시
                          alt="image"
                          style={{
                            width: '35%',
                            height: 'auto',
                            cursor: 'pointer',
                          }}
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
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <CustomTableCell style={{ width: '15%' }}>
                          {row.label}
                        </CustomTableCell>
                        <CustomTableCell style={{ width: '70%' }}>
                          {editMode[index] ? ( // 수정 모드일 때만 입력 필드 표시
                            <TextField
                              value={editedUserInfo[row.key]}
                              fullWidth
                              sx={{ border: 'none' }}
                              onChange={(event) => {
                                setEditedUserInfo({
                                  ...editedUserInfo,
                                  [row.key]: event.target.value,
                                })
                              }}
                            />
                          ) : (
                            editedUserInfo[row.key] // 수정 모드가 아닐 때는 텍스트만 표시
                          )}
                        </CustomTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant="contained"
                onClick={isEditMode ? handleSave : handleEdit}
              >
                {isEditMode ? '저장' : '수정'}
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={6} md={6}>
            <Grid
              container
              spacing={1}
              sx={{ flexGrow: 1, alignItems: 'right' }}
              direction="column"
            >
              <Grid item xs={3} md={6}>
                <MyInfoCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default MyInfoTable
