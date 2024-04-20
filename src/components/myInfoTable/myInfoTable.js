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
import axios from 'axios'; 

const CustomTableCell = styled(TableCell)(() => ({
  borderRight: '1px solid black', // borderRight 속성 추가
  textAlign: 'center',
}))

function MyInfoTable({ userInfo }) {
  const [editedUserInfo, setEditedUserInfo] = useState({ ...userInfo }); // 원래 있던 user 정보 우선 입력. 추후 정보 수정을 위한 상태 변수
  const [editMode, setEditMode] = useState(Array(5).fill(false)); // 각 행의 수정 모드를 저장하는 배열

  const handleEdit = (index) => {
    setEditMode((prevModes) =>
      prevModes.map((mode, i) => (i === index ? !mode : mode))
    );
  };

  useEffect(() => {
    if (!editMode) {
      setEditedUserInfo({ ...userInfo }); // 수정 모드 해제 시 원래 정보로 복구
    }
  }, [editMode, userInfo]);

  const handleSave = () => {
    console.log("editedUserInfo: ", editedUserInfo);

    axios
      .put(endpoint, editedUserInfo) // 추후 endpoint url 추가.
      .then((response) => {
        console.log('저장 성공', response.data);
        setEditMode((prevModes) =>
          prevModes.map((mode, i) => (i === index ? false : mode))
        );
      })
      .catch((error) => {
        console.error('에러', error);
      });
  };

  return (
    <div>
      <Stack direction="column" alignItems="center" spacing={2}>
        <TableContainer component={Paper}>
          <Table sx={{ width: 600, border: 1 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={3}
                  sx={{ borderBottom: '1px solid black' }}
                >
                  <img
                    src="/images/testArgoImage.png"
                    alt="test"
                    style={{ width: '35%', height: 'auto' }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <CustomTableCell style={{ width: '15%' }}>
                  닉네임
                </CustomTableCell>
                <CustomTableCell style={{ width: '70%' }}>
                  {editMode[0] ? ( // 수정 모드일 때만 입력 필드 표시
                    <TextField
                      value={editedUserInfo.userNickname}
                      fullWidth
                      sx={{ border: 'none' }}
                      onChange={(event) => {
                        setEditedUserInfo({
                          ...editedUserInfo,
                          userNickname: event.target.value
                        });
                      }}
                    />
                  ) : (
                    editedUserInfo.userNickname // 수정 모드가 아닐 때는 텍스트만 표시
                  )}
                </CustomTableCell>
                <CustomTableCell style={{ width: '15%' }}>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(0)}
                  >
                    {editMode[0] ? '완료' : '수정'}
                  </Button>
                </CustomTableCell>
              </TableRow>
              <TableRow>
                <CustomTableCell>E-mail</CustomTableCell>
                <CustomTableCell style={{ width: '70%' }}>
                  {editMode[1] ? ( // 수정 모드일 때만 입력 필드 표시
                    <TextField
                      value={editedUserInfo.userEmail}
                      fullWidth
                      sx={{ border: 'none' }}
                      onChange={(event) => {
                        setEditedUserInfo({
                          ...editedUserInfo,
                          userEmail: event.target.value
                        });
                      }}
                    />
                  ) : (
                    editedUserInfo.userEmail // 수정 모드가 아닐 때는 텍스트만 표시
                  )}
                </CustomTableCell>
                <CustomTableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(1)}
                  >
                    {editMode[1] ? '완료' : '수정'}
                  </Button>
                </CustomTableCell>
              </TableRow>
              <TableRow>
                <CustomTableCell>소개</CustomTableCell>
                <CustomTableCell>
                  {editMode[2] ? ( // 수정 모드일 때만 입력 필드 표시
                    <TextField
                      value={editedUserInfo.introduction}
                      fullWidth
                      sx={{ border: 'none' }}
                      onChange={(event) => {
                        setEditedUserInfo({
                          ...editedUserInfo,
                          introduction: event.target.value
                        });
                      }}
                    />
                  ) : (
                    editedUserInfo.introduction // 수정 모드가 아닐 때는 텍스트만 표시
                  )}  
                </CustomTableCell> 
                <CustomTableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(2)}
                  >
                    {editMode[2] ? '완료' : '수정'}
                  </Button>
                </CustomTableCell>
              </TableRow>
              <TableRow>
                <CustomTableCell>성별</CustomTableCell>
                <CustomTableCell>
                  {editMode[3] ? ( // 수정 모드일 때만 입력 필드 표시
                    <TextField
                      value={editedUserInfo.userGender}
                      fullWidth
                      sx={{ border: 'none' }}
                      onChange={(event) => {
                        setEditedUserInfo({
                          ...editedUserInfo,
                          userGender: event.target.value
                        });
                      }}
                    />
                  ) : (
                    editedUserInfo.userGender // 수정 모드가 아닐 때는 텍스트만 표시
                  )}
                </CustomTableCell>
                <CustomTableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(3)}
                  >
                    {editMode[3] ? '완료' : '수정'}
                  </Button>
                </CustomTableCell>
              </TableRow>
              <TableRow>
                <CustomTableCell>연락처</CustomTableCell>
                <CustomTableCell>
                 {editMode[4] ? ( // 수정 모드일 때만 입력 필드 표시
                    <TextField
                      value={editedUserInfo.userPhone}
                      fullWidth
                      sx={{ border: 'none' }}
                      onChange={(event) => {
                        setEditedUserInfo({
                          ...editedUserInfo,
                          userPhone: event.target.value
                        });
                      }}
                    />
                  ) : (
                    editedUserInfo.userPhone // 수정 모드가 아닐 때는 텍스트만 표시
                  )}
                </CustomTableCell>
                <CustomTableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(4)}
                  >
                    {editMode[4] ? '완료' : '수정'}
                  </Button>
                </CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
          <Button variant="contained" onClick={handleSave}>
            저장
          </Button>
      </Stack>
    </div>
  )
}

export default MyInfoTable
