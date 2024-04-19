// 상담 신청서 조회 페이지
"use client"

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { TableCell } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';

const CustomTableCell = styled(TableCell)(() => ({
    borderRight: '1px solid black', // borderRight 속성 추가
    textAlign: 'center'
}));

function MyInfoTable({ userInfo }) {
    console.log("dddd", userInfo)

    return (
        <div>
            <Stack direction="column" alignItems="center" spacing={2}>
                <TableContainer component={Paper}>
                    <Table sx={{ width: 700, border: 1 }} aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={3} sx={{ borderBottom: '1px solid black'}}>
                                    <img src="/images/testArgoImage.png" alt="test" style={{ width: '35%', height: 'auto' }} />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <CustomTableCell style={{ width: '15%' }}>닉네임</CustomTableCell>
                                <CustomTableCell style={{ width: '70%' }}>{userInfo.nickname}</CustomTableCell>
                                <CustomTableCell style={{ width: '15%' }}>1</CustomTableCell>
                            </TableRow>
                            <TableRow>
                                <CustomTableCell>E-mail</CustomTableCell>
                                <CustomTableCell>{userInfo.email}</CustomTableCell>
                                <CustomTableCell>2</CustomTableCell>
                            </TableRow>
                            <TableRow>
                                <CustomTableCell>소개</CustomTableCell>
                                <CustomTableCell>{userInfo.introduction}</CustomTableCell>
                                <CustomTableCell>3</CustomTableCell>
                            </TableRow>
                            <TableRow>
                                <CustomTableCell>성별</CustomTableCell>
                                <CustomTableCell>{userInfo.gender}</CustomTableCell>
                                <CustomTableCell>4</CustomTableCell>
                            </TableRow>
                            <TableRow>
                                <CustomTableCell>연락처</CustomTableCell>
                                <CustomTableCell>{userInfo.phone}</CustomTableCell>
                                <CustomTableCell>5</CustomTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </div>
    )

};

export default MyInfoTable;