// 상담 신청서 조회 페이지
"use client"

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import * as React from 'react';
import dynamic from 'next/dynamic';
//import MyInfoTable from '@/components/myInfoTable/myInfoTable';

const MyInfoTable = dynamic(() => import('@/components/myInfoTable/myInfoTable'), {
    ssr: false
});

const testData = {
    nickname: "아르고1",
    email: "아르고2",
    introduction: "아르고3",
    gender: "아르고4",
    phone: "아르고5"
}

function MyInfo() {
    const [userInfo, setUserInfo] = useState(null); // 유저 정보를 저장할 상태 변수

    useEffect(() => {
        // 비동기로 testData를 받아오기 위해 setTimeout 사용
        setTimeout(() => {
            setUserInfo(testData); //추후 API 연결되면, 이 부분을 json 데이터로 바꾸면 될듯
        }, 1000); // 1초 후에 testData를 설정
    }, []);

    useEffect(() => {
        handleGetInfo();
    }, []);

    const handleGetInfo = () => {
        fetch('/mypage/{UserId}', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // JSON 형태의 응답  
                } else {
                    console.error('실패');
                }
            })
            .then(data => {
                // 가져온 데이터를 상태 변수에 저장
                setUserInfo(data);
            })
            .catch(error => {
                console.error('오류 발생', error);
            });
    }

    return (
        <div>
            <div style={{ marginLeft: "15%" }}>
                <h2>내 정보</h2>
            </div>
            <div style={{ marginLeft: "15%" }}>
                <p>탭 컨포넌트 들어갈 자리</p>
            </div>
            <Stack direction="column" alignItems="center" spacing={2}>
                {userInfo ? ( // userInfo가 존재하면 MyInfoTable을 렌더링
                    <MyInfoTable userInfo={userInfo} />
                ) : (
                    <p>Loading...</p> // userInfo가 없을 때는 로딩 표시
                )}
                <Button variant="contained" onClick={() => router.push("/matching")}>수정</Button>
            </Stack>
        </div>
    )

};

export default MyInfo;