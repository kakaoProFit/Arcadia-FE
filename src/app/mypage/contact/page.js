// 상담 신청서 조회 페이지
"use client"

import Button from '@mui/material/Button';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';

// react-quill을 동적으로 임포트
const ReadTextEditor = dynamic(() => import('@/components/textEditor/readTextEditor.js'), {
    ssr: false
});

function Contact() {
    const [editorContent, setEditorContent] = useState("<p>test</p>\n<h1>test2</h2>"); // QuillEditor 내용 관리
    const router = useRouter();

    const handleGetConsultingSpecification = () => {
        fetch('/mypage/${UserId}/Consulting', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // JSON 형태의 응답  -> 이거 추후에 백엔드에서 넘어오는거 보고 수정 필요할듯
                } else {
                    console.error('실패');
                }
            })
            .then(data => {
                setEditorContent(data.content); // 받아온 내용을 QuillEditor에 설정
            })
            .catch(error => {
                console.error('오류 발생', error);
            });
    }

    useEffect(() => {
        handleGetConsultingSpecification(); // 처음 렌더링 될 때 GET 요청을 보냄
    }, []);

    return (
        <div>
            <div style={{marginLeft: "15%"}}>
                <h2>마이 페이지</h2>
            </div>
            <div style={{marginLeft: "15%"}}>
                <p>탭 컨포넌트 들어갈 자리</p>
            </div>
            <Stack direction="column" alignItems="center" spacing={2}>
                <ReadTextEditor
                    theme="snow"
                    value={editorContent}
                />
                <Button variant="contained" onClick={() => router.push("/matching")}>수정</Button>
            </Stack>
        </div>
    )

};

export default Contact;